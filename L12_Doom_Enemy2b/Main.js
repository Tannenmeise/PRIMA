"use strict";
var L12_Doom_Enemy2b;
(function (L12_Doom_Enemy2b) {
    var f = FudgeCore;
    var faid = FudgeAid;
    window.addEventListener("load", hndLoad);
    const clrWhite = f.Color.CSS("white");
    L12_Doom_Enemy2b.sizeWall = 3;
    L12_Doom_Enemy2b.numWalls = 20;
    L12_Doom_Enemy2b.avatar = new f.Node("Avatar");
    let root = new f.Node("Root");
    let walls;
    let enemies;
    let test;
    let ctrSpeed = new f.Control("AvatarSpeed", 0.3, 0 /* PROPORTIONAL */);
    ctrSpeed.setDelay(100);
    let ctrStrafe = new f.Control("AvatarSpeed", 0.1, 0 /* PROPORTIONAL */);
    ctrSpeed.setDelay(100);
    let ctrRotation = new f.Control("AvatarRotation", -0.1, 0 /* PROPORTIONAL */);
    ctrRotation.setDelay(100);
    async function hndLoad(_event) {
        const canvas = document.querySelector("canvas");
        let meshQuad = new f.MeshQuad("Quad");
        let txtFloor = new f.TextureImage("../DoomAssets/DEM1_5.png");
        let mtrFloor = new f.Material("Floor", f.ShaderTexture, new f.CoatTextured(clrWhite, txtFloor));
        let floor = new faid.Node("Floor", f.Matrix4x4.ROTATION_X(-90), mtrFloor, meshQuad);
        floor.mtxLocal.scale(f.Vector3.ONE(L12_Doom_Enemy2b.sizeWall * L12_Doom_Enemy2b.numWalls));
        floor.getComponent(f.ComponentMaterial).pivot.scale(f.Vector2.ONE(L12_Doom_Enemy2b.numWalls));
        root.appendChild(floor);
        walls = createWalls();
        root.appendChild(walls);
        enemies = await createEnemies();
        root.appendChild(enemies);
        // #region (Testobject)
        let meshTest = new f.MeshQuad("Test");
        let mtrTest = new ƒ.Material("SolidWhite", ƒ.ShaderUniColor, new ƒ.CoatColored(ƒ.Color.CSS("WHITE")));
        test = new faid.Node("Test", f.Matrix4x4.TRANSLATION(new f.Vector3(1, 1, 1)), mtrTest, meshTest);
        root.appendChild(test);
        // #endregion (Testobject)
        let cmpCamera = new f.ComponentCamera();
        cmpCamera.projectCentral(1, 45, f.FIELD_OF_VIEW.DIAGONAL, 0.2, 10000);
        cmpCamera.pivot.translate(f.Vector3.Y(1.7));
        cmpCamera.backgroundColor = f.Color.CSS("darkblue");
        L12_Doom_Enemy2b.avatar.addComponent(cmpCamera);
        L12_Doom_Enemy2b.avatar.addComponent(new f.ComponentTransform());
        L12_Doom_Enemy2b.avatar.mtxLocal.translate(f.Vector3.Z(10));
        L12_Doom_Enemy2b.avatar.mtxLocal.rotate(f.Vector3.Y(180));
        root.appendChild(L12_Doom_Enemy2b.avatar);
        L12_Doom_Enemy2b.viewport = new f.Viewport();
        L12_Doom_Enemy2b.viewport.initialize("Viewport", root, cmpCamera, canvas);
        L12_Doom_Enemy2b.viewport.draw();
        canvas.addEventListener("mousemove", hndMouse);
        canvas.addEventListener("click", canvas.requestPointerLock);
        f.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, hndLoop);
        f.Loop.start(f.LOOP_MODE.TIME_GAME, 120);
    }
    function hndLoop(_event) {
        ctrSpeed.setInput(f.Keyboard.mapToValue(-1, 0, [f.KEYBOARD_CODE.S, f.KEYBOARD_CODE.ARROW_DOWN])
            + f.Keyboard.mapToValue(1, 0, [f.KEYBOARD_CODE.W, f.KEYBOARD_CODE.ARROW_UP]));
        ctrStrafe.setInput(f.Keyboard.mapToValue(1, 0, [f.KEYBOARD_CODE.A, f.KEYBOARD_CODE.ARROW_LEFT])
            + f.Keyboard.mapToValue(-1, 0, [f.KEYBOARD_CODE.D, f.KEYBOARD_CODE.ARROW_RIGHT]));
        moveAvatar(ctrSpeed.getOutput(), ctrRotation.getOutput(), ctrStrafe.getOutput());
        ctrRotation.setInput(0);
        for (let enemy of enemies.getChildren())
            enemy.update();
        console.log(getAngleBetweenVectors(test.mtxLocal.getZ(), L12_Doom_Enemy2b.avatar.mtxWorld.translation));
        L12_Doom_Enemy2b.viewport.draw();
    }
    function hndMouse(_event) {
        // console.log(_event.movementX, _event.movementY);
        ctrRotation.setInput(_event.movementX);
    }
    function moveAvatar(_speed, _rotation, _strafe) {
        L12_Doom_Enemy2b.avatar.mtxLocal.rotateY(_rotation);
        let posOld = L12_Doom_Enemy2b.avatar.mtxLocal.translation;
        L12_Doom_Enemy2b.avatar.mtxLocal.translateZ(_speed);
        L12_Doom_Enemy2b.avatar.mtxLocal.translateX(_strafe);
        let bouncedOff = bounceOffWalls(walls.getChildren());
        if (bouncedOff.length < 2)
            return;
        bouncedOff = bounceOffWalls(bouncedOff);
        if (bouncedOff.length == 0)
            return;
        console.log("Stuck!");
        L12_Doom_Enemy2b.avatar.mtxLocal.translation = posOld;
    }
    function bounceOffWalls(_walls) {
        let bouncedOff = [];
        let posAvatar = L12_Doom_Enemy2b.avatar.mtxLocal.translation;
        for (let wall of _walls) {
            let posBounce = wall.calculateBounce(posAvatar, 1);
            if (posBounce) {
                L12_Doom_Enemy2b.avatar.mtxLocal.translation = posBounce;
                bouncedOff.push(wall);
            }
        }
        return bouncedOff;
    }
    async function createEnemies() {
        let enemies = new f.Node("Enemies");
        let txtCacodemon = new f.TextureImage();
        await txtCacodemon.load("../DoomAssets/Cacodemon.png");
        let coatSprite = new f.CoatTextured(clrWhite, txtCacodemon);
        L12_Doom_Enemy2b.Enemy.generateSprites(coatSprite);
        enemies.appendChild(new L12_Doom_Enemy2b.Enemy("Cacodemon0", f.Vector3.Z(3)));
        enemies.appendChild(new L12_Doom_Enemy2b.Enemy("Cacodemon1", f.Vector3.X(3)));
        enemies.appendChild(new L12_Doom_Enemy2b.Enemy("Cacodemon2", f.Vector3.X(-3)));
        console.log("Enemies", enemies);
        return enemies;
    }
    function createWalls() {
        let walls = new f.Node("Walls");
        let txtWall = new f.TextureImage("../DoomAssets/CEMPOIS.png");
        let mtrWall = new f.Material("Wall", f.ShaderTexture, new f.CoatTextured(clrWhite, txtWall));
        walls.appendChild(new L12_Doom_Enemy2b.Wall(f.Vector2.ONE(3), f.Vector3.Y(L12_Doom_Enemy2b.sizeWall / 2), f.Vector3.ZERO(), mtrWall));
        walls.appendChild(new L12_Doom_Enemy2b.Wall(f.Vector2.ONE(3), f.Vector3.SCALE(new f.Vector3(0.5, 1, -0.866), L12_Doom_Enemy2b.sizeWall / 2), f.Vector3.Y(120), mtrWall));
        walls.appendChild(new L12_Doom_Enemy2b.Wall(f.Vector2.ONE(3), f.Vector3.SCALE(new f.Vector3(-0.5, 1, -0.866), L12_Doom_Enemy2b.sizeWall / 2), f.Vector3.Y(-120), mtrWall));
        for (let i = -L12_Doom_Enemy2b.numWalls / 2 + 0.5; i < L12_Doom_Enemy2b.numWalls / 2; i++) {
            walls.appendChild(new L12_Doom_Enemy2b.Wall(f.Vector2.ONE(3), f.Vector3.SCALE(new f.Vector3(-L12_Doom_Enemy2b.numWalls / 2, 0.5, i), L12_Doom_Enemy2b.sizeWall), f.Vector3.Y(90), mtrWall));
            // for (let i: number = -numWalls / 2 + 0.5; i < numWalls / 2; i++)
            walls.appendChild(new L12_Doom_Enemy2b.Wall(f.Vector2.ONE(3), f.Vector3.SCALE(new f.Vector3(L12_Doom_Enemy2b.numWalls / 2, 0.5, i), L12_Doom_Enemy2b.sizeWall), f.Vector3.Y(-90), mtrWall));
            // for (let i: number = -numWalls / 2 + 0.5; i < numWalls / 2; i++)
            walls.appendChild(new L12_Doom_Enemy2b.Wall(f.Vector2.ONE(3), f.Vector3.SCALE(new f.Vector3(i, 0.5, -L12_Doom_Enemy2b.numWalls / 2), L12_Doom_Enemy2b.sizeWall), f.Vector3.Y(0), mtrWall));
            // for (let i: number = -numWalls / 2 + 0.5; i < numWalls / 2; i++)
            walls.appendChild(new L12_Doom_Enemy2b.Wall(f.Vector2.ONE(3), f.Vector3.SCALE(new f.Vector3(i, 0.5, L12_Doom_Enemy2b.numWalls / 2), L12_Doom_Enemy2b.sizeWall), f.Vector3.Y(180), mtrWall));
        }
        return walls;
    }
    function getAngleBetweenVectors(u, v) {
        return Math.acos((u.x * v.x + u.y * v.y + u.z * v.z) / (Math.sqrt((Math.pow(u.x, 2) + Math.pow(u.y, 2) + Math.pow(u.z, 2))) * (Math.sqrt((Math.pow(v.x, 2) + Math.pow(v.y, 2) + Math.pow(v.z, 2))))));
    }
})(L12_Doom_Enemy2b || (L12_Doom_Enemy2b = {}));
//# sourceMappingURL=Main.js.map