namespace L03_BouncingBall {

    import f = FudgeCore;
    export let viewport: f.Viewport;

    let root: f.Node;

    let ballDirection: f.Vector3 = new f.Vector3(0.01, 0.01, 0);

    window.addEventListener("load", hndlLoad);
    
    function hndlLoad(_event: Event): void {
        
        const canvas: HTMLCanvasElement = document.querySelector("canvas");

        root = new f.Node("Root");
        root.addComponent(new f.ComponentTransform());

        // #region Ball
        let ball: f.Node = new f.Node("Ball");
        let meshBall: f.MeshSphere = new f.MeshSphere("Ball", 6, 6);
        let cmpBall: f.ComponentMesh = new f.ComponentMesh(meshBall);
        ball.addComponent(cmpBall);
        cmpBall.pivot.translateZ(1);
        cmpBall.pivot.scaleX(0.2);
        cmpBall.pivot.scaleY(0.2);
        cmpBall.pivot.scaleZ(0.2);

        let lime: f.Material = new f.Material("Green", f.ShaderUniColor , new f.CoatColored(f.Color.CSS("LIME")));
        let cmpLime: f.ComponentMaterial = new f.ComponentMaterial(lime);
        ball.addComponent(cmpLime);

        root.appendChild(ball);
        // #endregion

        let cmpCamera: f.ComponentCamera = new f.ComponentCamera();
        cmpCamera.pivot.translateZ(4);
        cmpCamera.pivot.rotateY(180);

        viewport = new f.Viewport();
        viewport.initialize("Viewport", root, cmpCamera, canvas);

        f.Loop.addEventListener(f.EVENT.LOOP_FRAME, hndlLoop);
        f.Loop.start(f.LOOP_MODE.TIME_GAME, 30);
    }

    function hndlLoop(_event: Event): void {
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
        viewport.draw();
    }
}