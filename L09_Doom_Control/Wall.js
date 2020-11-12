"use strict";
var L09_Doom_Control;
(function (L09_Doom_Control) {
    var f = FudgeCore;
    class Wall extends L09_Doom_Control.GameObject {
        // private static readonly meshQuad: f.MeshQuad = new f.MeshQuad();
        constructor(_size, _position, _rotation, _material) {
            super("Wall", _size, _position, _rotation);
            // let floor: faid.Node = new faid.Node("Floor", f.Matrix4x4.ROTATION_X(-90), mtrFloor, meshQuad);
            let cmpMaterial = new f.ComponentMaterial(_material);
            cmpMaterial.pivot.scale(f.Vector2.ONE(1));
            this.addComponent(cmpMaterial);
        }
    }
    L09_Doom_Control.Wall = Wall;
})(L09_Doom_Control || (L09_Doom_Control = {}));
//# sourceMappingURL=Wall.js.map