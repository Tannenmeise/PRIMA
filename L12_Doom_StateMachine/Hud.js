"use strict";
var L12_Doom_StateMachine;
(function (L12_Doom_StateMachine) {
    class Hud {
        static displayPosition(_position) {
            let divPosition = document.querySelector("div#position");
            divPosition.innerHTML = _position.toString();
        }
    }
    L12_Doom_StateMachine.Hud = Hud;
})(L12_Doom_StateMachine || (L12_Doom_StateMachine = {}));
//# sourceMappingURL=Hud.js.map