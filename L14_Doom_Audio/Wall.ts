namespace L14_Doom_Audio {
    import ƒ = FudgeCore;
  
    export class Wall extends GameObject {
  
      public constructor(_size: ƒ.Vector2, _position: ƒ.Vector3, _rotation: ƒ.Vector3, _material: ƒ.Material) {
        super("Wall", _size, _position, _rotation);
  
        let cmpMaterial: ƒ.ComponentMaterial = new ƒ.ComponentMaterial(_material);
        cmpMaterial.pivot.scale(ƒ.Vector2.ONE(1));
        this.addComponent(cmpMaterial);
      }
    }
  }