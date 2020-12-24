namespace L03_BreakOut_Move {

    import f = FudgeCore;
    export let viewport: f.Viewport;

    let root: f.Node;
    let ball: f.Node;
    let velocity: f.Vector3 = new f.Vector3(f.Random.default.getRange(-1, 1), f.Random.default.getRange(-1, 1), 0);
    let speed: number = 6;
    velocity.normalize(speed);

    //let ballDirection: f.Vector3 = new f.Vector3(0, 0, 0);

    window.addEventListener("load", hndlLoad);

    function hndlLoad(_event: Event): void {

        const canvas: HTMLCanvasElement = document.querySelector("canvas");

        root = new f.Node("Root");

        // #region Ball
        ball = new f.Node("Ball");
        ball.addComponent(new f.ComponentTransform());
        let meshBall: f.MeshSphere = new f.MeshSphere("Ball", 6, 6);
        let cmpBall: f.ComponentMesh = new f.ComponentMesh(meshBall);
        ball.addComponent(cmpBall);
        cmpBall.pivot.translateZ(1);

        let lime: f.Material = new f.Material("Green", f.ShaderUniColor, new f.CoatColored(f.Color.CSS("LIME")));
        let cmpLime: f.ComponentMaterial = new f.ComponentMaterial(lime);
        ball.addComponent(cmpLime);

        root.appendChild(ball);
        // #endregion

        let cmpCamera: f.ComponentCamera = new f.ComponentCamera();
        cmpCamera.pivot.translateZ(40);
        cmpCamera.pivot.rotateY(180);

        viewport = new f.Viewport();
        viewport.initialize("Viewport", root, cmpCamera, canvas);

        f.Loop.addEventListener(f.EVENT.LOOP_FRAME, hndlLoop);
        f.Loop.start(f.LOOP_MODE.TIME_GAME, 30);
    }

    function hndlLoop(_event: Event): void {
        console.log("Tick");
        let frameTime: number = f.Time.game.getElapsedSincePreviousCall() / 1000; //in Millisekunden
        let tmpVelocity: f.Vector3 = velocity.copy;
        tmpVelocity.scale(frameTime);
        //velocity.x *= frameTime;
        //velocity.y *= frameTime;
        ball.mtxLocal.translate(tmpVelocity);

        viewport.draw();
    }
}