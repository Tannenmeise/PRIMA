"use strict";
var L13_Doom_UI;
(function (L13_Doom_UI) {
    var f = FudgeCore;
    var faid = FudgeAid;
    let ComponentStateMachineEnemy = /** @class */ (() => {
        class ComponentStateMachineEnemy extends faid.ComponentStateMachine {
            constructor() {
                super();
                this.instructions = ComponentStateMachineEnemy.instructions;
            }
            static setupStateMachine() {
                let setup = new faid.StateMachineInstructions();
                setup.setAction(L13_Doom_UI.JOB.PATROL, (_machine) => {
                    let container = _machine.getContainer();
                    // console.log(container);
                    if (container.mtxLocal.translation.equals(container.posTarget, 0.1))
                        _machine.transit(L13_Doom_UI.JOB.IDLE);
                    container.move();
                });
                setup.setTransition(L13_Doom_UI.JOB.PATROL, L13_Doom_UI.JOB.IDLE, (_machine) => {
                    let container = _machine.getContainer();
                    f.Time.game.setTimer(3000, 1, (_event) => {
                        container.chooseTargetPosition();
                        _machine.transit(L13_Doom_UI.JOB.PATROL);
                    });
                });
                return setup;
            }
        }
        ComponentStateMachineEnemy.instructions = ComponentStateMachineEnemy.setupStateMachine();
        return ComponentStateMachineEnemy;
    })();
    L13_Doom_UI.ComponentStateMachineEnemy = ComponentStateMachineEnemy;
})(L13_Doom_UI || (L13_Doom_UI = {}));
//# sourceMappingURL=StateMachine.js.map