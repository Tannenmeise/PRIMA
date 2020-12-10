"use strict";
var L14_Doom_Audio;
(function (L14_Doom_Audio) {
    var f = FudgeCore;
    var faid = FudgeAid;
    window.addEventListener("load", hndLoad);
    const clrWhite = f.Color.CSS("white");
    L14_Doom_Audio.sizeWall = 3;
    L14_Doom_Audio.numWalls = 20;
    L14_Doom_Audio.avatar = new f.Node("Avatar");
    L14_Doom_Audio.ammo = 100;
    L14_Doom_Audio.health = 100;
    L14_Doom_Audio.armor = 100;
    let root = new f.Node("Root");
    let walls;
    let enemies;
    let gunshot;
    gunshot = new ƒ.ComponentAudio(new ƒ.Audio("../DoomAssets/Gunshot.wav"), false, false);
    gunshot.volume = 0.3;
    root.addComponent(gunshot);
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
        floor.mtxLocal.scale(f.Vector3.ONE(L14_Doom_Audio.sizeWall * L14_Doom_Audio.numWalls));
        floor.getComponent(f.ComponentMaterial).pivot.scale(f.Vector2.ONE(L14_Doom_Audio.numWalls));
        root.appendChild(floor);
        walls = createWalls();
        root.appendChild(walls);
        enemies = await createEnemies();
        root.appendChild(enemies);
        let cmpCamera = new f.ComponentCamera();
        cmpCamera.projectCentral(1, 45, f.FIELD_OF_VIEW.DIAGONAL, 0.2, 10000);
        cmpCamera.pivot.translate(f.Vector3.Y(1.7));
        cmpCamera.backgroundColor = f.Color.CSS("darkblue");
        L14_Doom_Audio.avatar.addComponent(cmpCamera);
        L14_Doom_Audio.avatar.addComponent(new f.ComponentTransform());
        L14_Doom_Audio.avatar.mtxLocal.translate(f.Vector3.Z(10));
        L14_Doom_Audio.avatar.mtxLocal.rotate(f.Vector3.Y(180));
        root.appendChild(L14_Doom_Audio.avatar);
        L14_Doom_Audio.viewport = new f.Viewport();
        L14_Doom_Audio.viewport.initialize("Viewport", root, cmpCamera, canvas);
        L14_Doom_Audio.viewport.draw();
        f.AudioManager.default.listenTo(root);
        f.AudioManager.default.listenWith(L14_Doom_Audio.avatar.getComponent(f.ComponentAudioListener));
        canvas.addEventListener("mousemove", hndMouse);
        canvas.addEventListener("click", canvas.requestPointerLock);
        canvas.addEventListener("click", shoot);
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
        L14_Doom_Audio.Hud.displayAmmo(L14_Doom_Audio.ammo);
        L14_Doom_Audio.Hud.displayHealth(L14_Doom_Audio.health);
        L14_Doom_Audio.Hud.displayArmor(L14_Doom_Audio.armor);
        f.AudioManager.default.update();
        L14_Doom_Audio.viewport.draw();
    }
    function hndMouse(_event) {
        ctrRotation.setInput(_event.movementX);
    }
    function moveAvatar(_speed, _rotation, _strafe) {
        L14_Doom_Audio.avatar.mtxLocal.rotateY(_rotation);
        let posOld = L14_Doom_Audio.avatar.mtxLocal.translation;
        L14_Doom_Audio.avatar.mtxLocal.translateZ(_speed);
        L14_Doom_Audio.avatar.mtxLocal.translateX(_strafe);
        L14_Doom_Audio.Hud.displayPosition(posOld);
        let bouncedOff = bounceOffWalls(walls.getChildren());
        if (bouncedOff.length < 2)
            return;
        bouncedOff = bounceOffWalls(bouncedOff);
        if (bouncedOff.length == 0)
            return;
        console.log("Stuck!");
        L14_Doom_Audio.avatar.mtxLocal.translation = posOld;
    }
    function bounceOffWalls(_walls) {
        let bouncedOff = [];
        let posAvatar = L14_Doom_Audio.avatar.mtxLocal.translation;
        for (let wall of _walls) {
            let posBounce = wall.calculateBounce(posAvatar, 1);
            if (posBounce) {
                L14_Doom_Audio.avatar.mtxLocal.translation = posBounce;
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
        L14_Doom_Audio.Enemy.generateSprites(coatSprite);
        for (let i = 0; i < 1; i++)
            enemies.appendChild(new L14_Doom_Audio.Enemy("Cacodemon" + i, f.Vector3.Z(3)));
        console.log("Enemies", enemies);
        return enemies;
    }
    function createWalls() {
        let walls = new f.Node("Walls");
        let txtWall = new f.TextureImage("../DoomAssets/CEMPOIS.png");
        let mtrWall = new f.Material("Wall", f.ShaderTexture, new f.CoatTextured(clrWhite, txtWall));
        walls.appendChild(new L14_Doom_Audio.Wall(f.Vector2.ONE(3), f.Vector3.Y(L14_Doom_Audio.sizeWall / 2), f.Vector3.ZERO(), mtrWall));
        walls.appendChild(new L14_Doom_Audio.Wall(f.Vector2.ONE(3), f.Vector3.SCALE(new f.Vector3(0.5, 1, -0.866), L14_Doom_Audio.sizeWall / 2), f.Vector3.Y(120), mtrWall));
        walls.appendChild(new L14_Doom_Audio.Wall(f.Vector2.ONE(3), f.Vector3.SCALE(new f.Vector3(-0.5, 1, -0.866), L14_Doom_Audio.sizeWall / 2), f.Vector3.Y(-120), mtrWall));
        for (let i = -L14_Doom_Audio.numWalls / 2 + 0.5; i < L14_Doom_Audio.numWalls / 2; i++) {
            walls.appendChild(new L14_Doom_Audio.Wall(f.Vector2.ONE(3), f.Vector3.SCALE(new f.Vector3(-L14_Doom_Audio.numWalls / 2, 0.5, i), L14_Doom_Audio.sizeWall), f.Vector3.Y(90), mtrWall));
            walls.appendChild(new L14_Doom_Audio.Wall(f.Vector2.ONE(3), f.Vector3.SCALE(new f.Vector3(L14_Doom_Audio.numWalls / 2, 0.5, i), L14_Doom_Audio.sizeWall), f.Vector3.Y(-90), mtrWall));
            walls.appendChild(new L14_Doom_Audio.Wall(f.Vector2.ONE(3), f.Vector3.SCALE(new f.Vector3(i, 0.5, -L14_Doom_Audio.numWalls / 2), L14_Doom_Audio.sizeWall), f.Vector3.Y(0), mtrWall));
            walls.appendChild(new L14_Doom_Audio.Wall(f.Vector2.ONE(3), f.Vector3.SCALE(new f.Vector3(i, 0.5, L14_Doom_Audio.numWalls / 2), L14_Doom_Audio.sizeWall), f.Vector3.Y(180), mtrWall));
        }
        return walls;
    }
    function shoot() {
        gunshot.play(true);
        L14_Doom_Audio.ammo--;
        hndlHit();
    }
    function hndlHit() {
        let ray = new f.Ray(L14_Doom_Audio.avatar.mtxWorld.getZ(), L14_Doom_Audio.avatar.mtxWorld.translation, 20);
        for (let enemy of enemies.getChildren()) {
            console.log(ray.intersectPlane(enemy.mtxWorld.translation, enemy.mtxWorld.getZ()));
            console.log(ray.intersectPlane(enemy.mtxWorld.translation, enemy.mtxWorld.getZ()));
            enemy.hurt();
        }
    }
})(L14_Doom_Audio || (L14_Doom_Audio = {}));
//# sourceMappingURL=Main.js.map