"use strict";
var L06_BreakOut_Paddle;
(function (L06_BreakOut_Paddle) {
    var f = FudgeCore;
    window.addEventListener("load", hndLoad);
    // window.addEventListener("click", sceneLoad);
    let root;
    let ball;
    let walls;
    let bricks;
    let paddle;
    function hndLoad(_event) {
        const canvas = document.querySelector("canvas");
        // f.Debug.log(canvas);
        // #region (OBJECTS)
        root = new f.Node("Root");
        ball = new L06_BreakOut_Paddle.Moveable("Ball", new f.Vector2(0, 0), new f.Vector2(1, 1));
        root.addChild(ball);
        walls = new f.Node("Walls");
        root.addChild(walls);
        walls.addChild(new L06_BreakOut_Paddle.GameObject("WallLeft", new f.Vector2(-18, 0), new f.Vector2(1, 30)));
        walls.addChild(new L06_BreakOut_Paddle.GameObject("WallRight", new f.Vector2(18, 0), new f.Vector2(1, 30)));
        walls.addChild(new L06_BreakOut_Paddle.GameObject("WallTop", new f.Vector2(0, 12), new f.Vector2(40, 1)));
        walls.addChild(new L06_BreakOut_Paddle.GameObject("WallBottom", new f.Vector2(0, -12), new f.Vector2(40, 1)));
        bricks = new f.Node("Bricks");
        addBricks(24);
        root.addChild(bricks);
        paddle = new L06_BreakOut_Paddle.Paddle("Paddle", new f.Vector2(0, -10), new f.Vector2(6, 1));
        root.addChild(paddle);
        // #endregion
        let cmpCamera = new f.ComponentCamera();
        cmpCamera.pivot.translateZ(40);
        cmpCamera.pivot.rotateY(180);
        L06_BreakOut_Paddle.viewport = new f.Viewport();
        L06_BreakOut_Paddle.viewport.initialize("Viewport", root, cmpCamera, canvas);
        f.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, hndLoop);
        f.Loop.start(f.LOOP_MODE.TIME_GAME, 30);
    }
    function hndLoop(_event) {
        ball.move();
        L06_BreakOut_Paddle.viewport.draw();
        hndCollision();
        paddle.move();
        //let axis: f.Axis = new f.Axis("string", 1, f.CONTROL_TYPE.DIFFERENTIAL, true);
        // let control: f.Control = new f.Control("string", 1, f.CONTROL_TYPE.DIFFERENTIAL, true);
    }
    function hndCollision() {
        for (let wall of walls.getChildren())
            ball.checkCollision(wall);
        for (let brick of bricks.getChildren())
            if (ball.checkCollision(brick))
                brick.hit();
        ball.checkCollision(paddle);
    }
    function addBricks(_amount) {
        let x = -15;
        let y = 10;
        for (let i = 0; i < _amount; i++) {
            if (x > 15) {
                x = -15;
                y -= 2;
            }
            bricks.addChild(new L06_BreakOut_Paddle.Bricks(`Brick-${i}`, new f.Vector2(x, y), new f.Vector2(3, 1)));
            x += 4;
        }
    }
})(L06_BreakOut_Paddle || (L06_BreakOut_Paddle = {}));
//# sourceMappingURL=Main.js.map