"use strict";
var L11_Doom_Enemy_b;
(function (L11_Doom_Enemy_b) {
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
            faceAvatar(_avatar) {
                this.cmpTransform.showTo(_avatar.mtxWorld.translation);
            }
        }
        GameObject.meshQuad = new f.MeshQuad();
        return GameObject;
    })();
    L11_Doom_Enemy_b.GameObject = GameObject;
})(L11_Doom_Enemy_b || (L11_Doom_Enemy_b = {}));
//# sourceMappingURL=GameObject.js.map