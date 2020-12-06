namespace L13_Doom_UIb {
    import f = FudgeCore;
    import faid = FudgeAid;
  
    export class ComponentStateMachineEnemy extends faid.ComponentStateMachine<JOB> {
      private static instructions: faid.StateMachineInstructions<JOB> = ComponentStateMachineEnemy.setupStateMachine();
  
      public constructor() {
        super();
        this.instructions = ComponentStateMachineEnemy.instructions;
      }
  
      private static setupStateMachine(): faid.StateMachineInstructions<JOB> {
        let setup: faid.StateMachineInstructions<JOB> = new faid.StateMachineInstructions();
  
        setup.setAction(JOB.PATROL, (_machine) => {
          let container: Enemy = <Enemy>(<faid.ComponentStateMachine<JOB>>_machine).getContainer();
          // console.log(container);
          if (container.mtxLocal.translation.equals(container.posTarget, 0.1))
            _machine.transit(JOB.IDLE);
          container.move();
        });
  
        setup.setTransition(JOB.PATROL, JOB.IDLE, (_machine) => {
          let container: Enemy = <Enemy>(<faid.ComponentStateMachine<JOB>>_machine).getContainer();
          f.Time.game.setTimer(3000, 1, (_event: f.EventTimer) => {
            container.chooseTargetPosition();
            _machine.transit(JOB.PATROL);
          })
        });
  
        return setup;
      }
    }
  }