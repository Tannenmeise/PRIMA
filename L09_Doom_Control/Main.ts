namespace L09_Doom_Control {
    import f = FudgeCore;
    import faid = FudgeAid;
  
    window.addEventListener("load", hndLoad);
  
    export let viewport: f.Viewport;
    let root: f.Node = new f.Node("Root");
    let avatar: f.Node = new f.Node("Avatar");

    let wall: Wall;
  
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
  
      // #region (Walls) 
      wall = new Wall(f.Vector2.ONE(3), f.Vector3.Y(1.5), f.Vector3.ZERO(), mtrWall);
      root.appendChild(wall);
      // #endregion (Walls)
  
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
        f.Keyboard.mapToValue(-0.2, 0, [f.KEYBOARD_CODE.S, f.KEYBOARD_CODE.ARROW_DOWN])
        + f.Keyboard.mapToValue(0.2, 0, [f.KEYBOARD_CODE.W, f.KEYBOARD_CODE.ARROW_UP])
      );
      ctrRotation.setInput(
        f.Keyboard.mapToValue(0.7, 0, [f.KEYBOARD_CODE.A, f.KEYBOARD_CODE.ARROW_LEFT])
        + f.Keyboard.mapToValue(-0.7, 0, [f.KEYBOARD_CODE.D, f.KEYBOARD_CODE.ARROW_RIGHT])
      );
  
      avatar.mtxLocal.translateZ(ctrSpeed.getOutput());
      avatar.mtxLocal.rotateY(ctrRotation.getOutput());

     
      console.log(wall.mtxLocal.getZ());
      // Check Collision:

      if (checkCollision(wall)) {
        console.log("Collision = true");
        let tempPos: f.Vector3 = avatar.mtxLocal.translation;
        tempPos.x += wall.mtxLocal.getZ().x * 0.1;
        tempPos.z += wall.mtxLocal.getZ().z * 0.1;
        
        avatar.mtxLocal.translation = tempPos;
      }
        /*
      for (let a_wall of wall.getChildren() as faid.Node[]) {

        if (checkCollision(a_wall)) {
            let tempPos: f.Vector3 = avatar.mtxLocal.translation;
            tempPos.x += wall.mtxLocal.getZ().x * 0.001;
            tempPos.z += wall.mtxLocal.getZ().z * 0.001;
            avatar.mtxLocal.translation = tempPos;
        }
      }
      */

  
      viewport.draw();
    }

    function checkCollision(_target: f.Node): boolean {

      let distance: number = (avatar.mtxWorld.translation.x - _target.mtxWorld.translation.x) * _target.mtxLocal.getZ().x + (avatar.mtxWorld.translation.y - _target.mtxWorld.translation.y) * _target.mtxLocal.getZ().y + (avatar.mtxWorld.translation.z - _target.mtxWorld.translation.z) * _target.mtxLocal.getZ().z;
      if (distance < 1.6) {
        return true;
      }
  
      return false;
    }

  }