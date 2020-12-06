"use strict";
var L13_Doom_UIb;
(function (L13_Doom_UIb) {
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
    L13_Doom_UIb.Hud = Hud;
})(L13_Doom_UIb || (L13_Doom_UIb = {}));
//# sourceMappingURL=Hud.js.map