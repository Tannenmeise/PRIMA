"use strict";
var L14_Doom_Audio;
(function (L14_Doom_Audio) {
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
                setup.setAction(L14_Doom_Audio.JOB.PATROL, (_machine) => {
                    let container = _machine.getContainer();
                    // console.log(container);
                    if (container.mtxLocal.translation.equals(container.posTarget, 0.1))
                        _machine.transit(L14_Doom_Audio.JOB.IDLE);
                    container.move();
                });
                setup.setTransition(L14_Doom_Audio.JOB.PATROL, L14_Doom_Audio.JOB.IDLE, (_machine) => {
                    let container = _machine.getContainer();
                    f.Time.game.setTimer(3000, 1, (_event) => {
                        container.chooseTargetPosition();
                        _machine.transit(L14_Doom_Audio.JOB.PATROL);
                    });
                });
                return setup;
            }
        }
        ComponentStateMachineEnemy.instructions = ComponentStateMachineEnemy.setupStateMachine();
        return ComponentStateMachineEnemy;
    })();
    L14_Doom_Audio.ComponentStateMachineEnemy = ComponentStateMachineEnemy;
})(L14_Doom_Audio || (L14_Doom_Audio = {}));
//# sourceMappingURL=StateMachine.js.map