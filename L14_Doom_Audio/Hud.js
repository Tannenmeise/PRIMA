"use strict";
var L14_Doom_Audio;
(function (L14_Doom_Audio) {
    class Hud {
        static displayPosition(_position) {
            let divPosition = document.querySelector("div#position");
            divPosition.innerHTML = _position.toString();
        }
        static displayAmmo(_ammo) {
            document.getElementById("ammo").innerHTML = "" + _ammo;
        }
        static displayHealth(_health) {
            document.getElementById("health").innerHTML = _health + "%";
        }
        static displayArms() {
        }
        static displayFace() {
        }
        static displayArmor(_armor) {
            document.getElementById("armor").innerHTML = _armor + "%";
        }
        static displayAmmoTypes() {
        }
    }
    L14_Doom_Audio.Hud = Hud;
})(L14_Doom_Audio || (L14_Doom_Audio = {}));
//# sourceMappingURL=Hud.js.map