"use strict";
var L14_Doom_Audio;
(function (L14_Doom_Audio) {
    var f = FudgeCore;
    var faid = FudgeAid;
    let ANGLE;
    (function (ANGLE) {
        ANGLE[ANGLE["_000"] = 0] = "_000";
        ANGLE[ANGLE["_045"] = 1] = "_045";
        ANGLE[ANGLE["_090"] = 2] = "_090";
        ANGLE[ANGLE["_135"] = 3] = "_135";
        ANGLE[ANGLE["_180"] = 4] = "_180";
        ANGLE[ANGLE["_225"] = 5] = "_225";
        ANGLE[ANGLE["_270"] = 6] = "_270";
        ANGLE[ANGLE["_315"] = 7] = "_315";
    })(ANGLE = L14_Doom_Audio.ANGLE || (L14_Doom_Audio.ANGLE = {}));
    let JOB;
    (function (JOB) {
        JOB[JOB["IDLE"] = 0] = "IDLE";
        JOB[JOB["PATROL"] = 1] = "PATROL";
    })(JOB = L14_Doom_Audio.JOB || (L14_Doom_Audio.JOB = {}));
    class Enemy extends f.Node {
        constructor(_name = "Enemy", _position) {
            super(_name);
            this.speed = 3;
            this.angleView = 0;
            this.addComponent(new f.ComponentTransform());
            this.mtxLocal.translation = _position;
            this.show = new faid.Node("Show", f.Matrix4x4.IDENTITY());
            this.appendChild(this.show);
            this.sprite = new faid.NodeSprite("Sprite");
            this.sprite.addComponent(new f.ComponentTransform());
            this.show.appendChild(this.sprite);
            this.sprite.setAnimation(Enemy.animations["Idle_000"]);
            this.sprite.setFrameDirection(1);
            this.sprite.framerate = 2;
            this.idleAudio = new ƒ.ComponentAudio(new ƒ.Audio("../DoomAssets/Enemy_Idle.wav"), true, true);
            this.addComponent(this.idleAudio);
            this.hurtAudio = new ƒ.ComponentAudio(new ƒ.Audio("../DoomAssets/Enemy_Hit.wav"), false, false);
            this.addComponent(this.hurtAudio);
            let cmpStateMachine = new L14_Doom_Audio.ComponentStateMachineEnemy();
            this.addComponent(cmpStateMachine);
            cmpStateMachine.stateCurrent = JOB.PATROL;
            this.chooseTargetPosition();
            // this.appendChild(new faid.Node("Cube", f.Matrix4x4.IDENTITY(), new f.Material("Cube", f.ShaderUniColor, new f.CoatColored(f.Color.CSS("red"))), new f.MeshCube()));
        }
        static generateSprites(_spritesheet) {
            Enemy.animations = {};
            for (let angle = 0; angle < 5; angle++) {
                let name = "Idle" + ANGLE[angle];
                let sprite = new faid.SpriteSheetAnimation(name, _spritesheet);
                sprite.generateByGrid(f.Rectangle.GET(44 + angle * 107, 33, 63, 66), 3, 32, f.ORIGIN2D.BOTTOMCENTER, f.Vector2.Y(100));
                Enemy.animations[name] = sprite;
            }
        }
        update() {
            this.getComponent(L14_Doom_Audio.ComponentStateMachineEnemy).act();
            this.displayAnimation();
        }
        move() {
            this.mtxLocal.showTo(this.posTarget);
            this.mtxLocal.translateZ(this.speed * f.Loop.timeFrameGame / 1000);
        }
        chooseTargetPosition() {
            let range = L14_Doom_Audio.sizeWall * L14_Doom_Audio.numWalls / 2 - 2;
            this.posTarget = new f.Vector3(f.Random.default.getRange(-range, range), 0, f.Random.default.getRange(-range, range));
            console.log("New target", this.posTarget.toString());
        }
        hurt() {
            this.hurtAudio.play(true);
        }
        displayAnimation() {
            this.show.mtxLocal.showTo(f.Vector3.TRANSFORMATION(L14_Doom_Audio.avatar.mtxLocal.translation, this.mtxWorldInverse, true));
            let rotation = this.show.mtxLocal.rotation.y;
            rotation = (rotation + 360 + 22.5) % 360;
            rotation = Math.floor(rotation / 45);
            if (this.angleView == rotation)
                return;
            this.angleView = rotation;
            if (rotation > 4) {
                rotation = 8 - rotation;
                this.flip(true);
            }
            else
                this.flip(false);
            let section = ANGLE[rotation];
            this.sprite.setAnimation(Enemy.animations["Idle" + section]);
        }
        flip(_reverse) {
            this.sprite.mtxLocal.rotation = f.Vector3.Y(_reverse ? 180 : 0);
        }
    }
    L14_Doom_Audio.Enemy = Enemy;
})(L14_Doom_Audio || (L14_Doom_Audio = {}));
//# sourceMappingURL=Enemy.js.map