namespace L13_Doom_UIb {
    import f = FudgeCore;
    export class Hud {
        static displayPosition(_position: f.Vector3): void {
            let divPosition: HTMLDivElement = document.querySelector("div#position");
            divPosition.innerHTML = _position.toString();
        }

        static displayAmmo(_ammo: number): void {
            document.getElementById("ammo").innerHTML = "" + _ammo;
        }

        static displayHealth(_health: number): void {
            document.getElementById("health").innerHTML = _health + "%";
        }

        static displayArms(): void {

        }

        static displayFace(): void {
        }

        static displayArmor(_armor: number): void {
            document.getElementById("armor").innerHTML = _armor + "%";
        }

        static displayAmmoTypes(): void {

        }
    }
}