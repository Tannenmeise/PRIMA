namespace L09_Doom_Control {
  import f = FudgeCore;
  import faid = FudgeAid;

  window.addEventListener("load", hndLoad);

  const sizeWall: number = 3;
  const numWalls: number = 20;

  export let viewport: f.Viewport;
  let root: f.Node = new f.Node("Root");
  let avatar: f.Node = new f.Node("Avatar");
  let walls: f.Node;

  let ctrSpeed: f.Control = new f.Control("AvatarSpeed", 0.5, f.CONTROL_TYPE.PROPORTIONAL);
  ctrSpeed.setDelay(100);
  let ctrRotation: f.Control = new f.Control("AvatarRotation", 3, f.CONTROL_TYPE.PROPORTIONAL);
  ctrRotation.setDelay(50);

  function hndLoad(_event: Event): void {
    const canvas: HTMLCanvasElement = document.querySelector("canvas");

    let meshQuad: f.MeshQuad = new f.MeshQuad("Quad");

    let txtFloor: f.TextureImage = new f.TextureImage("../DoomAssets/DEM1_5.png");
    let mtrFloor: f.Material = new f.Material("Floor", f.ShaderTexture, new f.CoatTextured(null, txtFloor));
    let floor: faid.Node = new faid.Node("Floor", f.Matrix4x4.ROTATION_X(-90), mtrFloor, meshQuad);
    floor.mtxLocal.scale(f.Vector3.ONE(sizeWall * numWalls));
    floor.getComponent(f.ComponentMaterial).pivot.scale(f.Vector2.ONE(numWalls));

    root.appendChild(floor);

    walls = createWalls();
    root.appendChild(walls);

    let cmpCamera: f.ComponentCamera = new f.ComponentCamera();
    cmpCamera.projectCentral(1, 45, f.FIELD_OF_VIEW.DIAGONAL, 0.2, 10000);
    cmpCamera.pivot.translate(f.Vector3.Y(1.7));
    cmpCamera.backgroundColor = f.Color.CSS("darkblue");

    avatar.addComponent(cmpCamera);
    avatar.addComponent(new f.ComponentTransform());
    avatar.mtxLocal.translate(f.Vector3.Z(10));
    avatar.mtxLocal.rotate(f.Vector3.Y(180));
    root.appendChild(avatar);

    viewport = new f.Viewport();
    viewport.initialize("Viewport", root, cmpCamera, canvas);
    viewport.draw();

    f.Loop.addEventListener(f.EVENT.LOOP_FRAME, hndLoop);
    f.Loop.start(f.LOOP_MODE.TIME_GAME, 120);
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

    moveAvatar(ctrSpeed.getOutput(), ctrRotation.getOutput());

    viewport.draw();
  }


  function moveAvatar(_translation: number, _rotation: number): void {
    avatar.mtxLocal.rotateY(_rotation);
    let posOld: f.Vector3 = avatar.mtxLocal.translation;
    avatar.mtxLocal.translateZ(_translation);

    let bouncedOff: Wall[] = bounceOffWalls(<Wall[]>walls.getChildren());
    if (bouncedOff.length < 2)
      return;

    bouncedOff = bounceOffWalls(bouncedOff);
    if (bouncedOff.length == 0)
      return;

    console.log("Stuck!");
    avatar.mtxLocal.translation = posOld;
  }

  function bounceOffWalls(_walls: Wall[]): Wall[] {
    let bouncedOff: Wall[] = [];
    let posAvatar: f.Vector3 = avatar.mtxLocal.translation;

    for (let wall of _walls) {
      let posBounce: f.Vector3 = wall.calculateBounce(posAvatar, 1);
      if (posBounce) {
        avatar.mtxLocal.translation = posBounce;
        bouncedOff.push(wall);
      }
    }
    return bouncedOff;
  }

  function createWalls(): f.Node {
    let walls: f.Node = new f.Node("Walls");

    let txtWall: f.TextureImage = new f.TextureImage("../DoomAssets/CEMPOIS.png");
    let mtrWall: f.Material = new f.Material("Wall", f.ShaderTexture, new f.CoatTextured(null, txtWall));

    walls.appendChild(new Wall(f.Vector2.ONE(3), f.Vector3.Y(sizeWall / 2), f.Vector3.ZERO(), mtrWall));
    walls.appendChild(new Wall(f.Vector2.ONE(3), f.Vector3.SCALE(new f.Vector3(0.5, 1, -0.866), sizeWall / 2), f.Vector3.Y(120), mtrWall));
    walls.appendChild(new Wall(f.Vector2.ONE(3), f.Vector3.SCALE(new f.Vector3(-0.5, 1, -0.866), sizeWall / 2), f.Vector3.Y(-120), mtrWall));

    for (let i: number = -numWalls / 2 + 0.5; i < numWalls / 2; i++) {
      walls.appendChild(new Wall(f.Vector2.ONE(3), f.Vector3.SCALE(new f.Vector3(-numWalls / 2, 0.5, i), sizeWall), f.Vector3.Y(90), mtrWall));

      // for (let i: number = -numWalls / 2 + 0.5; i < numWalls / 2; i++)
      walls.appendChild(new Wall(f.Vector2.ONE(3), f.Vector3.SCALE(new f.Vector3(numWalls / 2, 0.5, i), sizeWall), f.Vector3.Y(-90), mtrWall));

      // for (let i: number = -numWalls / 2 + 0.5; i < numWalls / 2; i++)
      walls.appendChild(new Wall(f.Vector2.ONE(3), f.Vector3.SCALE(new f.Vector3(i, 0.5, -numWalls / 2), sizeWall), f.Vector3.Y(0), mtrWall));

      // for (let i: number = -numWalls / 2 + 0.5; i < numWalls / 2; i++)
      walls.appendChild(new Wall(f.Vector2.ONE(3), f.Vector3.SCALE(new f.Vector3(i, 0.5, numWalls / 2), sizeWall), f.Vector3.Y(180), mtrWall));
    }

    return walls;
  }
}