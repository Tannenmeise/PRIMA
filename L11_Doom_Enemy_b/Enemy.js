"use strict";
var L11_Doom_Enemy_b;
(function (L11_Doom_Enemy_b) {
    var f = FudgeCore;
    class Enemy extends L11_Doom_Enemy_b.GameObject {
        constructor(_size, _position, _rotation, _material) {
            super("Enemy", _size, _position, _rotation);
            let cmpMaterial = new f.ComponentMaterial(_material);
            cmpMaterial.pivot.scale(f.Vector2.ONE(1));
            this.addComponent(cmpMaterial);
        }
        followAvatar() {
            // Only works when the enemy also does the faceAvatar()-Action:
            //this.mtxLocal.translate(f.Vector3.SCALE(this.mtxWorld.getZ(), 0.03));
            this.mtxLocal.translateZ(0.05);
        }
    }
    L11_Doom_Enemy_b.Enemy = Enemy;
})(L11_Doom_Enemy_b || (L11_Doom_Enemy_b = {}));
//# sourceMappingURL=Enemy.js.map