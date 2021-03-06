"use strict";
var L11_Doom_Enemy;
(function (L11_Doom_Enemy) {
    var f = FudgeCore;
    var faid = FudgeAid;
    let ANGLE;
    (function (ANGLE) {
        // N = 0, NE = 1, E = 2, SE = 3, S = 4, SW = 5, W = 6, NW = 7,
        ANGLE[ANGLE["_000"] = 0] = "_000";
        ANGLE[ANGLE["_045"] = 1] = "_045";
        ANGLE[ANGLE["_090"] = 2] = "_090";
        ANGLE[ANGLE["_135"] = 3] = "_135";
        ANGLE[ANGLE["_180"] = 4] = "_180";
        ANGLE[ANGLE["_225"] = 5] = "_225";
        ANGLE[ANGLE["_270"] = 6] = "_270";
        ANGLE[ANGLE["_315"] = 7] = "_315";
    })(ANGLE = L11_Doom_Enemy.ANGLE || (L11_Doom_Enemy.ANGLE = {}));
    let JOB;
    (function (JOB) {
        JOB[JOB["IDLE"] = 0] = "IDLE";
        JOB[JOB["PATROL"] = 1] = "PATROL";
        JOB[JOB["ATTACK"] = 2] = "ATTACK";
    })(JOB = L11_Doom_Enemy.JOB || (L11_Doom_Enemy.JOB = {}));
    class Enemy extends f.Node {
        // private static speedMax: number = 1; // units per second
        // public direction: number = 0; 
        constructor(_name = "Enemy", _position) {
            super(_name);
            this.speed = 3;
            this.angleView = 0;
            this.job = JOB.PATROL;
            this.breakTime = 0;
            this.addComponent(new f.ComponentTransform());
            this.mtxLocal.translation = _position;
            this.show = new faid.Node("Show", f.Matrix4x4.IDENTITY());
            this.appendChild(this.show);
            this.sprite = new faid.NodeSprite("Sprite");
            this.sprite.addComponent(new f.ComponentTransform());
            this.show.appendChild(this.sprite);
            this.sprite.setAnimation(Enemy.animations["Idle_000"]);
            // this.sprite.showFrame(0);
            this.sprite.setFrameDirection(1);
            this.sprite.framerate = 2;
            // this.posTarget = _position;
            this.chooseTargetPosition();
            // this.appendChild(new faid.Node("Cube", f.Matrix4x4.IDENTITY(), new f.Material("Cube", f.ShaderUniColor, new f.CoatColored(f.Color.CSS("red"))), new f.MeshCube()));
        }
        static generateSprites(_spritesheet) {
            Enemy.animations = {};
            for (let angle = 0; angle < 5; angle++) {
                let name = "Idle" + ANGLE[angle];
                let sprite = new faid.SpriteSheetAnimation(name, _spritesheet);
                sprite.generateByGrid(f.Rectangle.GET(angle * 77, 0, 75, 77), 3, 32, f.ORIGIN2D.BOTTOMCENTER, f.Vector2.Y(75));
                Enemy.animations[name] = sprite;
            }
        }
        update() {
            switch (this.job) {
                case JOB.PATROL:
                    if (this.distance() < 10) { // sees Avatar
                        this.job = JOB.ATTACK;
                    }
                    else if (this.mtxLocal.translation.equals(this.posTarget, 0.1)) // reached Target
                        this.job = JOB.IDLE;
                    this.move();
                    break;
                case JOB.IDLE:
                    if (this.distance() < 10) { // sees Avatar
                        this.job = JOB.ATTACK;
                        this.breakTime = 0;
                    }
                    else if (this.breakTime > Math.random() * 3000) { // breakTime over
                        this.job = JOB.PATROL;
                        this.chooseTargetPosition();
                        this.breakTime = 0;
                    }
                    this.breakTime++;
                    break;
                case JOB.ATTACK:
                    if (this.distance() > 15) { // lost Avatar
                        this.job = JOB.IDLE;
                    }
                    this.posTarget = L11_Doom_Enemy.avatar.mtxLocal.translation;
                    this.move();
                    break;
                default:
                    break;
            }
            // PROBLEM!!!: ENEMIES FACE AVATAR WHEN HITTING "IDLE"-STATE
            this.displayAnimation();
        }
        move() {
            this.mtxLocal.showTo(this.posTarget);
            this.mtxLocal.translateZ(this.speed * f.Loop.timeFrameGame / 1000);
        }
        displayAnimation() {
            this.show.mtxLocal.showTo(f.Vector3.TRANSFORMATION(L11_Doom_Enemy.avatar.mtxLocal.translation, this.mtxWorldInverse, true));
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
            let section = ANGLE[rotation]; // .padStart(3, "0");
            // console.log(section);
            this.sprite.setAnimation(Enemy.animations["Idle" + section]);
        }
        chooseTargetPosition() {
            let range = L11_Doom_Enemy.sizeWall * L11_Doom_Enemy.numWalls / 2 - 2;
            this.posTarget = new f.Vector3(f.Random.default.getRange(-range, range), 0, f.Random.default.getRange(-range, range));
            // console.log("New target", this.posTarget.toString());
        }
        flip(_reverse) {
            this.sprite.mtxLocal.rotation = f.Vector3.Y(_reverse ? 180 : 0);
        }
        distance() {
            let vctAvatar = f.Vector3.DIFFERENCE(L11_Doom_Enemy.avatar.mtxWorld.translation, this.mtxLocal.translation);
            let distance = f.Vector3.DOT(vctAvatar, this.mtxWorld.getZ());
            return distance;
        }
    }
    L11_Doom_Enemy.Enemy = Enemy;
})(L11_Doom_Enemy || (L11_Doom_Enemy = {}));
//# sourceMappingURL=Enemy.js.map