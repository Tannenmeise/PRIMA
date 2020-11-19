namespace L11_Doom_Enemy {
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
  
      public calculateBounce(_posWith: f.Vector3, _radius: number = 1): f.Vector3 {
        let normal: f.Vector3 = this.mtxWorld.getZ();
        let posThis: f.Vector3 = this.mtxWorld.translation;
  
        let difference: f.Vector3 = f.Vector3.DIFFERENCE(_posWith, posThis);
        let distance: number = f.Vector3.DOT(difference, normal);
  
        if (distance < 0 || distance > _radius)
          return null;
  
        let size: f.Vector3 = this.getComponent(f.ComponentMesh).pivot.scaling;
        let ray: f.Ray = new f.Ray(normal, _posWith);
        let intersect: f.Vector3 = ray.intersectPlane(posThis, normal);
  
        let localIntersect: f.Vector3 = f.Vector3.TRANSFORMATION(intersect, this.mtxWorldInverse, true);
  
        if (Math.abs(localIntersect.x) - _radius > 0.5 * size.x)
          return null;
  
        normal.scale(1.001);
        return f.Vector3.SUM(intersect, normal);
      }
    }
  }