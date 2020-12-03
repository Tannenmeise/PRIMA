"use strict";
var L12_Doom_UI;
(function (L12_Doom_UI) {
    var f = FudgeCore;
    var faid = FudgeAid;
    window.addEventListener("load", hndLoad);
    const clrWhite = f.Color.CSS("white");
    L12_Doom_UI.sizeWall = 3;
    L12_Doom_UI.numWalls = 20;
    L12_Doom_UI.avatar = new f.Node("Avatar");
    let root = new f.Node("Root");
    let walls;
    let enemies;
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
        floor.mtxLocal.scale(f.Vector3.ONE(L12_Doom_UI.sizeWall * L12_Doom_UI.numWalls));
        floor.getComponent(f.ComponentMaterial).pivot.scale(f.Vector2.ONE(L12_Doom_UI.numWalls));
        root.appendChild(floor);
        walls = createWalls();
        root.appendChild(walls);
        enemies = await createEnemies();
        root.appendChild(enemies);
        let cmpCamera = new f.ComponentCamera();
        cmpCamera.projectCentral(1, 45, f.FIELD_OF_VIEW.DIAGONAL, 0.2, 10000);
        cmpCamera.pivot.translate(f.Vector3.Y(1.7));
        cmpCamera.backgroundColor = f.Color.CSS("darkblue");
        L12_Doom_UI.avatar.addComponent(cmpCamera);
        L12_Doom_UI.avatar.addComponent(new f.ComponentTransform());
        L12_Doom_UI.avatar.mtxLocal.translate(f.Vector3.Z(10));
        L12_Doom_UI.avatar.mtxLocal.rotate(f.Vector3.Y(180));
        root.appendChild(L12_Doom_UI.avatar);
        L12_Doom_UI.viewport = new f.Viewport();
        L12_Doom_UI.viewport.initialize("Viewport", root, cmpCamera, canvas);
        L12_Doom_UI.viewport.draw();
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
        L12_Doom_UI.viewport.draw();
    }
    function hndMouse(_event) {
        // console.log(_event.movementX, _event.movementY);
        ctrRotation.setInput(_event.movementX);
    }
    function moveAvatar(_speed, _rotation, _strafe) {
        L12_Doom_UI.avatar.mtxLocal.rotateY(_rotation);
        let posOld = L12_Doom_UI.avatar.mtxLocal.translation;
        L12_Doom_UI.avatar.mtxLocal.translateZ(_speed);
        L12_Doom_UI.avatar.mtxLocal.translateX(_strafe);
        let bouncedOff = bounceOffWalls(walls.getChildren());
        if (bouncedOff.length < 2)
            return;
        bouncedOff = bounceOffWalls(bouncedOff);
        if (bouncedOff.length == 0)
            return;
        console.log("Stuck!");
        L12_Doom_UI.avatar.mtxLocal.translation = posOld;
    }
    function bounceOffWalls(_walls) {
        let bouncedOff = [];
        let posAvatar = L12_Doom_UI.avatar.mtxLocal.translation;
        for (let wall of _walls) {
            let posBounce = wall.calculateBounce(posAvatar, 1);
            if (posBounce) {
                L12_Doom_UI.avatar.mtxLocal.translation = posBounce;
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
        L12_Doom_UI.Enemy.generateSprites(coatSprite);
        for (let i = 0; i < 10; i++)
            enemies.appendChild(new L12_Doom_UI.Enemy("Cacodemon" + i, f.Vector3.Z(3)));
        // enemies.appendChild(new Enemy("Cacodemon1", f.Vector3.X(3)));
        // enemies.appendChild(new Enemy("Cacodemon2", f.Vector3.X(-3)));
        console.log("Enemies", enemies);
        return enemies;
    }
    function createWalls() {
        let walls = new f.Node("Walls");
        let txtWall = new f.TextureImage("../DoomAssets/CEMPOIS.png");
        let mtrWall = new f.Material("Wall", f.ShaderTexture, new f.CoatTextured(clrWhite, txtWall));
        walls.appendChild(new L12_Doom_UI.Wall(f.Vector2.ONE(3), f.Vector3.Y(L12_Doom_UI.sizeWall / 2), f.Vector3.ZERO(), mtrWall));
        walls.appendChild(new L12_Doom_UI.Wall(f.Vector2.ONE(3), f.Vector3.SCALE(new f.Vector3(0.5, 1, -0.866), L12_Doom_UI.sizeWall / 2), f.Vector3.Y(120), mtrWall));
        walls.appendChild(new L12_Doom_UI.Wall(f.Vector2.ONE(3), f.Vector3.SCALE(new f.Vector3(-0.5, 1, -0.866), L12_Doom_UI.sizeWall / 2), f.Vector3.Y(-120), mtrWall));
        for (let i = -L12_Doom_UI.numWalls / 2 + 0.5; i < L12_Doom_UI.numWalls / 2; i++) {
            walls.appendChild(new L12_Doom_UI.Wall(f.Vector2.ONE(3), f.Vector3.SCALE(new f.Vector3(-L12_Doom_UI.numWalls / 2, 0.5, i), L12_Doom_UI.sizeWall), f.Vector3.Y(90), mtrWall));
            // for (let i: number = -numWalls / 2 + 0.5; i < numWalls / 2; i++)
            walls.appendChild(new L12_Doom_UI.Wall(f.Vector2.ONE(3), f.Vector3.SCALE(new f.Vector3(L12_Doom_UI.numWalls / 2, 0.5, i), L12_Doom_UI.sizeWall), f.Vector3.Y(-90), mtrWall));
            // for (let i: number = -numWalls / 2 + 0.5; i < numWalls / 2; i++)
            walls.appendChild(new L12_Doom_UI.Wall(f.Vector2.ONE(3), f.Vector3.SCALE(new f.Vector3(i, 0.5, -L12_Doom_UI.numWalls / 2), L12_Doom_UI.sizeWall), f.Vector3.Y(0), mtrWall));
            // for (let i: number = -numWalls / 2 + 0.5; i < numWalls / 2; i++)
            walls.appendChild(new L12_Doom_UI.Wall(f.Vector2.ONE(3), f.Vector3.SCALE(new f.Vector3(i, 0.5, L12_Doom_UI.numWalls / 2), L12_Doom_UI.sizeWall), f.Vector3.Y(180), mtrWall));
        }
        return walls;
    }
})(L12_Doom_UI || (L12_Doom_UI = {}));
//# sourceMappingURL=Main.js.map