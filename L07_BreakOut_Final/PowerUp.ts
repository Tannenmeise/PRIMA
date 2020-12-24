namespace L07_BreakOut_Final {
  import f = FudgeCore;

  export class PowerUp extends Moveable {
    private static readonly meshSphere: f.MeshSphere = new f.MeshSphere("Sphere", 5, 10);

    public constructor(_name: string, _position: f.Vector2, _size: f.Vector2) {
      super(_name, _position, _size);
      this.velocity = f.Vector3.Y(-5);

      this.getComponent(f.ComponentMesh).mesh = PowerUp.meshSphere;
    }
  }
}