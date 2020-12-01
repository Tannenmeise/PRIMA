namespace L12_Doom_Enemy2b {
  import f = FudgeCore;
  import faid = FudgeAid;

  export enum ANGLE {
    // N = 0, NE = 1, E = 2, SE = 3, S = 4, SW = 5, W = 6, NW = 7,
    _000 = 0, _045 = 1, _090 = 2, _135 = 3, _180 = 4, _225 = 5, _270 = 6, _315 = 7
  }



  export class Enemy extends f.Node {
    private static animations: faid.SpriteSheetAnimations;
    public speed: number = 1;
    private show: f.Node;
    private sprite: faid.NodeSprite;
    private posTarget: f.Vector3;
    // private static speedMax: number = 1; // units per second
    // public direction: number = 0; 

    constructor(_name: string = "Enemy", _position: f.Vector3) {
      super(_name);
      this.addComponent(new f.ComponentTransform());
      this.mtxLocal.translation = _position;

      this.show = new faid.Node("Show", f.Matrix4x4.IDENTITY());
      this.appendChild(this.show);

      this.sprite = new faid.NodeSprite("Sprite");
      this.show.appendChild(this.sprite);


      this.sprite.setAnimation(<faid.SpriteSheetAnimation>Enemy.animations["Idle_000"]);
      // this.sprite.showFrame(0);
      this.sprite.setFrameDirection(1);
      this.sprite.framerate = 2;

      this.posTarget = _position;

      // this.appendChild(new faid.Node("Cube", f.Matrix4x4.IDENTITY(), new f.Material("Cube", f.ShaderUniColor, new f.CoatColored(f.Color.CSS("red"))), new f.MeshCube()));
    }


    // Generates Animations from "Idle_000"(0°) to "Idle_180"(180°) (total:5):
    public static generateSprites(_spritesheet: f.CoatTextured): void {
      Enemy.animations = {};
      for (let angle: number = 0; angle < 5; angle++) {
        let name: string = "Idle" + ANGLE[angle];
        let sprite: faid.SpriteSheetAnimation = new faid.SpriteSheetAnimation(name, _spritesheet);
        sprite.generateByGrid(f.Rectangle.GET(44 + angle * 107, 33, 63, 66), 3, 32, f.ORIGIN2D.BOTTOMCENTER, f.Vector2.Y(100));
        Enemy.animations[name] = sprite;
      }
    }


    public update(): void {

      let angle: number = this.getAngleBetweenVectors(avatar.mtxWorld.translation);
      if (angle < Math.PI / 8)
        this.sprite.setAnimation(<faid.SpriteSheetAnimation>Enemy.animations["Idle_000"]);
      else if (angle > Math.PI / 8 && angle < 3 * Math.PI / 8)
        this.sprite.setAnimation(<faid.SpriteSheetAnimation>Enemy.animations["Idle_045"]);
      else if (angle > 3 * Math.PI / 8 && angle < 5 * Math.PI / 8)
        this.sprite.setAnimation(<faid.SpriteSheetAnimation>Enemy.animations["Idle_090"]);
      else if (angle > 5 * Math.PI / 8 && angle < 7 * Math.PI / 8)
        this.sprite.setAnimation(<faid.SpriteSheetAnimation>Enemy.animations["Idle_135"]);
      else if (angle > 7 * Math.PI / 8)
        this.sprite.setAnimation(<faid.SpriteSheetAnimation>Enemy.animations["Idle_180"]);


      if (this.mtxLocal.translation.equals(this.posTarget, 0.1))
        this.chooseTargetPosition();

      this.move();
    }


    private move(): void {
      this.mtxLocal.showTo(this.posTarget);
      this.mtxLocal.translateZ(this.speed * f.Loop.timeFrameGame / 1000);
      this.show.mtxLocal.showTo(f.Vector3.TRANSFORMATION(avatar.mtxLocal.translation, this.mtxWorldInverse, true));
    }


    private chooseTargetPosition(): void {
      let range: number = 5; //sizeWall * numWalls / 2 - 2;
      this.posTarget = new f.Vector3(f.Random.default.getRange(-range, range), 0, f.Random.default.getRange(-range, range));
      console.log("New target", this.posTarget.toString());
    }

    private getAngleBetweenVectors(v: f.Vector3): number {
      return Math.acos((this.mtxLocal.getZ().x * v.x + this.mtxLocal.getZ().y * v.y + this.mtxLocal.getZ().z * v.z) / (Math.sqrt((Math.pow(this.mtxLocal.getZ().x, 2) + Math.pow(this.mtxLocal.getZ().y, 2) + Math.pow(this.mtxLocal.getZ().z, 2))) * (Math.sqrt((Math.pow(v.x, 2) + Math.pow(v.y, 2) + Math.pow(v.z, 2))))));
    }
  }
}