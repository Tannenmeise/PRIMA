namespace L12_Doom_StateMachine {
    import f = FudgeCore;
    export class Hud {
        static displayPosition(_position: f.Vector3) {
            let divPosition: HTMLDivElement = document.querySelector("div#position");
            divPosition.innerHTML = _position.toString();
        }
    }
}