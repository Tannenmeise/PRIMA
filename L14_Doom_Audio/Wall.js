"use strict";
var L14_Doom_Audio;
(function (L14_Doom_Audio) {
    var ƒ = FudgeCore;
    class Wall extends L14_Doom_Audio.GameObject {
        // private static readonly meshQuad: ƒ.MeshQuad = new ƒ.MeshQuad();
        constructor(_size, _position, _rotation, _material) {
            super("Wall", _size, _position, _rotation);
            // let floor: ƒaid.Node = new ƒaid.Node("Floor", ƒ.Matrix4x4.ROTATION_X(-90), mtrFloor, meshQuad);
            let cmpMaterial = new ƒ.ComponentMaterial(_material);
            cmpMaterial.pivot.scale(ƒ.Vector2.ONE(1));
            this.addComponent(cmpMaterial);
        }
    }
    L14_Doom_Audio.Wall = Wall;
})(L14_Doom_Audio || (L14_Doom_Audio = {}));
//# sourceMappingURL=Wall.js.map