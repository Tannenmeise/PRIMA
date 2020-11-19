"use strict";
var L11_Doom_Enemy;
(function (L11_Doom_Enemy) {
    var f = FudgeCore;
    class Enemy extends L11_Doom_Enemy.GameObject {
        constructor(_size, _position, _rotation, _material) {
            super("Enemy", _size, _position, _rotation);
            let cmpMaterial = new f.ComponentMaterial(_material);
            cmpMaterial.pivot.scale(f.Vector2.ONE(1));
            this.addComponent(cmpMaterial);
        }
        seesAvatar(_target, _avatar) {
            let posAvatar = new f.Vector3(_avatar.mtxWorld.translation.x, _avatar.mtxWorld.translation.y, _avatar.mtxWorld.translation.z);
            let posEnemy = new f.Vector3(_target.mtxWorld.translation.x, _target.mtxWorld.translation.y, _target.mtxWorld.translation.z);
            let vctAvatar = f.Vector3.DIFFERENCE(posAvatar, posEnemy);
            let distance = f.Vector3.DOT(vctAvatar, _target.mtxWorld.getZ());
            /*
            let ray: f.Ray = new f.Ray(_target.mtxWorld.getZ(), _target.mtxWorld.translation);
            // iterate through all walls?:
            let intersect: f.Vector3 = ray.intersectPlane(posThis, normal);
            */
            // distance is short enough (& NO WALL IN BETWEEN):
            if (distance < 20) {
                return true;
            }
            return false;
        }
        followAvatar(_target, _avatar) {
            _target.mtxLocal.translate(f.Vector3.SCALE(_target.mtxWorld.getZ(), 0.03));
        }
    }
    L11_Doom_Enemy.Enemy = Enemy;
})(L11_Doom_Enemy || (L11_Doom_Enemy = {}));
//# sourceMappingURL=Enemy.js.map