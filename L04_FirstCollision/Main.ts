namespace L04_FirstCollision {

    import f = FudgeCore;
    export let viewport: f.Viewport;

    let root: f.Node;
    let ball: f.Node;
    let velocity: f.Vector3 = new f.Vector3(f.Random.default.getRange(-1, 1), f.Random.default.getRange(-1, 1), 0);
    let speed: number = 6;
    velocity.normalize(speed);
    
    let border: f.Node;
    let leftBorder: f.Node;
    let rightBorder: f.Node;
    let topBorder: f.Node;
    let bottomBorder: f.Node;

    let bricks: f.Node;
    let brick1: f.Node;
    let brick2: f.Node;
    let brick3: f.Node;

    let paddle: f.Node;

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

        let mtrBall: f.Material = new f.Material("Green", f.ShaderUniColor , new f.CoatColored(f.Color.CSS("LIME")));
        let cmpBallMtr: f.ComponentMaterial = new f.ComponentMaterial(mtrBall);
        ball.addComponent(cmpBallMtr);

        cmpBall.pivot.translateZ(1);
        root.appendChild(ball);
        // #endregion

        // #region BORDERS
        border = new f.Node("Border");

        // LEFT BORDER
        leftBorder = new f.Node("Left_Border");

        leftBorder.addComponent(new f.ComponentTransform());
        let meshLeftBorder: f.MeshQuad = new f.MeshQuad();
        let cmpLeftBorder: f.ComponentMesh = new f.ComponentMesh(meshLeftBorder);
        leftBorder.addComponent(cmpLeftBorder);

        let mtrLeftBorder: f.Material = new f.Material("Blue", f.ShaderUniColor , new f.CoatColored(f.Color.CSS("BLUE")));
        let cmpLeftBorderMtr: f.ComponentMaterial = new f.ComponentMaterial(mtrLeftBorder);
        leftBorder.addComponent(cmpLeftBorderMtr);

        cmpLeftBorder.pivot.translateX(-20);
        cmpLeftBorder.pivot.scaleY(27);

        border.appendChild(leftBorder);

        // RIGHT BORDER:
        rightBorder = new f.Node("Right_Border");

        rightBorder.addComponent(new f.ComponentTransform());
        let meshRightBorder: f.MeshQuad = new f.MeshQuad();
        let cmpRightBorder: f.ComponentMesh = new f.ComponentMesh(meshRightBorder);
        rightBorder.addComponent(cmpRightBorder);

        let mtrRightBorder: f.Material = new f.Material("Blue", f.ShaderUniColor , new f.CoatColored(f.Color.CSS("BLUE")));
        let cmpRightBorderMtr: f.ComponentMaterial = new f.ComponentMaterial(mtrRightBorder);
        rightBorder.addComponent(cmpRightBorderMtr);

        cmpRightBorder.pivot.translateX(20);
        cmpRightBorder.pivot.scaleY(27);

        border.appendChild(rightBorder);
        
        // TOP BORDER:
        topBorder = new f.Node("Top_Border");

        topBorder.addComponent(new f.ComponentTransform());
        let meshTopBorder: f.MeshQuad = new f.MeshQuad();
        let cmpTopBorder: f.ComponentMesh = new f.ComponentMesh(meshTopBorder);
        topBorder.addComponent(cmpTopBorder);

        let mtrTopBorder: f.Material = new f.Material("Blue", f.ShaderUniColor , new f.CoatColored(f.Color.CSS("BLUE")));
        let cmpTopBorderMtr: f.ComponentMaterial = new f.ComponentMaterial(mtrTopBorder);
        topBorder.addComponent(cmpTopBorderMtr);

        cmpTopBorder.pivot.translateY(13);
        cmpTopBorder.pivot.scaleX(39);

        border.appendChild(topBorder);

        // BOTTOM BORDER:
        bottomBorder = new f.Node("Top_Border");

        bottomBorder.addComponent(new f.ComponentTransform());
        let meshBottomBorder: f.MeshQuad = new f.MeshQuad();
        let cmpBottomBorder: f.ComponentMesh = new f.ComponentMesh(meshBottomBorder);
        bottomBorder.addComponent(cmpBottomBorder);

        let mtrBottomBorder: f.Material = new f.Material("Blue", f.ShaderUniColor , new f.CoatColored(f.Color.CSS("BLUE")));
        let cmpBottomBorderMtr: f.ComponentMaterial = new f.ComponentMaterial(mtrBottomBorder);
        bottomBorder.addComponent(cmpBottomBorderMtr);

        cmpBottomBorder.pivot.translateY(-13);
        cmpBottomBorder.pivot.scaleX(39);

        border.appendChild(bottomBorder);


        root.addChild(border);
        // #endregion

        // #region BRICKS
        bricks = new f.Node("Bricks");

        // BRICK 1:
        brick1 = new f.Node("Brick1");

        brick1.addComponent(new f.ComponentTransform());
        let meshBrick1: f.MeshQuad = new f.MeshQuad();
        let cmpBrick1: f.ComponentMesh = new f.ComponentMesh(meshBrick1);
        brick1.addComponent(cmpBrick1);

        let mtrBrick1: f.Material = new f.Material("Red", f.ShaderUniColor , new f.CoatColored(f.Color.CSS("RED")));
        let cmpBrick1Mtr: f.ComponentMaterial = new f.ComponentMaterial(mtrBrick1);
        brick1.addComponent(cmpBrick1Mtr);

        cmpBrick1.pivot.translateX(-16);
        cmpBrick1.pivot.translateY(10);
        cmpBrick1.pivot.scaleX(6);
        cmpBrick1.pivot.scaleY(3);

        bricks.appendChild(brick1);


        root.appendChild(bricks);
        // #endregion

        // #region PADDLE
        paddle = new f.Node("Paddle");

        paddle.addComponent(new f.ComponentTransform());
        let meshPaddle: f.MeshQuad = new f.MeshQuad();
        let cmpPaddle: f.ComponentMesh = new f.ComponentMesh(meshPaddle);
        paddle.addComponent(cmpPaddle);

        let mtrPaddle: f.Material = new f.Material("Blue", f.ShaderUniColor , new f.CoatColored(f.Color.CSS("BLUE")));
        let cmpPaddleMtr: f.ComponentMaterial = new f.ComponentMaterial(mtrPaddle);
        paddle.addComponent(cmpPaddleMtr);

        cmpPaddle.pivot.translateY(-10);
        cmpPaddle.pivot.scaleX(6);

        root.appendChild(paddle);
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
        ball.mtxLocal.translate(tmpVelocity);

        // HANDLE COLLISION:

        // My try: ---------------
        //console.log("RightBorder.x = " + rightBorder.cmpTransform.local.translation.x);
        /*
        if (ball.cmpTransform.local.translation.x < leftBorder.cmpTransform.local.translation.x || ball.cmpTransform.local.translation.x > rightBorder.cmpTransform.local.translation.x) {
            
            velocity.x *= -1;
        }
        */
        // ----------------
        
        // PRIMA Repository:
        /*
        let hit: boolean = false;
        for (let node of root.getChildren()) {
            if (node.name == "Ball")
                continue;

            hit = checkCollision(ball.cmpTransform.local.translation, node);
            if (hit) {
                hndlCollision(node);
                break;
            }
        }
        */
        viewport.draw();
    }

    function checkCollision(_position: f.Vector3, _node: f.Node): boolean {


        /*
        let sclRect: f.Vector3 = _node.getComponent(f.ComponentMesh).pivot.scaling.copy;
        let posRect: f.Vector3 = _node.cmpTransform.local.translation.copy;
        let rect: f.Rectangle = new f.Rectangle(posRect.x, posRect.y, sclRect.x, sclRect.y, f.ORIGIN2D.CENTER);
        return rect.isInside(_position.toVector2());
        */
       return true;
    }

    function hndlCollision(_node: f.Node): void {


        /*
        switch (_node.name) {
            case "TopBorder":
                velocity.y *= -1;
                break;
            case "BottomBorder":
                velocity.y *= -1;
                break;
            case "RightBorder":
                velocity.x *= -1;
                break;
            case "LeftBorder":
                velocity.x *= -1;
                break;
            default:
                break;
        }

    */
    }

}