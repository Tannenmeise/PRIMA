"use strict";
var L09_Doom_Control;
(function (L09_Doom_Control) {
    var f = FudgeCore;
    var faid = FudgeAid;
    window.addEventListener("load", hndLoad);
    let root = new f.Node("Root");
    let avatar = new f.Node("Avatar");
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
        let wall = new L09_Doom_Control.Wall(f.Vector2.ONE(3), f.Vector3.Y(1.5), f.Vector3.ZERO(), mtrWall);
        root.appendChild(wall);
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
        ctrSpeed.setInput(f.Keyboard.mapToValue(-1, 0, [f.KEYBOARD_CODE.S, f.KEYBOARD_CODE.ARROW_DOWN])
            + f.Keyboard.mapToValue(1, 0, [f.KEYBOARD_CODE.W, f.KEYBOARD_CODE.ARROW_UP]));
        ctrRotation.setInput(f.Keyboard.mapToValue(1, 0, [f.KEYBOARD_CODE.A, f.KEYBOARD_CODE.ARROW_LEFT])
            + f.Keyboard.mapToValue(-1, 0, [f.KEYBOARD_CODE.D, f.KEYBOARD_CODE.ARROW_RIGHT]));
        avatar.mtxLocal.translateZ(ctrSpeed.getOutput());
        avatar.mtxLocal.rotateY(ctrRotation.getOutput());
        L09_Doom_Control.viewport.draw();
    }
})(L09_Doom_Control || (L09_Doom_Control = {}));
//# sourceMappingURL=Main.js.map