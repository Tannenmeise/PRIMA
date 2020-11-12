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
        }
        GameObject.meshQuad = new f.MeshQuad();
        return GameObject;
    })();
    L09_Doom_Control.GameObject = GameObject;
})(L09_Doom_Control || (L09_Doom_Control = {}));
//# sourceMappingURL=GameObject.js.map