"use strict";
var L07_BreakOut_Final;
(function (L07_BreakOut_Final) {
    var f = FudgeCore;
    let GAMESTATE;
    (function (GAMESTATE) {
        GAMESTATE[GAMESTATE["PLAY"] = 0] = "PLAY";
        GAMESTATE[GAMESTATE["GAMEOVER"] = 1] = "GAMEOVER";
    })(GAMESTATE || (GAMESTATE = {}));
    window.addEventListener("load", hndLoad);
    // window.addEventListener("click", sceneLoad);
    let ball;
    let walls;
    let paddle;
    let bricks;
    let wallBottom;
    let gameState = GAMESTATE.PLAY;
    let score = 0;
    let powerUps;
    let root;
    let control = new f.Control("PaddleControl", 20, 0 /* PROPORTIONAL */);
    control.setDelay(100);
    function hndLoad(_event) {
        const canvas = document.querySelector("canvas");
        // f.Debug.log(canvas);
        root = new f.Node("Root");
        ball = new L07_BreakOut_Final.Moveable("Ball", new f.Vector2(0, 0), new f.Vector2(1, 1));
        root.addChild(ball);
        paddle = new L07_BreakOut_Final.Moveable("Paddle", new f.Vector2(0, -10), new f.Vector2(5, 1));
        root.addChild(paddle);
        walls = new f.Node("Walls");
        root.addChild(walls);
        walls.addChild(new L07_BreakOut_Final.GameObject("WallLeft", new f.Vector2(-18, 0), new f.Vector2(1, 30)));
        walls.addChild(new L07_BreakOut_Final.GameObject("WallRight", new f.Vector2(18, 0), new f.Vector2(1, 30)));
        walls.addChild(new L07_BreakOut_Final.GameObject("WallTop", new f.Vector2(0, 12), new f.Vector2(40, 1)));
        wallBottom = new L07_BreakOut_Final.GameObject("WallBottom", new f.Vector2(0, -15), new f.Vector2(40, 1));
        wallBottom.removeComponent(wallBottom.getComponent(f.ComponentMaterial));
        walls.appendChild(wallBottom);
        bricks = createBricks(24);
        root.addChild(bricks);
        powerUps = new f.Node("PowerUps");
        root.appendChild(powerUps);
        let cmpCamera = new f.ComponentCamera();
        cmpCamera.pivot.translateZ(40);
        cmpCamera.pivot.rotateY(180);
        L07_BreakOut_Final.viewport = new f.Viewport();
        L07_BreakOut_Final.viewport.initialize("Viewport", root, cmpCamera, canvas);
        f.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, hndLoop);
        f.Loop.start(f.LOOP_MODE.TIME_GAME, 60);
    }
    function createBricks(_amount) {
        let bricks = new f.Node("Bricks");
        let x = -15;
        let y = 10;
        for (let i = 0; i < _amount; i++) {
            if (x > 15) {
                x = -15;
                y -= 2;
            }
            bricks.addChild(new L07_BreakOut_Final.GameObject(`Brick-${i}`, new f.Vector2(x, y), new f.Vector2(3, 1)));
            x += 4;
        }
        return bricks;
    }
    function hndLoop(_event) {
        if (gameState == GAMESTATE.GAMEOVER)
            return;
        ball.move();
        controlPaddle();
        for (let powerUp of powerUps.getChildren())
            powerUp.move();
        hndCollision();
        L07_BreakOut_Final.viewport.draw();
    }
    function hndCollision() {
        for (let wall of walls.getChildren()) {
            if (ball.checkCollision(wall))
                if (wall == wallBottom) {
                    gameState = GAMESTATE.GAMEOVER;
                    displayScore(true);
                }
        }
        for (let brick of bricks.getChildren()) {
            if (ball.checkCollision(brick)) {
                bricks.removeChild(brick);
                score++;
                displayScore();
                if (Math.random() < 0.5) {
                    powerUps.appendChild(new L07_BreakOut_Final.PowerUp("PowerUp", brick.mtxLocal.translation.toVector2(), f.Vector2.ONE()));
                }
            }
        }
        ball.checkCollision(paddle);
        for (let powerUp of powerUps.getChildren())
            if (paddle.checkCollision(powerUp)) {
                powerUps.removeChild(powerUp);
                console.log("PowerUp!");
            }
    }
    function controlPaddle() {
        control.setInput(f.Keyboard.mapToValue(-1, 0, [f.KEYBOARD_CODE.A, f.KEYBOARD_CODE.ARROW_LEFT])
            + f.Keyboard.mapToValue(1, 0, [f.KEYBOARD_CODE.D, f.KEYBOARD_CODE.ARROW_RIGHT]));
        // let posPaddle: f.Vector3 = paddle.mtxLocal.translation;
        let mutator = paddle.mtxLocal.getMutator();
        paddle.velocity = f.Vector3.X(control.getOutput());
        paddle.move();
        if (paddle.checkCollision(walls.getChildrenByName("WallLeft")[0]) ||
            paddle.checkCollision(walls.getChildrenByName("WallRight")[0]))
            paddle.mtxLocal.mutate(mutator); //paddle.mtxLocal.translation = posPaddle;
    }
    function displayScore(_gameOver = false) {
        let output = document.querySelector("h2#Score");
        output.innerHTML = "Score: " + score;
        if (_gameOver)
            output.innerHTML += "<br/>GAME OVER";
    }
})(L07_BreakOut_Final || (L07_BreakOut_Final = {}));
//# sourceMappingURL=Main.js.map