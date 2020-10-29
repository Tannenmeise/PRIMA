namespace L06_BreakOut_Paddle {
  import f = FudgeCore;

  export class GameObject extends f.Node {
    private static readonly meshQuad: f.MeshQuad = new f.MeshQuad();
    private static readonly mtrSolidWhite: f.Material = new f.Material("SolidWhite", f.ShaderUniColor, new f.CoatColored(f.Color.CSS("WHITE")));

    public rect: f.Rectangle;

    
    public constructor(_name: string, _position: f.Vector2, _size: f.Vector2) {
      super(_name);

      this.rect = new f.Rectangle(_position.x, _position.y, _size.x, _size.y, f.ORIGIN2D.CENTER);

      this.addComponent(new f.ComponentTransform(f.Matrix4x4.TRANSLATION(_position.toVector3(0))));

      let cmpQuad: f.ComponentMesh = new f.ComponentMesh(GameObject.meshQuad);
      this.addComponent(cmpQuad);
      cmpQuad.pivot.scale(_size.toVector3(0));

      let cMaterial: f.ComponentMaterial = new f.ComponentMaterial(GameObject.mtrSolidWhite);
      this.addComponent(cMaterial);
    }
  }
}