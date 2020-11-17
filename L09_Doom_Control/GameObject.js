"use strict";
var L09_Doom_Control;
(function (L09_Doom_Control) {
    var f = FudgeCore;
    let GameObject = /** @class */ (() => {
        class GameObject extends f.Node {
            constructor(_name, _size, _position, _rotation) {
                super(_name);
                this.addComponent(new f.ComponentTransform(f.Matrix4x4.TRANSLATION(_position)));
                this.mtxLocal.rotation = _rotation;
                let cmpQuad = new f.ComponentMesh(GameObject.meshQuad);
                this.addComponent(cmpQuad);
                cmpQuad.pivot.scale(_size.toVector3(1));
            }
            calculateBounce(_posWith, _radius = 1) {
                let normal = this.mtxWorld.getZ();
                let posThis = this.mtxWorld.translation;
                let difference = f.Vector3.DIFFERENCE(_posWith, posThis);
                let distance = f.Vector3.DOT(difference, normal);
                if (distance < 0 || distance > _radius)
                    return null;
                let size = this.getComponent(f.ComponentMesh).pivot.scaling;
                let ray = new f.Ray(normal, _posWith);
                let intersect = ray.intersectPlane(posThis, normal);
                let localIntersect = f.Vector3.TRANSFORMATION(intersect, this.mtxWorldInverse, true);
                if (Math.abs(localIntersect.x) - _radius > 0.5 * size.x)
                    return null;
                normal.scale(1.001);
                return f.Vector3.SUM(intersect, normal);
            }
        }
        GameObject.meshQuad = new f.MeshQuad();
        return GameObject;
    })();
    L09_Doom_Control.GameObject = GameObject;
})(L09_Doom_Control || (L09_Doom_Control = {}));
//# sourceMappingURL=GameObject.js.map