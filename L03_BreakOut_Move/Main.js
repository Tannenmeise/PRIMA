"use strict";
var L03_BreakOut_Move;
(function (L03_BreakOut_Move) {
    var f = FudgeCore;
    let root;
    let ball;
    let velocity = new f.Vector3(f.Random.default.getRange(-1, 1), f.Random.default.getRange(-1, 1), 0);
    let speed = 6;
    velocity.normalize(speed);
    //let ballDirection: f.Vector3 = new f.Vector3(0, 0, 0);
    window.addEventListener("load", hndlLoad);
    function hndlLoad(_event) {
        const canvas = document.querySelector("canvas");
        root = new f.Node("Root");
        // #region Ball
        ball = new f.Node("Ball");
        ball.addComponent(new f.ComponentTransform());
        let meshBall = new f.MeshSphere("Ball", 6, 6);
        let cmpBall = new f.ComponentMesh(meshBall);
        ball.addComponent(cmpBall);
        cmpBall.pivot.translateZ(1);
        let lime = new f.Material("Green", f.ShaderUniColor, new f.CoatColored(f.Color.CSS("LIME")));
        let cmpLime = new f.ComponentMaterial(lime);
        ball.addComponent(cmpLime);
        root.appendChild(ball);
        // #endregion
        let cmpCamera = new f.ComponentCamera();
        cmpCamera.pivot.translateZ(40);
        cmpCamera.pivot.rotateY(180);
        L03_BreakOut_Move.viewport = new f.Viewport();
        L03_BreakOut_Move.viewport.initialize("Viewport", root, cmpCamera, canvas);
        f.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, hndlLoop);
        f.Loop.start(f.LOOP_MODE.TIME_GAME, 30);
    }
    function hndlLoop(_event) {
        console.log("Tick");
        let frameTime = f.Time.game.getElapsedSincePreviousCall() / 1000; //in Millisekunden
        let tmpVelocity = velocity.copy;
        tmpVelocity.scale(frameTime);
        //velocity.x *= frameTime;
        //velocity.y *= frameTime;
        ball.mtxLocal.translate(tmpVelocity);
        L03_BreakOut_Move.viewport.draw();
    }
})(L03_BreakOut_Move || (L03_BreakOut_Move = {}));
//# sourceMappingURL=Main.js.map