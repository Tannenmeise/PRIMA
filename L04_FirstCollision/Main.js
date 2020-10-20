"use strict";
var L04_FirstCollision;
(function (L04_FirstCollision) {
    var f = FudgeCore;
    let root;
    let ball;
    let velocity = new f.Vector3(f.Random.default.getRange(-1, 1), f.Random.default.getRange(-1, 1), 0);
    let speed = 6;
    velocity.normalize(speed);
    let border;
    let leftBorder;
    let rightBorder;
    let topBorder;
    let bottomBorder;
    let bricks;
    let brick1;
    let brick2;
    let brick3;
    let paddle;
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
        let mtrBall = new f.Material("Green", f.ShaderUniColor, new f.CoatColored(f.Color.CSS("LIME")));
        let cmpBallMtr = new f.ComponentMaterial(mtrBall);
        ball.addComponent(cmpBallMtr);
        cmpBall.pivot.translateZ(1);
        root.appendChild(ball);
        // #endregion
        // #region BORDERS
        border = new f.Node("Border");
        // LEFT BORDER
        leftBorder = new f.Node("Left_Border");
        leftBorder.addComponent(new f.ComponentTransform());
        let meshLeftBorder = new f.MeshQuad();
        let cmpLeftBorder = new f.ComponentMesh(meshLeftBorder);
        leftBorder.addComponent(cmpLeftBorder);
        let mtrLeftBorder = new f.Material("Blue", f.ShaderUniColor, new f.CoatColored(f.Color.CSS("BLUE")));
        let cmpLeftBorderMtr = new f.ComponentMaterial(mtrLeftBorder);
        leftBorder.addComponent(cmpLeftBorderMtr);
        cmpLeftBorder.pivot.translateX(-20);
        cmpLeftBorder.pivot.scaleY(27);
        border.appendChild(leftBorder);
        // RIGHT BORDER:
        rightBorder = new f.Node("Right_Border");
        rightBorder.addComponent(new f.ComponentTransform());
        let meshRightBorder = new f.MeshQuad();
        let cmpRightBorder = new f.ComponentMesh(meshRightBorder);
        rightBorder.addComponent(cmpRightBorder);
        let mtrRightBorder = new f.Material("Blue", f.ShaderUniColor, new f.CoatColored(f.Color.CSS("BLUE")));
        let cmpRightBorderMtr = new f.ComponentMaterial(mtrRightBorder);
        rightBorder.addComponent(cmpRightBorderMtr);
        cmpRightBorder.pivot.translateX(20);
        cmpRightBorder.pivot.scaleY(27);
        border.appendChild(rightBorder);
        // TOP BORDER:
        topBorder = new f.Node("Top_Border");
        topBorder.addComponent(new f.ComponentTransform());
        let meshTopBorder = new f.MeshQuad();
        let cmpTopBorder = new f.ComponentMesh(meshTopBorder);
        topBorder.addComponent(cmpTopBorder);
        let mtrTopBorder = new f.Material("Blue", f.ShaderUniColor, new f.CoatColored(f.Color.CSS("BLUE")));
        let cmpTopBorderMtr = new f.ComponentMaterial(mtrTopBorder);
        topBorder.addComponent(cmpTopBorderMtr);
        cmpTopBorder.pivot.translateY(13);
        cmpTopBorder.pivot.scaleX(39);
        border.appendChild(topBorder);
        // BOTTOM BORDER:
        bottomBorder = new f.Node("Top_Border");
        bottomBorder.addComponent(new f.ComponentTransform());
        let meshBottomBorder = new f.MeshQuad();
        let cmpBottomBorder = new f.ComponentMesh(meshBottomBorder);
        bottomBorder.addComponent(cmpBottomBorder);
        let mtrBottomBorder = new f.Material("Blue", f.ShaderUniColor, new f.CoatColored(f.Color.CSS("BLUE")));
        let cmpBottomBorderMtr = new f.ComponentMaterial(mtrBottomBorder);
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
        let meshBrick1 = new f.MeshQuad();
        let cmpBrick1 = new f.ComponentMesh(meshBrick1);
        brick1.addComponent(cmpBrick1);
        let mtrBrick1 = new f.Material("Red", f.ShaderUniColor, new f.CoatColored(f.Color.CSS("RED")));
        let cmpBrick1Mtr = new f.ComponentMaterial(mtrBrick1);
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
        let meshPaddle = new f.MeshQuad();
        let cmpPaddle = new f.ComponentMesh(meshPaddle);
        paddle.addComponent(cmpPaddle);
        let mtrPaddle = new f.Material("Blue", f.ShaderUniColor, new f.CoatColored(f.Color.CSS("BLUE")));
        let cmpPaddleMtr = new f.ComponentMaterial(mtrPaddle);
        paddle.addComponent(cmpPaddleMtr);
        cmpPaddle.pivot.translateY(-10);
        cmpPaddle.pivot.scaleX(6);
        root.appendChild(paddle);
        // #endregion
        let cmpCamera = new f.ComponentCamera();
        cmpCamera.pivot.translateZ(40);
        cmpCamera.pivot.rotateY(180);
        L04_FirstCollision.viewport = new f.Viewport();
        L04_FirstCollision.viewport.initialize("Viewport", root, cmpCamera, canvas);
        f.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, hndlLoop);
        f.Loop.start(f.LOOP_MODE.TIME_GAME, 30);
    }
    function hndlLoop(_event) {
        console.log("Tick");
        let frameTime = f.Time.game.getElapsedSincePreviousCall() / 1000; //in Millisekunden
        let tmpVelocity = velocity.copy;
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
        L04_FirstCollision.viewport.draw();
    }
    function checkCollision(_position, _node) {
        /*
        let sclRect: f.Vector3 = _node.getComponent(f.ComponentMesh).pivot.scaling.copy;
        let posRect: f.Vector3 = _node.cmpTransform.local.translation.copy;
        let rect: f.Rectangle = new f.Rectangle(posRect.x, posRect.y, sclRect.x, sclRect.y, f.ORIGIN2D.CENTER);
        return rect.isInside(_position.toVector2());
        */
        return true;
    }
    function hndlCollision(_node) {
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
})(L04_FirstCollision || (L04_FirstCollision = {}));
//# sourceMappingURL=Main.js.map