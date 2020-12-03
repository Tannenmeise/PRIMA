"use strict";
var L12_Doom_StateMachine;
(function (L12_Doom_StateMachine) {
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
                setup.setAction(L12_Doom_StateMachine.JOB.PATROL, (_machine) => {
                    let container = _machine.getContainer();
                    // console.log(container);
                    if (container.mtxLocal.translation.equals(container.posTarget, 0.1))
                        _machine.transit(L12_Doom_StateMachine.JOB.IDLE);
                    container.move();
                });
                setup.setTransition(L12_Doom_StateMachine.JOB.PATROL, L12_Doom_StateMachine.JOB.IDLE, (_machine) => {
                    let container = _machine.getContainer();
                    f.Time.game.setTimer(3000, 1, (_event) => {
                        container.chooseTargetPosition();
                        _machine.transit(L12_Doom_StateMachine.JOB.PATROL);
                    });
                });
                return setup;
            }
        }
        ComponentStateMachineEnemy.instructions = ComponentStateMachineEnemy.setupStateMachine();
        return ComponentStateMachineEnemy;
    })();
    L12_Doom_StateMachine.ComponentStateMachineEnemy = ComponentStateMachineEnemy;
})(L12_Doom_StateMachine || (L12_Doom_StateMachine = {}));
//# sourceMappingURL=StateMachine.js.map