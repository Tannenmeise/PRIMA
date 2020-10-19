"use strict";
var L02_DavidsRotation;
(function (L02_DavidsRotation) {
    var f = FudgeCore;
    let root;
    window.addEventListener("load", hndlLoad);
    function hndlLoad(_event) {
        const canvas = document.querySelector("canvas");
        f.Debug.log(canvas);
        root = new f.Node("Root");
        root.addComponent(new f.ComponentTransform());
        // #region Quad
        let quad = new f.Node("Quad");
        let meshQuad = new f.MeshQuad();
        let cmpQuad = new f.ComponentMesh(meshQuad);
        quad.addComponent(cmpQuad);
        let solidWhite = new f.Material("SolidWhite", f.ShaderUniColor, new f.CoatColored(f.Color.CSS("WHITE")));
        let cmpSolidWhite = new f.ComponentMaterial(solidWhite);
        quad.addComponent(cmpSolidWhite);
        root.appendChild(quad);
        // #endregion
        // #region Torus
        let torus = new f.Node("Torus");
        let meshTorus = new f.MeshTorus("Torus", 1, 10, 1);
        let cmpTorus = new f.ComponentMesh(meshTorus);
        cmpTorus.pivot.rotateZ(90);
        cmpTorus.pivot.rotateX(90);
        torus.addComponent(cmpTorus);
        let orange = new f.Material("Orange", f.ShaderUniColor, new f.CoatColored(f.Color.CSS("ORANGE")));
        let cmpOrange = new f.ComponentMaterial(orange);
        torus.addComponent(cmpOrange);
        root.appendChild(torus);
        // #endregion
        // #region Cube
        let cube = new f.Node("Cube");
        let meshCube = new f.MeshCube();
        let cmpCube = new f.ComponentMesh(meshCube);
        cmpCube.pivot.scaleX(0.5);
        cmpCube.pivot.scaleY(0.5);
        cube.addComponent(cmpCube);
        let red = new f.Material("Red", f.ShaderUniColor, new f.CoatColored(f.Color.CSS("RED")));
        let cmpRed = new f.ComponentMaterial(red);
        cube.addComponent(cmpRed);
        root.appendChild(cube);
        // #endregion
        let cmpCamera = new f.ComponentCamera();
        cmpCamera.pivot.translateZ(4);
        cmpCamera.pivot.rotateY(180);
        L02_DavidsRotation.viewport = new f.Viewport();
        L02_DavidsRotation.viewport.initialize("Viewport", root, cmpCamera, canvas);
        // f.Debug.log(viewport);
        f.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, hndlLoop);
        f.Loop.start(f.LOOP_MODE.TIME_GAME, 30);
    }
    function hndlLoop(_event) {
        console.log("Tick");
        // Lange Version:
        // root.getComponent(f.ComponentTransform).local.rotateZ(1);
        // Mittellange Version
        // root.cmpTransform.local.rotateZ(1);
        root.mtxLocal.rotateZ(1); // Kurze Altenative
        L02_DavidsRotation.viewport.draw();
    }
})(L02_DavidsRotation || (L02_DavidsRotation = {}));
//# sourceMappingURL=Main.js.map