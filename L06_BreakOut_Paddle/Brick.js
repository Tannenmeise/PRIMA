"use strict";
var L06_BreakOut_Paddle;
(function (L06_BreakOut_Paddle) {
    class Bricks extends L06_BreakOut_Paddle.GameObject {
        constructor(_name, _position, _size) {
            super(_name, _position, _size);
        }
        hit() {
            this.getParent().removeChild(this);
        }
    }
    L06_BreakOut_Paddle.Bricks = Bricks;
})(L06_BreakOut_Paddle || (L06_BreakOut_Paddle = {}));
//# sourceMappingURL=Brick.js.map