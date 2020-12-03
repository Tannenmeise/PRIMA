"use strict";
var L12_Doom_UI;
(function (L12_Doom_UI) {
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
                this.mtxPivot = this.getComponent(f.ComponentMesh).pivot;
            }
            calculateBounce(_posWith, _radius = 1) {
                // make sure inversions exist
                this.calculatePivotInverse();
                this.calculateCompleteAndInverse();
                // transform position and radius to mesh coordinates
                let posLocal = f.Vector3.TRANSFORMATION(_posWith, this.mtxCompleteInverse, true);
                let vctRadiusLocal = f.Vector3.TRANSFORMATION(f.Vector3.X(_radius), this.mtxPivotInverse);
                // return if behind mesh or further away than radius. Prerequisite: pivot.z of this object hasn't been scaled!!
                if (posLocal.z < 0 || posLocal.z > _radius)
                    return null;
                // return if further to the side than 0.5 (the half of the width of the mesh) plus the transformed radius
                if (Math.abs(posLocal.x) > 0.5 + vctRadiusLocal.x)
                    return null;
                // bounce in system local to mesh
                posLocal.z = _radius * 1.001;
                // transform back to world system
                posLocal.transform(this.mtxComplete, true);
                return posLocal;
            }
            calculatePivotInverse() {
                if (this.mtxPivotInverse)
                    return;
                this.mtxPivotInverse = f.Matrix4x4.INVERSION(this.mtxPivot);
            }
            calculateCompleteAndInverse() {
                if (this.mtxComplete)
                    return;
                this.mtxComplete = f.Matrix4x4.MULTIPLICATION(this.mtxWorld, this.mtxPivot);
                this.mtxCompleteInverse = f.Matrix4x4.MULTIPLICATION(this.mtxPivotInverse, this.mtxWorldInverse);
            }
        }
        GameObject.meshQuad = new f.MeshSprite();
        return GameObject;
    })();
    L12_Doom_UI.GameObject = GameObject;
})(L12_Doom_UI || (L12_Doom_UI = {}));
//# sourceMappingURL=GameObject.js.map