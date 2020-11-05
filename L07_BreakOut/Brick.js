"use strict";
var L07_BreakOut;
(function (L07_BreakOut) {
    var f = FudgeCore;
    let Bricks = /** @class */ (() => {
        class Bricks extends L07_BreakOut.GameObject {
            constructor(_name, _position, _size) {
                super(_name, _position, _size);
                this.health = 2; // weiß -> gelb -> rot
            }
            hit() {
                switch (this.health) {
                    case 2:
                        this.removeComponent(this.getComponent(f.ComponentMaterial));
                        this.addComponent(new f.ComponentMaterial(Bricks.mtrYellow));
                        this.health--;
                        break;
                    case 1:
                        this.removeComponent(this.getComponent(f.ComponentMaterial));
                        this.addComponent(new f.ComponentMaterial(Bricks.mtrRed));
                        this.health--;
                        break;
                    case 0:
                        this.getParent().removeChild(this);
                }
            }
        }
        Bricks.mtrYellow = new f.Material("Yellow", f.ShaderUniColor, new f.CoatColored(f.Color.CSS("YELLOW")));
        Bricks.mtrRed = new f.Material("Red", f.ShaderUniColor, new f.CoatColored(f.Color.CSS("RED")));
        return Bricks;
    })();
    L07_BreakOut.Bricks = Bricks;
})(L07_BreakOut || (L07_BreakOut = {}));
//# sourceMappingURL=Brick.js.map