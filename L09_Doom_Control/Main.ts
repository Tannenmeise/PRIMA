namespace L09_Doom_Control {
    import f = FudgeCore;
    import faid = FudgeAid;
  
    window.addEventListener("load", hndLoad);
  
    export let viewport: f.Viewport;
    let root: f.Node = new f.Node("Root");
    let avatar: f.Node = new f.Node("Avatar");
  
    let ctrSpeed: f.Control = new f.Control("AvatarSpeed", 1, f.CONTROL_TYPE.PROPORTIONAL);
    ctrSpeed.setDelay(100);
    let ctrRotation: f.Control = new f.Control("AvatarRotation", 3, f.CONTROL_TYPE.PROPORTIONAL);
    ctrRotation.setDelay(50);
  
    function hndLoad(_event: Event): void {
      const canvas: HTMLCanvasElement = document.querySelector("canvas");
  
      let meshQuad: f.MeshQuad = new f.MeshQuad("Quad");
  
      let txtFloor: f.TextureImage = new f.TextureImage("../DoomAssets/DEM1_5.png");
      let mtrFloor: f.Material = new f.Material("Floor", f.ShaderTexture, new f.CoatTextured(null, txtFloor));
      let floor: faid.Node = new faid.Node("Floor", f.Matrix4x4.ROTATION_X(-90), mtrFloor, meshQuad);
      floor.mtxLocal.scale(f.Vector3.ONE(20));
      floor.getComponent(f.ComponentMaterial).pivot.scale(f.Vector2.ONE(10));
  
      root.appendChild(floor);
  
      let txtWall: f.TextureImage = new f.TextureImage("../DoomAssets/CEMPOIS.png");
      let mtrWall: f.Material = new f.Material("Wall", f.ShaderTexture, new f.CoatTextured(null, txtWall));
  
      let wall: Wall = new Wall(f.Vector2.ONE(3), f.Vector3.Y(1.5), f.Vector3.ZERO(), mtrWall);
      root.appendChild(wall);
  
      let cmpCamera: f.ComponentCamera = new f.ComponentCamera();
      cmpCamera.pivot.translate(f.Vector3.Y(1.7));
      cmpCamera.backgroundColor = f.Color.CSS("darkblue");
      avatar.addComponent(cmpCamera);
      avatar.addComponent(new f.ComponentTransform());
      avatar.mtxLocal.translate(f.Vector3.Z(15));
      avatar.mtxLocal.rotate(f.Vector3.Y(180));
      root.appendChild(avatar);
  
      viewport = new f.Viewport();
      viewport.initialize("Viewport", root, cmpCamera, canvas);
  
      f.Loop.addEventListener(f.EVENT.LOOP_FRAME, hndLoop);
      f.Loop.start(f.LOOP_MODE.TIME_GAME, 60);
    }
  
    function hndLoop(_event: Event): void {
      ctrSpeed.setInput(
        f.Keyboard.mapToValue(-1, 0, [f.KEYBOARD_CODE.S, f.KEYBOARD_CODE.ARROW_DOWN])
        + f.Keyboard.mapToValue(1, 0, [f.KEYBOARD_CODE.W, f.KEYBOARD_CODE.ARROW_UP])
      );
      ctrRotation.setInput(
        f.Keyboard.mapToValue(1, 0, [f.KEYBOARD_CODE.A, f.KEYBOARD_CODE.ARROW_LEFT])
        + f.Keyboard.mapToValue(-1, 0, [f.KEYBOARD_CODE.D, f.KEYBOARD_CODE.ARROW_RIGHT])
      );
  
      avatar.mtxLocal.translateZ(ctrSpeed.getOutput());
      avatar.mtxLocal.rotateY(ctrRotation.getOutput());
  
      viewport.draw();
    }
  }