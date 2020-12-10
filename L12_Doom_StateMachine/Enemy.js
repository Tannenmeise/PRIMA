"use strict";
var L12_Doom_StateMachine;
(function (L12_Doom_StateMachine) {
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
    })(ANGLE = L12_Doom_StateMachine.ANGLE || (L12_Doom_StateMachine.ANGLE = {}));
    let JOB;
    (function (JOB) {
        JOB[JOB["IDLE"] = 0] = "IDLE";
        JOB[JOB["PATROL"] = 1] = "PATROL";
    })(JOB = L12_Doom_StateMachine.JOB || (L12_Doom_StateMachine.JOB = {}));
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
            let cmpStateMachine = new L12_Doom_StateMachine.ComponentStateMachineEnemy();
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
                sprite.generateByGrid(f.Rectangle.GET(angle * 77, 0, 75, 77), 3, 32, f.ORIGIN2D.BOTTOMCENTER, f.Vector2.Y(75));
                Enemy.animations[name] = sprite;
            }
        }
        update() {
            this.getComponent(L12_Doom_StateMachine.ComponentStateMachineEnemy).act();
            this.displayAnimation();
        }
        move() {
            this.mtxLocal.showTo(this.posTarget);
            this.mtxLocal.translateZ(this.speed * f.Loop.timeFrameGame / 1000);
        }
        chooseTargetPosition() {
            let range = L12_Doom_StateMachine.sizeWall * L12_Doom_StateMachine.numWalls / 2 - 2;
            this.posTarget = new f.Vector3(f.Random.default.getRange(-range, range), 0, f.Random.default.getRange(-range, range));
            console.log("New target", this.posTarget.toString());
        }
        displayAnimation() {
            this.show.mtxLocal.showTo(f.Vector3.TRANSFORMATION(L12_Doom_StateMachine.avatar.mtxLocal.translation, this.mtxWorldInverse, true));
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
    L12_Doom_StateMachine.Enemy = Enemy;
})(L12_Doom_StateMachine || (L12_Doom_StateMachine = {}));
//# sourceMappingURL=Enemy.js.map