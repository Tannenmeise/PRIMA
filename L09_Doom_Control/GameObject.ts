namespace L09_Doom_Control {
    import f = FudgeCore;
  
    export class GameObject extends f.Node {
      private static readonly meshQuad: f.MeshQuad = new f.MeshQuad();
  
      public constructor(_name: string, _size: f.Vector2, _position: f.Vector3, _rotation: f.Vector3) {
        super(_name);
        this.addComponent(new f.ComponentTransform(f.Matrix4x4.TRANSLATION(_position)));
        this.mtxLocal.rotation = _rotation;
  
        let cmpQuad: f.ComponentMesh = new f.ComponentMesh(GameObject.meshQuad);
        this.addComponent(cmpQuad);
        cmpQuad.pivot.scale(_size.toVector3(1));
      }
    }
  }