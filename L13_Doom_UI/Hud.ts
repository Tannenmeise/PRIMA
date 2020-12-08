namespace L13_Doom_UI {
    import f = FudgeCore;
    import fui = FudgeUserInterface;
  
    export class GameState extends f.Mutable {
      public health: number = 100;
      public score: number = 0;
      public ammo: number = 100;
      protected reduceMutator(_mutator: f.Mutator): void {/* */ }
    }
  
    export let gameState: GameState = new GameState();
  
    export class Hud {
      private static controller: fui.Controller;
  
      public static start(): void {
        let domHud: HTMLDivElement = document.querySelector("div#hud");
        Hud.controller = new fui.Controller(gameState, domHud);
        Hud.controller.updateUserInterface();
      }
    }
  }