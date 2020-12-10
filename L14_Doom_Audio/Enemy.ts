namespace L14_Doom_Audio {
    import f = FudgeCore;
    import faid = FudgeAid;
  
    export enum ANGLE {
      _000 = 0, _045 = 1, _090 = 2, _135 = 3, _180 = 4, _225 = 5, _270 = 6, _315 = 7
    }
  
    export enum JOB {
      IDLE, PATROL
    }
  
    export class Enemy extends f.Node {
      private static animations: faid.SpriteSheetAnimations;
      public idleAudio: ƒ.ComponentAudio;
      public hurtAudio: ƒ.ComponentAudio;
      public speed: number = 3;
      public posTarget: f.Vector3;
      private show: f.Node;
      private sprite: faid.NodeSprite;
      private angleView: number = 0;
  
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
        this.sprite.setFrameDirection(1);
        this.sprite.framerate = 2;

        this.idleAudio = new ƒ.ComponentAudio(new ƒ.Audio("../DoomAssets/Enemy_Idle.wav"), true, true);
        this.addComponent(this.idleAudio);
  
        let cmpStateMachine: ComponentStateMachineEnemy = new ComponentStateMachineEnemy();
        this.addComponent(cmpStateMachine);
        cmpStateMachine.stateCurrent = JOB.PATROL;
        this.chooseTargetPosition();
  
        // this.appendChild(new faid.Node("Cube", f.Matrix4x4.IDENTITY(), new f.Material("Cube", f.ShaderUniColor, new f.CoatColored(f.Color.CSS("red"))), new f.MeshCube()));
      }
  
  
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
        this.getComponent(ComponentStateMachineEnemy).act();
        this.displayAnimation();
      }
  
  
      public move(): void {
        this.mtxLocal.showTo(this.posTarget);
        this.mtxLocal.translateZ(this.speed * f.Loop.timeFrameGame / 1000);
      }
  
      public chooseTargetPosition(): void {
        let range: number = sizeWall * numWalls / 2 - 2;
        this.posTarget = new f.Vector3(f.Random.default.getRange(-range, range), 0, f.Random.default.getRange(-range, range));
        console.log("New target", this.posTarget.toString());
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
  
        let section: string = ANGLE[rotation];
        this.sprite.setAnimation(<faid.SpriteSheetAnimation>Enemy.animations["Idle" + section]);
      }
  
      private flip(_reverse: boolean): void {
        this.sprite.mtxLocal.rotation = f.Vector3.Y(_reverse ? 180 : 0);
      }
    }
  }