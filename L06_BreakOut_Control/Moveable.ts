namespace L06_BreakOut_Control {
    import f = FudgeCore;
  
    export class Moveable extends GameObject {
      private static readonly REFLECT_VECTOR_X: f.Vector3 = f.Vector3.X();
      private static readonly REFLECT_VECTOR_Y: f.Vector3 = f.Vector3.Y();
  
      public speed: number = 15;
      public velocity: f.Vector3 = f.Vector3.ZERO();
  
      public constructor(_name: string, _position: f.Vector2, _size: f.Vector2) {
        super(_name, _position, _size);
  
        this.velocity = new f.Vector3(f.Random.default.getRange(-1, 1), f.Random.default.getRange(-1, 1), 0);
        this.velocity.normalize(this.speed);
      }
  
      /**
       * move moves the game object and the collision detection reactangle
       */
      public move(): void {
        let frameTime: number = f.Loop.timeFrameGame / 1000;
  
        let distance: f.Vector3 = f.Vector3.SCALE(this.velocity, frameTime);
        this.translate(distance);
      }
  
      public translate(_distance: f.Vector3): void {
        this.mtxLocal.translate(_distance);
        this.rect.position.x = this.mtxLocal.translation.x - this.rect.size.x / 2;
        this.rect.position.y = this.mtxLocal.translation.y - this.rect.size.y / 2;
      }

      /**
       * collides returns if the moveable itself collides with the _target and if so
       * reflects the movement
       */
      public checkCollision(_target: GameObject): boolean {
        let intersection: f.Rectangle = this.rect.getIntersection(_target.rect);
        if (intersection == null)
          return false;
  
        if (intersection.size.x > intersection.size.y)
          this.velocity.reflect(Moveable.REFLECT_VECTOR_Y);
        else
          this.velocity.reflect(Moveable.REFLECT_VECTOR_X);
  
        return true;
      }
    }
  }