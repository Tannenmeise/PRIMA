namespace L11_Doom_Enemy {
  import f = FudgeCore;
  import faid = FudgeAid;

  export enum ANGLE {
    // N = 0, NE = 1, E = 2, SE = 3, S = 4, SW = 5, W = 6, NW = 7,
    _000 = 0, _045 = 1, _090 = 2, _135 = 3, _180 = 4, _225 = 5, _270 = 6, _315 = 7
  }

  export enum JOB {
    IDLE, PATROL, ATTACK
  }


  export class Enemy extends f.Node {
    private static animations: faid.SpriteSheetAnimations;
    public speed: number = 3;
    private show: f.Node;
    private sprite: faid.NodeSprite;
    private posTarget: f.Vector3;
    private angleView: number = 0;
    private job: JOB = JOB.PATROL;
    private breakTime: number = 0;
    // private static speedMax: number = 1; // units per second
    // public direction: number = 0; 

    constructor(_name: string = "Enemy", _position: f.Vector3) {
      super(_name);
      this.addComponent(new f.ComponentTransform());
      this.mtxLocal.translation = _position;

      this.show = new faid.Node("Show", f.Matrix4x4.IDENTITY());
      this.appendChild(this.show);

      this.sprite = new faid.NodeSprite("Sprite");
      this.sprite.addComponent(new f.ComponentTransform());
      this.show.appendChild(this.sprite);


      this.sprite.setAnimation(<faid.SpriteSheetAnimation>Enemy.animations["Idle_000"]);
      // this.sprite.showFrame(0);
      this.sprite.setFrameDirection(1);
      this.sprite.framerate = 2;

      // this.posTarget = _position;
      this.chooseTargetPosition();

      // this.appendChild(new faid.Node("Cube", f.Matrix4x4.IDENTITY(), new f.Material("Cube", f.ShaderUniColor, new f.CoatColored(f.Color.CSS("red"))), new f.MeshCube()));
    }


    public static generateSprites(_spritesheet: f.CoatTextured): void {
      Enemy.animations = {};
      for (let angle: number = 0; angle < 5; angle++) {
        let name: string = "Idle" + ANGLE[angle];
        let sprite: faid.SpriteSheetAnimation = new faid.SpriteSheetAnimation(name, _spritesheet);
        sprite.generateByGrid(f.Rectangle.GET(angle * 77, 0, 75, 77), 3, 32, f.ORIGIN2D.BOTTOMCENTER, f.Vector2.Y(75));
        Enemy.animations[name] = sprite;
      }
    }

    public update(): void {

      switch (this.job) {
        case JOB.PATROL:
          if (this.distance() < 10) { // sees Avatar
            this.job = JOB.ATTACK;
          } else if (this.mtxLocal.translation.equals(this.posTarget, 0.1)) // reached Target
            this.job = JOB.IDLE;
          this.move();
          break;
        case JOB.IDLE:
          if (this.distance() < 10) { // sees Avatar
            this.job = JOB.ATTACK;
            this.breakTime = 0;
          } else if (this.breakTime > Math.random() * 3000) { // breakTime over
            this.job = JOB.PATROL;
            this.chooseTargetPosition();
            this.breakTime = 0;
          }
          this.breakTime++;
          break;
        case JOB.ATTACK:
          if (this.distance() > 15) { // lost Avatar
            this.job = JOB.IDLE;
          }
          this.posTarget = avatar.mtxLocal.translation;
          this.move();
          break;
        default:
          break;
      }
      // PROBLEM!!!: ENEMIES FACE AVATAR WHEN HITTING "IDLE"-STATE
      this.displayAnimation();
    }

    private move(): void {
      this.mtxLocal.showTo(this.posTarget);
      this.mtxLocal.translateZ(this.speed * f.Loop.timeFrameGame / 1000);
    }

    private displayAnimation(): void {
      this.show.mtxLocal.showTo(f.Vector3.TRANSFORMATION(avatar.mtxLocal.translation, this.mtxWorldInverse, true));

      let rotation: number = this.show.mtxLocal.rotation.y;
      rotation = (rotation + 360 + 22.5) % 360;
      rotation = Math.floor(rotation / 45);

      if (this.angleView == rotation)
        return;

      this.angleView = rotation;

      if (rotation > 4) {
        rotation = 8 - rotation;
        this.flip(true);
      }
      else
        this.flip(false);

      let section: string = ANGLE[rotation]; // .padStart(3, "0");
      // console.log(section);
      this.sprite.setAnimation(<faid.SpriteSheetAnimation>Enemy.animations["Idle" + section]);
    }

    private chooseTargetPosition(): void {
      let range: number = sizeWall * numWalls / 2 - 2;
      this.posTarget = new f.Vector3(f.Random.default.getRange(-range, range), 0, f.Random.default.getRange(-range, range));
      // console.log("New target", this.posTarget.toString());
    }

    private flip(_reverse: boolean): void {
      this.sprite.mtxLocal.rotation = f.Vector3.Y(_reverse ? 180 : 0);
    }

    private distance(): number {
      let vctAvatar: f.Vector3 = f.Vector3.DIFFERENCE(avatar.mtxWorld.translation, this.mtxLocal.translation);
      let distance: number = f.Vector3.DOT(vctAvatar, this.mtxWorld.getZ());
      return distance;
    }

  }
}