"use strict";
var L12_Doom_UI;
(function (L12_Doom_UI) {
    var f = FudgeCore;
    class Wall extends L12_Doom_UI.GameObject {
        // private static readonly meshQuad: f.MeshQuad = new f.MeshQuad();
        constructor(_size, _position, _rotation, _material) {
            super("Wall", _size, _position, _rotation);
            // let floor: faid.Node = new faid.Node("Floor", f.Matrix4x4.ROTATION_X(-90), mtrFloor, meshQuad);
            let cmpMaterial = new f.ComponentMaterial(_material);
            cmpMaterial.pivot.scale(f.Vector2.ONE(1));
            this.addComponent(cmpMaterial);
        }
    }
    L12_Doom_UI.Wall = Wall;
})(L12_Doom_UI || (L12_Doom_UI = {}));
//# sourceMappingURL=Wall.js.map