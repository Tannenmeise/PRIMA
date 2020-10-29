"use strict";
var L05_BreakOut_Bricks;
(function (L05_BreakOut_Bricks) {
    var f = FudgeCore;
    window.addEventListener("load", hndLoad);
    // window.addEventListener("click", sceneLoad);
    let root;
    let ball;
    let walls;
    let bricks;
    function hndLoad(_event) {
        const canvas = document.querySelector("canvas");
        // f.Debug.log(canvas);
        root = new f.Node("Root");
        ball = new L05_BreakOut_Bricks.Moveable("Ball", new f.Vector2(0, 0), new f.Vector2(1, 1));
        root.addChild(ball);
        walls = new f.Node("Walls");
        root.addChild(walls);
        walls.addChild(new L05_BreakOut_Bricks.GameObject("WallLeft", new f.Vector2(-18, 0), new f.Vector2(1, 30)));
        walls.addChild(new L05_BreakOut_Bricks.GameObject("WallRight", new f.Vector2(18, 0), new f.Vector2(1, 30)));
        walls.addChild(new L05_BreakOut_Bricks.GameObject("WallTop", new f.Vector2(0, 12), new f.Vector2(40, 1)));
        walls.addChild(new L05_BreakOut_Bricks.GameObject("WallBottom", new f.Vector2(0, -12), new f.Vector2(40, 1)));
        bricks = new f.Node("Bricks");
        addBricks(24);
        root.addChild(bricks);
        let cmpCamera = new f.ComponentCamera();
        cmpCamera.pivot.translateZ(40);
        cmpCamera.pivot.rotateY(180);
        L05_BreakOut_Bricks.viewport = new f.Viewport();
        L05_BreakOut_Bricks.viewport.initialize("Viewport", root, cmpCamera, canvas);
        f.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, hndLoop);
        f.Loop.start(f.LOOP_MODE.TIME_GAME, 30);
    }
    function hndLoop(_event) {
        ball.move();
        L05_BreakOut_Bricks.viewport.draw();
        hndCollision();
        if (f.Keyboard.isPressedOne([f.KEYBOARD_CODE.ARROW_LEFT, f.KEYBOARD_CODE.ARROW_RIGHT]))
            console.log("Arrow pressed");
        if (f.Keyboard.isPressedCombo([f.KEYBOARD_CODE.ARROW_LEFT, f.KEYBOARD_CODE.ARROW_RIGHT]))
            console.log("Arrow-Combo pressed");
        //new f.Axis(),
        //new f.Control();
    }
    function hndCollision() {
        for (let wall of walls.getChildren())
            ball.checkCollision(wall);
        for (let brick of bricks.getChildren())
            if (ball.checkCollision(brick))
                brick.hit();
    }
    function addBricks(_amount) {
        let x = -15;
        let y = 10;
        for (let i = 0; i < _amount; i++) {
            if (x > 15) {
                x = -15;
                y -= 2;
            }
            bricks.addChild(new L05_BreakOut_Bricks.Bricks(`Brick-${i}`, new f.Vector2(x, y), new f.Vector2(3, 1)));
            x += 4;
        }
    }
})(L05_BreakOut_Bricks || (L05_BreakOut_Bricks = {}));
//# sourceMappingURL=Main.js.map