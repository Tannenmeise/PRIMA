namespace L06_BreakOut_Control {
  import f = FudgeCore;

  export class Bricks extends GameObject {
    public rect: f.Rectangle;


    public constructor(_name: string, _position: f.Vector2, _size: f.Vector2) {
      super(_name, _position, _size);
    }


    public hit(): void {
      this.getParent().removeChild(this);
    }
  }
}