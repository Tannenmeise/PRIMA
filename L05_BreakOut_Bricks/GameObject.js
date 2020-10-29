"use strict";
var L05_BreakOut_Bricks;
(function (L05_BreakOut_Bricks) {
    var f = FudgeCore;
    let GameObject = /** @class */ (() => {
        class GameObject extends f.Node {
            constructor(_name, _position, _size) {
                super(_name);
                this.rect = new f.Rectangle(_position.x, _position.y, _size.x, _size.y, f.ORIGIN2D.CENTER);
                this.addComponent(new f.ComponentTransform(f.Matrix4x4.TRANSLATION(_position.toVector3(0))));
                let cmpQuad = new f.ComponentMesh(GameObject.meshQuad);
                this.addComponent(cmpQuad);
                cmpQuad.pivot.scale(_size.toVector3(0));
                let cMaterial = new f.ComponentMaterial(GameObject.mtrSolidWhite);
                this.addComponent(cMaterial);
            }
        }
        GameObject.meshQuad = new f.MeshQuad();
        GameObject.mtrSolidWhite = new f.Material("SolidWhite", f.ShaderUniColor, new f.CoatColored(f.Color.CSS("WHITE")));
        return GameObject;
    })();
    L05_BreakOut_Bricks.GameObject = GameObject;
})(L05_BreakOut_Bricks || (L05_BreakOut_Bricks = {}));
//# sourceMappingURL=GameObject.js.map