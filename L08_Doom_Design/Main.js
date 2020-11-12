"use strict";
var L08_Doom_Design;
(function (L08_Doom_Design) {
    var f = FudgeCore;
    var faid = FudgeAid;
    window.addEventListener("load", hndLoad);
    let root;
    function hndLoad(_event) {
        const canvas = document.querySelector("canvas");
        root = new f.Node("Root");
        let meshQuad = new f.MeshQuad("Quad");
        let txtFloor = new f.TextureImage("../DoomAssets/DEM1_5.png");
        let mtrFloor = new f.Material("Floor", f.ShaderTexture, new f.CoatTextured(null, txtFloor));
        let floor = new faid.Node("Floor", f.Matrix4x4.ROTATION_X(-90), mtrFloor, meshQuad);
        floor.mtxLocal.scale(f.Vector3.ONE(20));
        floor.getComponent(f.ComponentMaterial).pivot.scale(f.Vector2.ONE(10));
        root.appendChild(floor);
        let txtWall = new f.TextureImage("../DoomAssets/CEMPOIS.png");
        let mtrWall = new f.Material("Wall", f.ShaderTexture, new f.CoatTextured(null, txtWall));
        let wall = new faid.Node("Wall", f.Matrix4x4.TRANSLATION(f.Vector3.Y(1)), mtrWall, meshQuad);
        wall.mtxLocal.scale(f.Vector3.ONE(2));
        wall.getComponent(f.ComponentMaterial).pivot.scale(f.Vector2.ONE(1));
        root.appendChild(wall);
        let cmpCamera = new f.ComponentCamera();
        cmpCamera.pivot.translate(f.Vector3.ONE(7));
        cmpCamera.pivot.lookAt(f.Vector3.ZERO());
        cmpCamera.backgroundColor = f.Color.CSS("darkblue");
        L08_Doom_Design.viewport = new f.Viewport();
        L08_Doom_Design.viewport.initialize("Viewport", root, cmpCamera, canvas);
        L08_Doom_Design.viewport.draw();
    }
})(L08_Doom_Design || (L08_Doom_Design = {}));
//# sourceMappingURL=Main.js.map