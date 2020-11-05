namespace L06_BreakOut_Control {
  import f = FudgeCore;

  window.addEventListener("load", hndLoad);
  // window.addEventListener("click", sceneLoad);
  let root: f.Node;
  let ball: Moveable;
  let walls: f.Node;
  let bricks: f.Node;
  let paddle: Moveable;

  let control: f.Control = new f.Control("PaddleControl", 20, f.CONTROL_TYPE.PROPORTIONAL);
  control.setDelay(200);

  export let viewport: f.Viewport;


  function hndLoad(_event: Event): void {

    const canvas: HTMLCanvasElement = document.querySelector("canvas");
    // f.Debug.log(canvas);

    // #region (OBJECTS)
    root = new f.Node("Root");

    ball = new Moveable("Ball", new f.Vector2(0, 0), new f.Vector2(1, 1));
    root.addChild(ball);

    walls = new f.Node("Walls");
    root.addChild(walls);

    walls.addChild(new GameObject("WallLeft", new f.Vector2(-18, 0), new f.Vector2(1, 30)));
    walls.addChild(new GameObject("WallRight", new f.Vector2(18, 0), new f.Vector2(1, 30)));
    walls.addChild(new GameObject("WallTop", new f.Vector2(0, 12), new f.Vector2(40, 1)));
    walls.addChild(new GameObject("WallBottom", new f.Vector2(0, -12), new f.Vector2(40, 1)));

    bricks = new f.Node("Bricks");
    addBricks(24);
    root.addChild(bricks);

    paddle = new Moveable("Paddle", new f.Vector2(0, -10), new f.Vector2(5, 1));
    root.addChild(paddle);
    // #endregion

    let cmpCamera: f.ComponentCamera = new f.ComponentCamera();
    cmpCamera.pivot.translateZ(40);
    cmpCamera.pivot.rotateY(180);

    viewport = new f.Viewport();
    viewport.initialize("Viewport", root, cmpCamera, canvas);

    f.Loop.addEventListener(f.EVENT.LOOP_FRAME, hndLoop);
    f.Loop.start(f.LOOP_MODE.TIME_GAME, 30);
  }


  function hndLoop(_event: Event): void {
    ball.move();
    viewport.draw();

    control.setInput(
        f.Keyboard.mapToValue(-1, 0, [f.KEYBOARD_CODE.A, f.KEYBOARD_CODE.ARROW_LEFT])
        + f.Keyboard.mapToValue(1, 0, [f.KEYBOARD_CODE.D, f.KEYBOARD_CODE.ARROW_RIGHT])
    );
    paddle.velocity = f.Vector3.X(control.getOutput());
    paddle.move();

    hndCollision();
  }


  function hndCollision(): void {
    for (let wall of walls.getChildren())
      ball.checkCollision(<GameObject>wall);

    for (let brick of bricks.getChildren() as Bricks[])
      if (ball.checkCollision(brick))
        brick.hit();

    ball.checkCollision(paddle);
  }


  function addBricks(_amount: number): void {
    let x: number = -15;
    let y: number = 10;
    for (let i: number = 0; i < _amount; i++) {
      if (x > 15) {
        x = -15;
        y -= 2;
      }

      bricks.addChild(new Bricks(`Brick-${i}`, new f.Vector2(x, y), new f.Vector2(3, 1)));
      x += 4;
    }
  }


}