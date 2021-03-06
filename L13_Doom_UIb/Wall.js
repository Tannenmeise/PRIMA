"use strict";
var L13_Doom_UIb;
(function (L13_Doom_UIb) {
    var ƒ = FudgeCore;
    class Wall extends L13_Doom_UIb.GameObject {
        // private static readonly meshQuad: ƒ.MeshQuad = new ƒ.MeshQuad();
        constructor(_size, _position, _rotation, _material) {
            super("Wall", _size, _position, _rotation);
            // let floor: ƒaid.Node = new ƒaid.Node("Floor", ƒ.Matrix4x4.ROTATION_X(-90), mtrFloor, meshQuad);
            let cmpMaterial = new ƒ.ComponentMaterial(_material);
            cmpMaterial.pivot.scale(ƒ.Vector2.ONE(1));
            this.addComponent(cmpMaterial);
        }
    }
    L13_Doom_UIb.Wall = Wall;
})(L13_Doom_UIb || (L13_Doom_UIb = {}));
//# sourceMappingURL=Wall.js.map