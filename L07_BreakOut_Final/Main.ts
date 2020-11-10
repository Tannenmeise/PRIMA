namespace L07_BreakOut_Final {
  import f = FudgeCore;

  enum GAMESTATE {
    PLAY, GAMEOVER
  }

  window.addEventListener("load", hndLoad);
  // window.addEventListener("click", sceneLoad);
  let ball: Moveable;
  let walls: f.Node;
  let paddle: Moveable;
  let bricks: f.Node;
  let wallBottom: GameObject;
  let gameState: GAMESTATE = GAMESTATE.PLAY;
  let score: number = 0;
  let powerUps: f.Node;

  export let viewport: f.Viewport;
  let root: f.Node;

  let control: f.Control = new f.Control("PaddleControl", 20, f.CONTROL_TYPE.PROPORTIONAL);
  control.setDelay(100);

  function hndLoad(_event: Event): void {

    const canvas: HTMLCanvasElement = document.querySelector("canvas");
    // f.Debug.log(canvas);

    root = new f.Node("Root");

    ball = new Moveable("Ball", new f.Vector2(0, 0), new f.Vector2(1, 1));
    root.addChild(ball);

    paddle = new Moveable("Paddle", new f.Vector2(0, -10), new f.Vector2(5, 1));
    root.addChild(paddle);

    walls = new f.Node("Walls");
    root.addChild(walls);

    walls.addChild(new GameObject("WallLeft", new f.Vector2(-18, 0), new f.Vector2(1, 30)));
    walls.addChild(new GameObject("WallRight", new f.Vector2(18, 0), new f.Vector2(1, 30)));
    walls.addChild(new GameObject("WallTop", new f.Vector2(0, 12), new f.Vector2(40, 1)));
    wallBottom = new GameObject("WallBottom", new f.Vector2(0, -15), new f.Vector2(40, 1));
    wallBottom.removeComponent(wallBottom.getComponent(f.ComponentMaterial));
    walls.appendChild(wallBottom);

    bricks = createBricks(24);
    root.addChild(bricks);

    powerUps = new f.Node("PowerUps");
    root.appendChild(powerUps);

    let cmpCamera: f.ComponentCamera = new f.ComponentCamera();
    cmpCamera.pivot.translateZ(40);
    cmpCamera.pivot.rotateY(180);

    viewport = new f.Viewport();
    viewport.initialize("Viewport", root, cmpCamera, canvas);

    f.Loop.addEventListener(f.EVENT.LOOP_FRAME, hndLoop);
    f.Loop.start(f.LOOP_MODE.TIME_GAME, 60);
  }

  function createBricks(_amount: number): f.Node {
    let bricks: f.Node = new f.Node("Bricks");
    let x: number = -15;
    let y: number = 10;
    for (let i: number = 0; i < _amount; i++) {
      if (x > 15) {
        x = -15;
        y -= 2;
      }

      bricks.addChild(new GameObject(`Brick-${i}`, new f.Vector2(x, y), new f.Vector2(3, 1)));
      x += 4;
    }

    return bricks;
  }

  function hndLoop(_event: Event): void {
    if (gameState == GAMESTATE.GAMEOVER)
      return;

    ball.move();
    controlPaddle();
    for (let powerUp of powerUps.getChildren() as PowerUp[])
      powerUp.move();

    hndCollision();

    viewport.draw();
  }

  function hndCollision(): void {
    for (let wall of walls.getChildren()) {
      if (ball.checkCollision(<GameObject>wall))
        if (wall == wallBottom) {
          gameState = GAMESTATE.GAMEOVER;
          displayScore(true);
        }
    }

    for (let brick of bricks.getChildren() as GameObject[]) {
      if (ball.checkCollision(brick)) {
        bricks.removeChild(brick);
        score++;
        displayScore();

        if (Math.random() < 0.5) {
          powerUps.appendChild(new PowerUp("PowerUp", brick.mtxLocal.translation.toVector2(), f.Vector2.ONE()));
        }
      }
    }

    ball.checkCollision(paddle);

    for (let powerUp of powerUps.getChildren() as PowerUp[])
      if (paddle.checkCollision(powerUp)) {
        powerUps.removeChild(powerUp);
        console.log("PowerUp!");
      }
  }

  function controlPaddle(): void {
    control.setInput(
      f.Keyboard.mapToValue(-1, 0, [f.KEYBOARD_CODE.A, f.KEYBOARD_CODE.ARROW_LEFT])
      + f.Keyboard.mapToValue(1, 0, [f.KEYBOARD_CODE.D, f.KEYBOARD_CODE.ARROW_RIGHT])
    );

    // let posPaddle: f.Vector3 = paddle.mtxLocal.translation;
    let mutator: f.Mutator = paddle.mtxLocal.getMutator();
    paddle.velocity = f.Vector3.X(control.getOutput());
    paddle.move();
    if (
      paddle.checkCollision(<GameObject>walls.getChildrenByName("WallLeft")[0]) ||
      paddle.checkCollision(<GameObject>walls.getChildrenByName("WallRight")[0])
    ) paddle.mtxLocal.mutate(mutator);    //paddle.mtxLocal.translation = posPaddle;
  }

  function displayScore(_gameOver: boolean = false): void {
    let output: HTMLHeadingElement = document.querySelector("h2#Score");
    output.innerHTML = "Score: " + score;

    if (_gameOver)
      output.innerHTML += "<br/>GAME OVER";
  }
}