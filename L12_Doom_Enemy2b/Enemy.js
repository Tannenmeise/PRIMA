"use strict";
var L12_Doom_Enemy2b;
(function (L12_Doom_Enemy2b) {
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
    })(ANGLE = L12_Doom_Enemy2b.ANGLE || (L12_Doom_Enemy2b.ANGLE = {}));
    class Enemy extends f.Node {
        // private static speedMax: number = 1; // units per second
        // public direction: number = 0; 
        constructor(_name = "Enemy", _position) {
            super(_name);
            this.speed = 1;
            this.addComponent(new f.ComponentTransform());
            this.mtxLocal.translation = _position;
            this.show = new faid.Node("Show", f.Matrix4x4.IDENTITY());
            this.appendChild(this.show);
            this.sprite = new faid.NodeSprite("Sprite");
            this.show.appendChild(this.sprite);
            this.sprite.setAnimation(Enemy.animations["Idle_000"]);
            // this.sprite.showFrame(0);
            this.sprite.setFrameDirection(1);
            this.sprite.framerate = 2;
            this.posTarget = _position;
            // this.appendChild(new faid.Node("Cube", f.Matrix4x4.IDENTITY(), new f.Material("Cube", f.ShaderUniColor, new f.CoatColored(f.Color.CSS("red"))), new f.MeshCube()));
        }
        // Generates Animations from "Idle_000"(0°) to "Idle_180"(180°) (total:5):
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
            let angle = this.getAngleBetweenVectors(L12_Doom_Enemy2b.avatar.mtxWorld.translation);
            if (angle < Math.PI / 8)
                this.sprite.setAnimation(Enemy.animations["Idle_000"]);
            else if (angle > Math.PI / 8 && angle < 3 * Math.PI / 8)
                this.sprite.setAnimation(Enemy.animations["Idle_045"]);
            else if (angle > 3 * Math.PI / 8 && angle < 5 * Math.PI / 8)
                this.sprite.setAnimation(Enemy.animations["Idle_090"]);
            else if (angle > 5 * Math.PI / 8 && angle < 7 * Math.PI / 8)
                this.sprite.setAnimation(Enemy.animations["Idle_135"]);
            else if (angle > 7 * Math.PI / 8)
                this.sprite.setAnimation(Enemy.animations["Idle_180"]);
            if (this.mtxLocal.translation.equals(this.posTarget, 0.1))
                this.chooseTargetPosition();
            this.move();
        }
        move() {
            this.mtxLocal.showTo(this.posTarget);
            this.mtxLocal.translateZ(this.speed * f.Loop.timeFrameGame / 1000);
            this.show.mtxLocal.showTo(f.Vector3.TRANSFORMATION(L12_Doom_Enemy2b.avatar.mtxLocal.translation, this.mtxWorldInverse, true));
        }
        chooseTargetPosition() {
            let range = 5; //sizeWall * numWalls / 2 - 2;
            this.posTarget = new f.Vector3(f.Random.default.getRange(-range, range), 0, f.Random.default.getRange(-range, range));
            console.log("New target", this.posTarget.toString());
        }
        getAngleBetweenVectors(v) {
            return Math.acos((this.mtxLocal.getZ().x * v.x + this.mtxLocal.getZ().y * v.y + this.mtxLocal.getZ().z * v.z) / (Math.sqrt((Math.pow(this.mtxLocal.getZ().x, 2) + Math.pow(this.mtxLocal.getZ().y, 2) + Math.pow(this.mtxLocal.getZ().z, 2))) * (Math.sqrt((Math.pow(v.x, 2) + Math.pow(v.y, 2) + Math.pow(v.z, 2))))));
        }
    }
    L12_Doom_Enemy2b.Enemy = Enemy;
})(L12_Doom_Enemy2b || (L12_Doom_Enemy2b = {}));
//# sourceMappingURL=Enemy.js.map