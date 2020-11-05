"use strict";
var L06_BreakOut_Control;
(function (L06_BreakOut_Control) {
    class Bricks extends L06_BreakOut_Control.GameObject {
        constructor(_name, _position, _size) {
            super(_name, _position, _size);
        }
        hit() {
            this.getParent().removeChild(this);
        }
    }
    L06_BreakOut_Control.Bricks = Bricks;
})(L06_BreakOut_Control || (L06_BreakOut_Control = {}));
//# sourceMappingURL=Brick.js.map