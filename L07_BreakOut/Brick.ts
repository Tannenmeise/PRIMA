namespace L07_BreakOut {
    import f = FudgeCore;
  
    export class Bricks extends GameObject {

      private static readonly mtrYellow: f.Material = new f.Material("Yellow", f.ShaderUniColor, new f.CoatColored(f.Color.CSS("YELLOW")));
      private static readonly mtrRed: f.Material = new f.Material("Red", f.ShaderUniColor, new f.CoatColored(f.Color.CSS("RED")));
      public health: number = 2; // weiß -> gelb -> rot

      public rect: f.Rectangle;


      public constructor(_name: string, _position: f.Vector2, _size: f.Vector2) {
        super(_name, _position, _size);
      }

      
      public hit(): void {

        switch (this.health) {
          case 2:
            this.removeComponent(this.getComponent(f.ComponentMaterial));
            this.addComponent(new f.ComponentMaterial(Bricks.mtrYellow));
            this.health--;
            break;
          case 1:
            this.removeComponent(this.getComponent(f.ComponentMaterial));
            this.addComponent(new f.ComponentMaterial(Bricks.mtrRed));
            this.health--;
            break;
          case 0:
            this.getParent().removeChild(this);
        }
      }
      
    }
  }