"use strict";
var L07_BreakOut_Final;
(function (L07_BreakOut_Final) {
    var f = FudgeCore;
    let PowerUp = /** @class */ (() => {
        class PowerUp extends L07_BreakOut_Final.Moveable {
            constructor(_name, _position, _size) {
                super(_name, _position, _size);
                this.velocity = f.Vector3.Y(-5);
                this.getComponent(f.ComponentMesh).mesh = PowerUp.meshSphere;
            }
        }
        PowerUp.meshSphere = new f.MeshSphere("Sphere", 5, 10);
        return PowerUp;
    })();
    L07_BreakOut_Final.PowerUp = PowerUp;
})(L07_BreakOut_Final || (L07_BreakOut_Final = {}));
//# sourceMappingURL=PowerUp.js.map