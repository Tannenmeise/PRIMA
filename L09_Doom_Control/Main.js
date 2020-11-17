"use strict";
var L09_Doom_Control;
(function (L09_Doom_Control) {
    var f = FudgeCore;
    var faid = FudgeAid;
    window.addEventListener("load", hndLoad);
    let root = new f.Node("Root");
    let avatar = new f.Node("Avatar");
    let walls = new f.Node("Walls");
    let wall1;
    let wall2;
    let wall3;
    let wall4;
    let wall5;
    let wall6;
    let wall7;
    let wall8;
    let wall9;
    let wall10;
    let wall11;
    let wall12;
    let wall13;
    let wall14;
    let wall15;
    let wall16;
    let wall17;
    let wall18;
    let wall19;
    let wall20;
    let wall21;
    let wall22;
    let ctrSpeed = new f.Control("AvatarSpeed", 1, 0 /* PROPORTIONAL */);
    ctrSpeed.setDelay(100);
    let ctrRotation = new f.Control("AvatarRotation", 3, 0 /* PROPORTIONAL */);
    ctrRotation.setDelay(50);
    function hndLoad(_event) {
        const canvas = document.querySelector("canvas");
        let meshQuad = new f.MeshQuad("Quad");
        let txtFloor = new f.TextureImage("../DoomAssets/DEM1_5.png");
        let mtrFloor = new f.Material("Floor", f.ShaderTexture, new f.CoatTextured(null, txtFloor));
        let floor = new faid.Node("Floor", f.Matrix4x4.ROTATION_X(-90), mtrFloor, meshQuad);
        floor.mtxLocal.scale(f.Vector3.ONE(20));
        floor.getComponent(f.ComponentMaterial).pivot.scale(f.Vector2.ONE(10));
        root.appendChild(floor);
        let txtWall = new f.TextureImage("../DoomAssets/CEMPOIS.png");
        let mtrWall = new f.Material("Wall", f.ShaderTexture, new f.CoatTextured(null, txtWall));
        // #region (Walls) 
        // front
        wall1 = new L09_Doom_Control.Wall(f.Vector2.ONE(3), new f.Vector3(-8.5, 1.5, -10), f.Vector3.ZERO(), mtrWall);
        wall2 = new L09_Doom_Control.Wall(f.Vector2.ONE(3), new f.Vector3(-5.5, 1.5, -10), f.Vector3.ZERO(), mtrWall);
        wall3 = new L09_Doom_Control.Wall(f.Vector2.ONE(3), new f.Vector3(-2.5, 1.5, -10), f.Vector3.ZERO(), mtrWall);
        wall4 = new L09_Doom_Control.Wall(f.Vector2.ONE(3), new f.Vector3(0.5, 1.5, -10), f.Vector3.ZERO(), mtrWall);
        wall5 = new L09_Doom_Control.Wall(f.Vector2.ONE(3), new f.Vector3(3.5, 1.5, -10), f.Vector3.ZERO(), mtrWall);
        wall6 = new L09_Doom_Control.Wall(f.Vector2.ONE(3), new f.Vector3(6.5, 1.5, -10), f.Vector3.ZERO(), mtrWall);
        // right side
        wall7 = new L09_Doom_Control.Wall(f.Vector2.ONE(3), new f.Vector3(8, 1.5, -8.5), f.Vector3.Y(-90), mtrWall);
        wall8 = new L09_Doom_Control.Wall(f.Vector2.ONE(3), new f.Vector3(8, 1.5, -5.5), f.Vector3.Y(-90), mtrWall);
        wall9 = new L09_Doom_Control.Wall(f.Vector2.ONE(3), new f.Vector3(8, 1.5, -2.5), f.Vector3.Y(-90), mtrWall);
        wall10 = new L09_Doom_Control.Wall(f.Vector2.ONE(3), new f.Vector3(8, 1.5, 0.5), f.Vector3.Y(-90), mtrWall);
        wall11 = new L09_Doom_Control.Wall(f.Vector2.ONE(3), new f.Vector3(8, 1.5, 3.5), f.Vector3.Y(-90), mtrWall);
        wall12 = new L09_Doom_Control.Wall(f.Vector2.ONE(3), new f.Vector3(8, 1.5, 6.5), f.Vector3.Y(-90), mtrWall);
        // middle
        wall13 = new L09_Doom_Control.Wall(f.Vector2.ONE(3), new f.Vector3(-4, 1.5, -8.5), f.Vector3.Y(-90), mtrWall);
        wall14 = new L09_Doom_Control.Wall(f.Vector2.ONE(3), new f.Vector3(-4, 1.5, -8.5), f.Vector3.Y(90), mtrWall);
        wall15 = new L09_Doom_Control.Wall(f.Vector2.ONE(3), new f.Vector3(-4, 1.5, -5.5), f.Vector3.Y(-90), mtrWall);
        wall16 = new L09_Doom_Control.Wall(f.Vector2.ONE(3), new f.Vector3(-4, 1.5, -5.5), f.Vector3.Y(90), mtrWall);
        wall17 = new L09_Doom_Control.Wall(f.Vector2.ONE(3), new f.Vector3(-4, 1.5, -2.5), f.Vector3.Y(-90), mtrWall);
        wall18 = new L09_Doom_Control.Wall(f.Vector2.ONE(3), new f.Vector3(-4, 1.5, -2.5), f.Vector3.Y(90), mtrWall);
        wall19 = new L09_Doom_Control.Wall(f.Vector2.ONE(3), new f.Vector3(-2.5, 1.5, -1), f.Vector3.ZERO(), mtrWall);
        wall20 = new L09_Doom_Control.Wall(f.Vector2.ONE(3), new f.Vector3(-2.5, 1.5, -1), f.Vector3.Y(180), mtrWall);
        wall21 = new L09_Doom_Control.Wall(f.Vector2.ONE(3), new f.Vector3(0.5, 1.5, -1), f.Vector3.ZERO(), mtrWall);
        wall22 = new L09_Doom_Control.Wall(f.Vector2.ONE(3), new f.Vector3(0.5, 1.5, -1), f.Vector3.Y(180), mtrWall);
        walls.appendChild(wall1);
        walls.appendChild(wall2);
        walls.appendChild(wall3);
        walls.appendChild(wall4);
        walls.appendChild(wall5);
        walls.appendChild(wall6);
        walls.appendChild(wall7);
        walls.appendChild(wall8);
        walls.appendChild(wall9);
        walls.appendChild(wall10);
        walls.appendChild(wall11);
        walls.appendChild(wall12);
        walls.appendChild(wall13);
        walls.appendChild(wall14);
        walls.appendChild(wall15);
        walls.appendChild(wall16);
        walls.appendChild(wall17);
        walls.appendChild(wall18);
        walls.appendChild(wall19);
        walls.appendChild(wall20);
        walls.appendChild(wall21);
        walls.appendChild(wall22);
        root.appendChild(walls);
        // #endregion (Walls)
        let cmpCamera = new f.ComponentCamera();
        cmpCamera.pivot.translate(f.Vector3.Y(1.7));
        cmpCamera.backgroundColor = f.Color.CSS("darkblue");
        avatar.addComponent(cmpCamera);
        avatar.addComponent(new f.ComponentTransform());
        avatar.mtxLocal.translate(f.Vector3.Z(15));
        avatar.mtxLocal.rotate(f.Vector3.Y(180));
        root.appendChild(avatar);
        L09_Doom_Control.viewport = new f.Viewport();
        L09_Doom_Control.viewport.initialize("Viewport", root, cmpCamera, canvas);
        f.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, hndLoop);
        f.Loop.start(f.LOOP_MODE.TIME_GAME, 60);
    }
    function hndLoop(_event) {
        // CONTROLS:
        ctrSpeed.setInput(f.Keyboard.mapToValue(-0.2, 0, [f.KEYBOARD_CODE.S, f.KEYBOARD_CODE.ARROW_DOWN])
            + f.Keyboard.mapToValue(0.2, 0, [f.KEYBOARD_CODE.W, f.KEYBOARD_CODE.ARROW_UP]));
        ctrRotation.setInput(f.Keyboard.mapToValue(0.7, 0, [f.KEYBOARD_CODE.A, f.KEYBOARD_CODE.ARROW_LEFT])
            + f.Keyboard.mapToValue(-0.7, 0, [f.KEYBOARD_CODE.D, f.KEYBOARD_CODE.ARROW_RIGHT]));
        avatar.mtxLocal.translateZ(ctrSpeed.getOutput());
        avatar.mtxLocal.rotateY(ctrRotation.getOutput());
        // COLLISION:
        for (let wall of walls.getChildren()) {
            if (checkCollision(wall)) {
                hndleCollision(wall);
            }
        }
        L09_Doom_Control.viewport.draw();
    }
    function checkCollision(_target) {
        // Berechnung der Länge des Objektes fehlt! => hier: nur passend für NICHT-VERTIKALE WÄNDE!
        //console.log(_target.mtxWorld.scaling);
        // Wand-Normalenvektor z-Richtung:
        if (_target.mtxLocal.getZ().z == 1 || _target.mtxLocal.getZ().z == -1) {
            if (avatar.mtxWorld.translation.x <= _target.mtxWorld.translation.x + 2 && avatar.mtxWorld.translation.x >= _target.mtxWorld.translation.x - 2) {
                return checkDistance(_target);
            }
        }
        // Wand-Normalenvektor x-Richtung:
        if (_target.mtxLocal.getZ().x == 1 || _target.mtxLocal.getZ().x == -1) {
            if (avatar.mtxWorld.translation.z <= _target.mtxWorld.translation.z + 2 && avatar.mtxWorld.translation.z >= _target.mtxWorld.translation.z - 2) {
                return checkDistance(_target);
            }
        }
        return false;
    }
    function checkDistance(_target) {
        //let oldDistance: number = (avatar.mtxWorld.translation.x - _target.mtxWorld.translation.x) * _target.mtxLocal.getZ().x + (avatar.mtxWorld.translation.y - _target.mtxWorld.translation.y) * _target.mtxLocal.getZ().y + (avatar.mtxWorld.translation.z - _target.mtxWorld.translation.z) * _target.mtxLocal.getZ().z;
        let vctAvatar = new f.Vector3(avatar.mtxWorld.translation.x - _target.mtxWorld.translation.x, avatar.mtxWorld.translation.y - _target.mtxWorld.translation.y, avatar.mtxWorld.translation.z - _target.mtxWorld.translation.z);
        let distance = f.Vector3.DOT(vctAvatar, _target.mtxWorld.getZ());
        if (distance < 1.6 && distance > 0) {
            return true;
        }
        return false;
    }
    function hndleCollision(_target) {
        let tempPos = avatar.mtxLocal.translation;
        tempPos.z += _target.mtxLocal.getZ().z * 0.1;
        tempPos.x += _target.mtxLocal.getZ().x * 0.1;
        avatar.mtxLocal.translation = tempPos;
    }
})(L09_Doom_Control || (L09_Doom_Control = {}));
//# sourceMappingURL=Main.js.map