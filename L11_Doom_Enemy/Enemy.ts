namespace L11_Doom_Enemy {
    import f = FudgeCore;
  
    export class Enemy extends GameObject {
  
      public constructor(_size: f.Vector2, _position: f.Vector3, _rotation: f.Vector3, _material: f.Material) {
        super("Enemy", _size, _position, _rotation);
  
        let cmpMaterial: f.ComponentMaterial = new f.ComponentMaterial(_material);
        cmpMaterial.pivot.scale(f.Vector2.ONE(1));
        this.addComponent(cmpMaterial);
      }


      public seesAvatar(_target: Enemy, _avatar: f.Node): boolean {
        let posAvatar: f.Vector3 = new f.Vector3(_avatar.mtxWorld.translation.x, _avatar.mtxWorld.translation.y, _avatar.mtxWorld.translation.z);
        let posEnemy: f.Vector3 = new f.Vector3 (_target.mtxWorld.translation.x, _target.mtxWorld.translation.y, _target.mtxWorld.translation.z);
        
        let vctAvatar: f.Vector3 = f.Vector3.DIFFERENCE(posAvatar, posEnemy);
        let distance: number = f.Vector3.DOT(vctAvatar, _target.mtxWorld.getZ());

        /*
        let ray: f.Ray = new f.Ray(_target.mtxWorld.getZ(), _target.mtxWorld.translation);
        // iterate through all walls?:
        let intersect: f.Vector3 = ray.intersectPlane(posThis, normal);
        */

        // distance is short enough (& NO WALL IN BETWEEN):
        if (distance < 20) {
          return true;
        }
        return false;
      }


      public followAvatar(_target: Enemy, _avatar: f.Node): void {
        _target.mtxLocal.translate(f.Vector3.SCALE(_target.mtxWorld.getZ(), 0.03));
      }

    }
  }