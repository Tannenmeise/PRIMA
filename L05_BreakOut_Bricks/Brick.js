"use strict";
var L05_BreakOut_Bricks;
(function (L05_BreakOut_Bricks) {
    class Bricks extends L05_BreakOut_Bricks.GameObject {
        constructor(_name, _position, _size) {
            super(_name, _position, _size);
        }
        hit() {
            this.getParent().removeChild(this);
        }
    }
    L05_BreakOut_Bricks.Bricks = Bricks;
})(L05_BreakOut_Bricks || (L05_BreakOut_Bricks = {}));
//# sourceMappingURL=Brick.js.map