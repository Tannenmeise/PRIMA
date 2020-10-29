namespace L06_BreakOut_Paddle {
    import f = FudgeCore;
  
    export class Paddle extends GameObject {
      
      public rect: f.Rectangle;
  
      
      public constructor(_name: string, _position: f.Vector2, _size: f.Vector2) {
        super(_name, _position, _size);
      }


      public move(): void {
        if (f.Keyboard.isPressedOne([f.KEYBOARD_CODE.ARROW_LEFT])) {
            this.mtxLocal.translate(new f.Vector3(-1, 0));
            this.rect.position.x -= 1;
          }
        if (f.Keyboard.isPressedOne([f.KEYBOARD_CODE.ARROW_RIGHT])) {
            this.mtxLocal.translate(new f.Vector3(1, 0));
            this.rect.position.x += 1;
        }
      }

    }
  }