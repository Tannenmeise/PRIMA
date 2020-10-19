namespace L02_DavidsRotation {

    import f = FudgeCore;
    export let viewport: f.Viewport;

    let root: f.Node;

    window.addEventListener("load", hndlLoad);
    
    function hndlLoad(_event: Event): void {
        
        const canvas: HTMLCanvasElement = document.querySelector("canvas");
        f.Debug.log(canvas);

        root = new f.Node("Root");
        root.addComponent(new f.ComponentTransform());

        // #region Quad
        let quad: f.Node = new f.Node("Quad");
        let meshQuad: f.MeshQuad = new f.MeshQuad();
        let cmpQuad: f.ComponentMesh = new f.ComponentMesh(meshQuad);
        quad.addComponent(cmpQuad);

        let solidWhite: f.Material = new f.Material("SolidWhite", f.ShaderUniColor, new f.CoatColored(f.Color.CSS("WHITE")));
        let cmpSolidWhite: f.ComponentMaterial = new f.ComponentMaterial(solidWhite);
        quad.addComponent(cmpSolidWhite);

        root.appendChild(quad);
        // #endregion

        // #region Torus
        let torus: f.Node = new f.Node("Torus");
        let meshTorus: f.MeshTorus = new f.MeshTorus("Torus", 1, 10 , 1) ;
        let cmpTorus: f.ComponentMesh = new f.ComponentMesh(meshTorus);
        cmpTorus.pivot.rotateZ(90);
        cmpTorus.pivot.rotateX(90);
        torus.addComponent(cmpTorus);

        let orange: f.Material = new f.Material("Orange", f.ShaderUniColor , new f.CoatColored(f.Color.CSS("ORANGE")));
        let cmpOrange: f.ComponentMaterial = new f.ComponentMaterial(orange);
        torus.addComponent(cmpOrange);

        root.appendChild(torus);
        // #endregion

        // #region Cube
        let cube: f.Node = new f.Node("Cube");
        let meshCube: f.MeshCube = new f.MeshCube() ;
        let cmpCube: f.ComponentMesh = new f.ComponentMesh(meshCube);
        cmpCube.pivot.scaleX(0.5);
        cmpCube.pivot.scaleY(0.5);
        cube.addComponent(cmpCube);

        let red: f.Material = new f.Material("Red", f.ShaderUniColor , new f.CoatColored(f.Color.CSS("RED")));
        let cmpRed: f.ComponentMaterial = new f.ComponentMaterial(red);
        cube.addComponent(cmpRed);

        root.appendChild(cube);
        // #endregion

        let cmpCamera: f.ComponentCamera = new f.ComponentCamera();
        cmpCamera.pivot.translateZ(4);
        cmpCamera.pivot.rotateY(180);

        viewport = new f.Viewport();
        viewport.initialize("Viewport", root, cmpCamera, canvas);
        // f.Debug.log(viewport);

        f.Loop.addEventListener(f.EVENT.LOOP_FRAME, hndlLoop);
        f.Loop.start(f.LOOP_MODE.TIME_GAME, 30);
    }

    
    function hndlLoop(_event: Event): void {
        console.log("Tick");
        // Lange Version:
        // root.getComponent(f.ComponentTransform).local.rotateZ(1);
        // Mittellange Version
        // root.cmpTransform.local.rotateZ(1);
        root.mtxLocal.rotateZ(1); // Kurze Altenative

        viewport.draw();
    }
}