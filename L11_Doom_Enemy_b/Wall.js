"use strict";
var L11_Doom_Enemy_b;
(function (L11_Doom_Enemy_b) {
    var f = FudgeCore;
    class Wall extends L11_Doom_Enemy_b.GameObject {
        // private static readonly meshQuad: f.MeshQuad = new f.MeshQuad();
        constructor(_size, _position, _rotation, _material) {
            super("Wall", _size, _position, _rotation);
            // let floor: faid.Node = new faid.Node("Floor", f.Matrix4x4.ROTATION_X(-90), mtrFloor, meshQuad);
            let cmpMaterial = new f.ComponentMaterial(_material);
            cmpMaterial.pivot.scale(f.Vector2.ONE(1));
            this.addComponent(cmpMaterial);
        }
    }
    L11_Doom_Enemy_b.Wall = Wall;
})(L11_Doom_Enemy_b || (L11_Doom_Enemy_b = {}));
//# sourceMappingURL=Wall.js.map