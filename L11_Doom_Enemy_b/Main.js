"use strict";
var L11_Doom_Enemy_b;
(function (L11_Doom_Enemy_b) {
    var f = FudgeCore;
    var faid = FudgeAid;
    window.addEventListener("load", hndLoad);
    const sizeWall = 3;
    const numWalls = 20;
    let root = new f.Node("Root");
    let avatar = new f.Node("Avatar");
    let walls;
    let enemies = new f.Node("Enemies");
    let ctrSpeed = new f.Control("AvatarSpeed", 0.3, 0 /* PROPORTIONAL */);
    ctrSpeed.setDelay(100);
    let ctrStrafe = new f.Control("AvatarSpeed", 0.1, 0 /* PROPORTIONAL */);
    ctrSpeed.setDelay(100);
    let ctrRotation = new f.Control("AvatarRotation", -0.1, 0 /* PROPORTIONAL */);
    ctrRotation.setDelay(100);
    function hndLoad(_event) {
        const canvas = document.querySelector("canvas");
        let meshQuad = new f.MeshQuad("Quad");
        // #region (walls & floor)
        let txtFloor = new f.TextureImage("../DoomAssets/DEM1_5.png");
        let mtrFloor = new f.Material("Floor", f.ShaderTexture, new f.CoatTextured(null, txtFloor));
        let floor = new faid.Node("Floor", f.Matrix4x4.ROTATION_X(-90), mtrFloor, meshQuad);
        floor.mtxLocal.scale(f.Vector3.ONE(sizeWall * numWalls));
        floor.getComponent(f.ComponentMaterial).pivot.scale(f.Vector2.ONE(numWalls));
        root.appendChild(floor);
        walls = createWalls();
        // FOR FREESIGHT TEST:
        let txtWall = new f.TextureImage("../DoomAssets/CEMPOIS.png");
        let mtrWall = new f.Material("Wall", f.ShaderTexture, new f.CoatTextured(null, txtWall));
        walls.appendChild(new L11_Doom_Enemy_b.Wall(f.Vector2.ONE(3), new f.Vector3(4, sizeWall / 2, 1), f.Vector3.ZERO(), mtrWall));
        //
        root.appendChild(walls);
        // #endregion (walls & floor)
        // #region (enemies)
        let txtEnemy = new f.TextureImage("../DoomAssets/Enemy.png");
        let mtrEnemy = new f.Material("Enemy", f.ShaderTexture, new f.CoatTextured(null, txtEnemy));
        let enemy1 = new L11_Doom_Enemy_b.Enemy(f.Vector2.ONE(3), new f.Vector3(5, 1.5, 5), f.Vector3.ZERO(), mtrEnemy);
        enemies.appendChild(enemy1);
        root.appendChild(enemies);
        // #endregion (enemies)
        let cmpCamera = new f.ComponentCamera();
        cmpCamera.projectCentral(1, 45, f.FIELD_OF_VIEW.DIAGONAL, 0.2, 10000);
        cmpCamera.pivot.translate(f.Vector3.Y(1.7));
        cmpCamera.backgroundColor = f.Color.CSS("darkblue");
        avatar.addComponent(cmpCamera);
        avatar.addComponent(new f.ComponentTransform());
        avatar.mtxLocal.translate(f.Vector3.Z(10));
        avatar.mtxLocal.rotate(f.Vector3.Y(180));
        root.appendChild(avatar);
        L11_Doom_Enemy_b.viewport = new f.Viewport();
        L11_Doom_Enemy_b.viewport.initialize("Viewport", root, cmpCamera, canvas);
        L11_Doom_Enemy_b.viewport.draw();
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
        hndEnemies();
        L11_Doom_Enemy_b.viewport.draw();
    }
    function hndMouse(_event) {
        ctrRotation.setInput(_event.movementX);
    }
    function moveAvatar(_speed, _rotation, _strafe) {
        avatar.mtxLocal.rotateY(_rotation);
        let posOld = avatar.mtxLocal.translation;
        avatar.mtxLocal.translateZ(_speed);
        avatar.mtxLocal.translateX(_strafe);
        let bouncedOff = bounceOffWalls(walls.getChildren());
        if (bouncedOff.length < 2)
            return;
        bouncedOff = bounceOffWalls(bouncedOff);
        if (bouncedOff.length == 0)
            return;
        console.log("Stuck!");
        avatar.mtxLocal.translation = posOld;
    }
    function bounceOffWalls(_walls) {
        let bouncedOff = [];
        let posAvatar = avatar.mtxLocal.translation;
        for (let wall of _walls) {
            let posBounce = wall.calculateBounce(posAvatar, 1);
            if (posBounce) {
                avatar.mtxLocal.translation = posBounce;
                bouncedOff.push(wall);
            }
        }
        return bouncedOff;
    }
    function createWalls() {
        let walls = new f.Node("Walls");
        let txtWall = new f.TextureImage("../DoomAssets/CEMPOIS.png");
        let mtrWall = new f.Material("Wall", f.ShaderTexture, new f.CoatTextured(null, txtWall));
        walls.appendChild(new L11_Doom_Enemy_b.Wall(f.Vector2.ONE(3), f.Vector3.Y(sizeWall / 2), f.Vector3.ZERO(), mtrWall));
        walls.appendChild(new L11_Doom_Enemy_b.Wall(f.Vector2.ONE(3), f.Vector3.SCALE(new f.Vector3(0.5, 1, -0.866), sizeWall / 2), f.Vector3.Y(120), mtrWall));
        walls.appendChild(new L11_Doom_Enemy_b.Wall(f.Vector2.ONE(3), f.Vector3.SCALE(new f.Vector3(-0.5, 1, -0.866), sizeWall / 2), f.Vector3.Y(-120), mtrWall));
        for (let i = -numWalls / 2 + 0.5; i < numWalls / 2; i++) {
            walls.appendChild(new L11_Doom_Enemy_b.Wall(f.Vector2.ONE(3), f.Vector3.SCALE(new f.Vector3(-numWalls / 2, 0.5, i), sizeWall), f.Vector3.Y(90), mtrWall));
            walls.appendChild(new L11_Doom_Enemy_b.Wall(f.Vector2.ONE(3), f.Vector3.SCALE(new f.Vector3(numWalls / 2, 0.5, i), sizeWall), f.Vector3.Y(-90), mtrWall));
            walls.appendChild(new L11_Doom_Enemy_b.Wall(f.Vector2.ONE(3), f.Vector3.SCALE(new f.Vector3(i, 0.5, -numWalls / 2), sizeWall), f.Vector3.Y(0), mtrWall));
            walls.appendChild(new L11_Doom_Enemy_b.Wall(f.Vector2.ONE(3), f.Vector3.SCALE(new f.Vector3(i, 0.5, numWalls / 2), sizeWall), f.Vector3.Y(180), mtrWall));
        }
        return walls;
    }
    function hndEnemies() {
        for (let enemy of enemies.getChildren()) {
            enemy.faceAvatar(avatar);
            if (checkDistance(enemy, avatar) && checkFreeSight(enemy, avatar)) {
                enemy.followAvatar();
            }
        }
    }
    function checkDistance(_target, _avatar) {
        let posAvatar = new f.Vector3(_avatar.mtxWorld.translation.x, _avatar.mtxWorld.translation.y, _avatar.mtxWorld.translation.z);
        let posEnemy = new f.Vector3(_target.mtxWorld.translation.x, _target.mtxWorld.translation.y, _target.mtxWorld.translation.z);
        let vctAvatar = f.Vector3.DIFFERENCE(posAvatar, posEnemy);
        let distance = f.Vector3.DOT(vctAvatar, _target.mtxWorld.getZ());
        if (distance < 20) {
            return true;
        }
        return false;
    }
    function checkFreeSight(_target, _avatar) {
        let _walls = bounceOffWalls(walls.getChildren());
        let ray = new f.Ray(_target.mtxWorld.getZ(), _target.mtxWorld.translation);
        for (let wall of _walls) {
            let intersect = ray.intersectPlane(wall.mtxWorld.translation, wall.mtxWorld.getZ());
            if (intersect != null)
                return false;
        }
        return true;
    }
})(L11_Doom_Enemy_b || (L11_Doom_Enemy_b = {}));
//# sourceMappingURL=Main.js.map