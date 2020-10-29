"use strict";
var L05_BreakOut_Bricks;
(function (L05_BreakOut_Bricks) {
    var f = FudgeCore;
    let Moveable = /** @class */ (() => {
        class Moveable extends L05_BreakOut_Bricks.GameObject {
            constructor(_name, _position, _size) {
                super(_name, _position, _size);
                this.speed = 15;
                this.velocity = f.Vector3.ZERO();
                this.velocity = new f.Vector3(f.Random.default.getRange(-1, 1), f.Random.default.getRange(-1, 1), 0);
                this.velocity.normalize(this.speed);
            }
            /**
             * move moves the game object and the collision detection reactangle
             */
            move() {
                let frameTime = f.Loop.timeFrameGame / 1000;
                let distance = f.Vector3.SCALE(this.velocity, frameTime);
                this.mtxLocal.translate(distance);
                this.rect.position.x = this.mtxLocal.translation.x - this.rect.size.x / 2;
                this.rect.position.y = this.mtxLocal.translation.y - this.rect.size.y / 2;
            }
            /**
             * collides returns if the moveable itself collides with the _target and if so
             * reflects the movement
             */
            checkCollision(_target) {
                let intersection = this.rect.getIntersection(_target.rect);
                if (intersection == null)
                    return false;
                if (intersection.size.x > intersection.size.y)
                    this.velocity.reflect(Moveable.REFLECT_VECTOR_Y);
                else
                    this.velocity.reflect(Moveable.REFLECT_VECTOR_X);
                return true;
            }
        }
        Moveable.REFLECT_VECTOR_X = f.Vector3.X();
        Moveable.REFLECT_VECTOR_Y = f.Vector3.Y();
        return Moveable;
    })();
    L05_BreakOut_Bricks.Moveable = Moveable;
})(L05_BreakOut_Bricks || (L05_BreakOut_Bricks = {}));
//# sourceMappingURL=Moveable.js.map