import { Vector2 } from '@nox-engine/mathf';

export default class Input {
    private static buttons: string[] = [];
    public static readonly mousePosition: Vector2 = new Vector2();

    public static startUp() {
        document.addEventListener('keydown', e => {
            if (this.buttonIsset(e.key)) {
                return;
            }

            this.buttons.push(e.key);
        })

        document.addEventListener('keyup', e => {
            delete this.buttons[this.buttons.indexOf(e.key)];
        })

        document.addEventListener('mousemove', e => {
            this.mousePosition.x = e.clientX;
            this.mousePosition.y = e.clientY;
        })
    }

    private static buttonIsset(key: string) {
        return this.buttons.indexOf(key) > -1;
    }

    public static pressUp(key: string) {
        return this.buttons.indexOf(key) > -1;
    }
}