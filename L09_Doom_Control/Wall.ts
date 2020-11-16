namespace L09_Doom_Control {
    import f = FudgeCore;
  
    export class Wall extends GameObject {
      // private static readonly meshQuad: f.MeshQuad = new f.MeshQuad();
  
      public constructor(_size: f.Vector2, _position: f.Vector3, _rotation: f.Vector3, _material: f.Material) {
        super("Wall", _size, _position, _rotation);
  
        // let floor: faid.Node = new faid.Node("Floor", f.Matrix4x4.ROTATION_X(-90), mtrFloor, meshQuad);
        let cmpMaterial: f.ComponentMaterial = new f.ComponentMaterial(_material);
        cmpMaterial.pivot.scale(f.Vector2.ONE(1));
        this.addComponent(cmpMaterial);
      }
      
    }
  }