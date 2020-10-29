"use strict";
var L06_BreakOut_Paddle;
(function (L06_BreakOut_Paddle) {
    var f = FudgeCore;
    class Paddle extends L06_BreakOut_Paddle.GameObject {
        constructor(_name, _position, _size) {
            super(_name, _position, _size);
        }
        move() {
            if (f.Keyboard.isPressedOne([f.KEYBOARD_CODE.ARROW_LEFT])) {
                this.mtxLocal.translate(new f.Vector3(-1, 0));
                this.rect.position.x -= 1;
            }
            if (f.Keyboard.isPressedOne([f.KEYBOARD_CODE.ARROW_RIGHT])) {
                this.mtxLocal.translate(new f.Vector3(1, 0));
                this.rect.position.x += 1;
            }
        }
    }
    L06_BreakOut_Paddle.Paddle = Paddle;
})(L06_BreakOut_Paddle || (L06_BreakOut_Paddle = {}));
//# sourceMappingURL=Paddle.js.map