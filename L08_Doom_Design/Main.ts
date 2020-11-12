namespace L08_Doom_Design {
  import f = FudgeCore;
  import faid = FudgeAid;

  window.addEventListener("load", hndLoad);

  export let viewport: f.Viewport;
  let root: f.Node;

  function hndLoad(_event: Event): void {
    const canvas: HTMLCanvasElement = document.querySelector("canvas");
    root = new f.Node("Root");

    let meshQuad: f.MeshQuad = new f.MeshQuad("Quad");
    
    let txtFloor: f.TextureImage = new f.TextureImage("../DoomAssets/DEM1_5.png");
    let mtrFloor: f.Material = new f.Material("Floor", f.ShaderTexture, new f.CoatTextured(null, txtFloor));
    let floor: faid.Node = new faid.Node("Floor", f.Matrix4x4.ROTATION_X(-90), mtrFloor, meshQuad);
    floor.mtxLocal.scale(f.Vector3.ONE(20));
    floor.getComponent(f.ComponentMaterial).pivot.scale(f.Vector2.ONE(10));

    root.appendChild(floor);
    
    let txtWall: f.TextureImage = new f.TextureImage("../DoomAssets/CEMPOIS.png");
    let mtrWall: f.Material = new f.Material("Wall", f.ShaderTexture, new f.CoatTextured(null, txtWall));
    let wall: faid.Node = new faid.Node("Wall", f.Matrix4x4.TRANSLATION(f.Vector3.Y(1)), mtrWall, meshQuad);
    wall.mtxLocal.scale(f.Vector3.ONE(2));
    wall.getComponent(f.ComponentMaterial).pivot.scale(f.Vector2.ONE(1));
    
    root.appendChild(wall);

    let cmpCamera: f.ComponentCamera = new f.ComponentCamera();
    cmpCamera.pivot.translate(f.Vector3.ONE(7));
    cmpCamera.pivot.lookAt(f.Vector3.ZERO());
    cmpCamera.backgroundColor = f.Color.CSS("darkblue");

    viewport = new f.Viewport();
    viewport.initialize("Viewport", root, cmpCamera, canvas);
    viewport.draw();
  }
}