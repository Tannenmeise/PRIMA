namespace L14_Doom_Audio {
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
          if (container.mtxLocal.translation.equals(container.posTarget, 0.1))
            _machine.transit(JOB.IDLE);
          if (container.health <= 0)
            _machine.transit(JOB.DEAD);
          container.move();
        });

        setup.setAction(JOB.IDLE, (_machine) => {
          let container: Enemy = <Enemy>(<faid.ComponentStateMachine<JOB>>_machine).getContainer();
          if (container.health <= 0)
            _machine.transit(JOB.DEAD);
        });
  
        setup.setTransition(JOB.PATROL, JOB.IDLE, (_machine) => {
          let container: Enemy = <Enemy>(<faid.ComponentStateMachine<JOB>>_machine).getContainer();
          f.Time.game.setTimer(3000, 1, (_event: f.EventTimer) => {
            container.chooseTargetPosition();
            _machine.transit(JOB.PATROL);
          });
        });
        
        setup.setAction(JOB.DEAD, (_machine) => {
          let container: Enemy = <Enemy>(<faid.ComponentStateMachine<JOB>>_machine).getContainer();
          container.sprite.setAnimation(<faid.SpriteSheetAnimation>Enemy.animations["Dead"]);
        });
  
        return setup;
      }
    }
  }