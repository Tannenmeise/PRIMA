"use strict";
var L12_Doom_Enemy2b;
(function (L12_Doom_Enemy2b) {
    var f = FudgeCore;
    class Wall extends L12_Doom_Enemy2b.GameObject {
        // private static readonly meshQuad: f.MeshQuad = new f.MeshQuad();
        constructor(_size, _position, _rotation, _material) {
            super("Wall", _size, _position, _rotation);
            // let floor: faid.Node = new faid.Node("Floor", f.Matrix4x4.ROTATION_X(-90), mtrFloor, meshQuad);
            let cmpMaterial = new f.ComponentMaterial(_material);
            cmpMaterial.pivot.scale(f.Vector2.ONE(1));
            this.addComponent(cmpMaterial);
        }
    }
    L12_Doom_Enemy2b.Wall = Wall;
})(L12_Doom_Enemy2b || (L12_Doom_Enemy2b = {}));
//# sourceMappingURL=Wall.js.map