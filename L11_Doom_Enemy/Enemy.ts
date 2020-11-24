namespace L11_Doom_Enemy {
    import f = FudgeCore;
  
    export class Enemy extends GameObject {
  
      public constructor(_size: f.Vector2, _position: f.Vector3, _rotation: f.Vector3, _material: f.Material) {
        super("Enemy", _size, _position, _rotation);
  
        let cmpMaterial: f.ComponentMaterial = new f.ComponentMaterial(_material);
        cmpMaterial.pivot.scale(f.Vector2.ONE(1));
        this.addComponent(cmpMaterial);
      }


      public followAvatar(): void {
        // Only works when the enemy also does the faceAvatar()-Action:
        //this.mtxLocal.translate(f.Vector3.SCALE(this.mtxWorld.getZ(), 0.03));
        this.mtxLocal.translateZ(0.05);
      }

    }
  }