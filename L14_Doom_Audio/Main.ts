namespace L14_Doom_Audio {
    import f = FudgeCore;
    import faid = FudgeAid;
  
    window.addEventListener("load", hndLoad);
  
    const clrWhite: f.Color = f.Color.CSS("white");
    export const sizeWall: number = 3;
    export const numWalls: number = 20;
  
    export let viewport: f.Viewport;

    export let avatar: f.Node = new f.Node("Avatar");
    export let ammo: number = 100;
    export let health: number = 100;
    export let armor: number = 100;

    let root: f.Node = new f.Node("Root");
    let walls: f.Node;
    let enemies: f.Node;

    let gunshot: ƒ.ComponentAudio;
    gunshot = new ƒ.ComponentAudio(new ƒ.Audio("../DoomAssets/Gunshot.wav"), false, false);
    gunshot.volume = 0.3;
    root.addComponent(gunshot);
    let gunReload: ƒ.ComponentAudio;
    gunReload = new ƒ.ComponentAudio(new ƒ.Audio("../DoomAssets/Gun_Reload.wav"), false, false);
    root.addComponent(gunReload);
    let enemyHit: ƒ.ComponentAudio;
    enemyHit = new ƒ.ComponentAudio(new ƒ.Audio("../DoomAssets/Enemy_Hit.wav"), false, false);
    root.addComponent(enemyHit);

  
    let ctrSpeed: f.Control = new f.Control("AvatarSpeed", 0.3, f.CONTROL_TYPE.PROPORTIONAL);
    ctrSpeed.setDelay(100);
    let ctrStrafe: f.Control = new f.Control("AvatarSpeed", 0.1, f.CONTROL_TYPE.PROPORTIONAL);
    ctrSpeed.setDelay(100);
    let ctrRotation: f.Control = new f.Control("AvatarRotation", -0.1, f.CONTROL_TYPE.PROPORTIONAL);
    ctrRotation.setDelay(100);

  
    async function hndLoad(_event: Event): Promise<void> {
      const canvas: HTMLCanvasElement = document.querySelector("canvas");
  
      let meshQuad: f.MeshQuad = new f.MeshQuad("Quad");
  
      let txtFloor: f.TextureImage = new f.TextureImage("../DoomAssets/DEM1_5.png");
      let mtrFloor: f.Material = new f.Material("Floor", f.ShaderTexture, new f.CoatTextured(clrWhite, txtFloor));
      let floor: faid.Node = new faid.Node("Floor", f.Matrix4x4.ROTATION_X(-90), mtrFloor, meshQuad);
      floor.mtxLocal.scale(f.Vector3.ONE(sizeWall * numWalls));
      floor.getComponent(f.ComponentMaterial).pivot.scale(f.Vector2.ONE(numWalls));
  
      root.appendChild(floor);
  
      walls = createWalls();
      root.appendChild(walls);
  
      enemies = await createEnemies();
      root.appendChild(enemies);
  
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

      f.AudioManager.default.listenTo(root);
      f.AudioManager.default.listenWith(avatar.getComponent(f.ComponentAudioListener));
  
      canvas.addEventListener("mousemove", hndMouse);
      canvas.addEventListener("click", canvas.requestPointerLock);
      canvas.addEventListener("click", shoot);
  
      f.Loop.addEventListener(f.EVENT.LOOP_FRAME, hndLoop);
      f.Loop.start(f.LOOP_MODE.TIME_GAME, 120);
    }
  
    function hndLoop(_event: Event): void {
      ctrSpeed.setInput(
        f.Keyboard.mapToValue(-1, 0, [f.KEYBOARD_CODE.S, f.KEYBOARD_CODE.ARROW_DOWN])
        + f.Keyboard.mapToValue(1, 0, [f.KEYBOARD_CODE.W, f.KEYBOARD_CODE.ARROW_UP])
      );
      ctrStrafe.setInput(
        f.Keyboard.mapToValue(1, 0, [f.KEYBOARD_CODE.A, f.KEYBOARD_CODE.ARROW_LEFT])
        + f.Keyboard.mapToValue(-1, 0, [f.KEYBOARD_CODE.D, f.KEYBOARD_CODE.ARROW_RIGHT])
      );
  
      moveAvatar(ctrSpeed.getOutput(), ctrRotation.getOutput(), ctrStrafe.getOutput());
      ctrRotation.setInput(0);
  
      for (let enemy of enemies.getChildren() as Enemy[])
        enemy.update();
  
      Hud.displayAmmo(ammo);
      Hud.displayHealth(health);
      Hud.displayArmor(armor);
      
      f.AudioManager.default.update();
      viewport.draw();
    }
  
    function hndMouse(_event: MouseEvent): void {
      ctrRotation.setInput(_event.movementX);
    }
  
    function moveAvatar(_speed: number, _rotation: number, _strafe: number): void {
      avatar.mtxLocal.rotateY(_rotation);
      let posOld: f.Vector3 = avatar.mtxLocal.translation;
      avatar.mtxLocal.translateZ(_speed);
      avatar.mtxLocal.translateX(_strafe);

      Hud.displayPosition(posOld);
  
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
  
    async function createEnemies(): Promise<f.Node> {
      let enemies: f.Node = new f.Node("Enemies");
  
      let txtCacodemon: f.TextureImage = new f.TextureImage();
      await txtCacodemon.load("../DoomAssets/Cacodemon.png");
      let coatSprite: f.CoatTextured = new f.CoatTextured(clrWhite, txtCacodemon);
      Enemy.generateSprites(coatSprite);
      for (let i: number = 0; i < 1; i++)
        enemies.appendChild(new Enemy("Cacodemon" + i, f.Vector3.Z(3)));
  
      console.log("Enemies", enemies);
      return enemies;
    }
  
    function createWalls(): f.Node {
      let walls: f.Node = new f.Node("Walls");
  
      let txtWall: f.TextureImage = new f.TextureImage("../DoomAssets/CEMPOIS.png");
      let mtrWall: f.Material = new f.Material("Wall", f.ShaderTexture, new f.CoatTextured(clrWhite, txtWall));
  
      walls.appendChild(new Wall(f.Vector2.ONE(3), f.Vector3.Y(sizeWall / 2), f.Vector3.ZERO(), mtrWall));
      walls.appendChild(new Wall(f.Vector2.ONE(3), f.Vector3.SCALE(new f.Vector3(0.5, 1, -0.866), sizeWall / 2), f.Vector3.Y(120), mtrWall));
      walls.appendChild(new Wall(f.Vector2.ONE(3), f.Vector3.SCALE(new f.Vector3(-0.5, 1, -0.866), sizeWall / 2), f.Vector3.Y(-120), mtrWall));
  
      for (let i: number = -numWalls / 2 + 0.5; i < numWalls / 2; i++) {
        walls.appendChild(new Wall(f.Vector2.ONE(3), f.Vector3.SCALE(new f.Vector3(-numWalls / 2, 0.5, i), sizeWall), f.Vector3.Y(90), mtrWall));
        walls.appendChild(new Wall(f.Vector2.ONE(3), f.Vector3.SCALE(new f.Vector3(numWalls / 2, 0.5, i), sizeWall), f.Vector3.Y(-90), mtrWall));
        walls.appendChild(new Wall(f.Vector2.ONE(3), f.Vector3.SCALE(new f.Vector3(i, 0.5, -numWalls / 2), sizeWall), f.Vector3.Y(0), mtrWall));
        walls.appendChild(new Wall(f.Vector2.ONE(3), f.Vector3.SCALE(new f.Vector3(i, 0.5, numWalls / 2), sizeWall), f.Vector3.Y(180), mtrWall));
      }
  
      return walls;
    }

    function shoot(): void {
      gunshot.play(true);
      gunReload.play(true);
      ammo--;
      hndlHit();
    }

    function hndlHit(): void {
      let ray: f.Ray = new f.Ray(avatar.mtxWorld.getZ(), avatar.mtxWorld.translation, 20);
      for (let enemy of enemies.getChildren() as Enemy[]) {
        let intersect: f.Vector3 = ray.intersectPlane(enemy.mtxWorld.translation, enemy.mtxWorld.getZ());

        let abstand1: f.Vector3 = f.Vector3.DIFFERENCE(enemy.mtxWorld.translation, intersect);
        let abstand2: number = Math.sqrt(Math.pow(abstand1.x, 2) + Math.pow(abstand1.y, 2) + Math.pow(abstand1.z, 2));
    
        if (abstand2 < 0.5) {
          enemyHit.play(true);
          enemy.health--;
        }
      }
    }

  }