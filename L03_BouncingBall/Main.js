"use strict";
var L03_BouncingBall;
(function (L03_BouncingBall) {
    var f = FudgeCore;
    let root;
    let ballDirection = new f.Vector3(0.01, 0.01, 0);
    window.addEventListener("load", hndlLoad);
    function hndlLoad(_event) {
        const canvas = document.querySelector("canvas");
        root = new f.Node("Root");
        root.addComponent(new f.ComponentTransform());
        // #region Ball
        let ball = new f.Node("Ball");
        let meshBall = new f.MeshSphere("Ball", 6, 6);
        let cmpBall = new f.ComponentMesh(meshBall);
        ball.addComponent(cmpBall);
        cmpBall.pivot.translateZ(1);
        cmpBall.pivot.scaleX(0.2);
        cmpBall.pivot.scaleY(0.2);
        cmpBall.pivot.scaleZ(0.2);
        let lime = new f.Material("Green", f.ShaderUniColor, new f.CoatColored(f.Color.CSS("LIME")));
        let cmpLime = new f.ComponentMaterial(lime);
        ball.addComponent(cmpLime);
        root.appendChild(ball);
        // #endregion
        let cmpCamera = new f.ComponentCamera();
        cmpCamera.pivot.translateZ(4);
        cmpCamera.pivot.rotateY(180);
        L03_BouncingBall.viewport = new f.Viewport();
        L03_BouncingBall.viewport.initialize("Viewport", root, cmpCamera, canvas);
        f.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, hndlLoop);
        f.Loop.start(f.LOOP_MODE.TIME_GAME, 30);
    }
    function hndlLoop(_event) {
        console.log("Tick");
        // Ball hits sides
        if (root.mtxLocal.translation.x < -1.64 || root.mtxLocal.translation.x > 1.64) {
            ballDirection.x *= -1;
            console.log("Wall hit!");
        }
        // Ball hits top/bottom
        if (root.mtxLocal.translation.y < -0.77 || root.mtxLocal.translation.y > 0.77) {
            ballDirection.y *= -1;
            console.log("Top/Bottom hit!");
        }
        root.mtxLocal.translate(ballDirection);
        L03_BouncingBall.viewport.draw();
    }
})(L03_BouncingBall || (L03_BouncingBall = {}));
//# sourceMappingURL=Main.js.map