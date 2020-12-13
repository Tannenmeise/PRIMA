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
                    if (container.mtxLocal.translation.equals(container.posTarget, 0.1))
                        _machine.transit(L14_Doom_Audio.JOB.IDLE);
                    if (container.health <= 0)
                        _machine.transit(L14_Doom_Audio.JOB.DEAD);
                    container.move();
                });
                setup.setAction(L14_Doom_Audio.JOB.IDLE, (_machine) => {
                    let container = _machine.getContainer();
                    if (container.health <= 0)
                        _machine.transit(L14_Doom_Audio.JOB.DEAD);
                });
                setup.setTransition(L14_Doom_Audio.JOB.PATROL, L14_Doom_Audio.JOB.IDLE, (_machine) => {
                    let container = _machine.getContainer();
                    f.Time.game.setTimer(3000, 1, (_event) => {
                        container.chooseTargetPosition();
                        _machine.transit(L14_Doom_Audio.JOB.PATROL);
                    });
                });
                setup.setAction(L14_Doom_Audio.JOB.DEAD, (_machine) => {
                    let container = _machine.getContainer();
                    container.sprite.setAnimation(L14_Doom_Audio.Enemy.animations["Dead"]);
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