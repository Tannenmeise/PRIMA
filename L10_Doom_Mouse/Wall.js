"use strict";
var L10_Doom_Mouse;
(function (L10_Doom_Mouse) {
    var f = FudgeCore;
    class Wall extends L10_Doom_Mouse.GameObject {
        // private static readonly meshQuad: f.MeshQuad = new f.MeshQuad();
        constructor(_size, _position, _rotation, _material) {
            super("Wall", _size, _position, _rotation);
            // let floor: faid.Node = new faid.Node("Floor", f.Matrix4x4.ROTATION_X(-90), mtrFloor, meshQuad);
            let cmpMaterial = new f.ComponentMaterial(_material);
            cmpMaterial.pivot.scale(f.Vector2.ONE(1));
            this.addComponent(cmpMaterial);
        }
    }
    L10_Doom_Mouse.Wall = Wall;
})(L10_Doom_Mouse || (L10_Doom_Mouse = {}));
//# sourceMappingURL=Wall.js.map