import Cursor from "./Cursor";

export default class Input {
    private static buttons: string[] = [];

    public static startUp() {
        document.addEventListener('keydown', e => {
            if (this.buttonIsset(e.key.toUpperCase())) {
                return;
            }

            this.buttons.push(e.key.toUpperCase());
        })

        document.addEventListener('keyup', e => {
            delete this.buttons[this.buttons.indexOf(e.key.toUpperCase())];
        })
    }

    private static buttonIsset(key: string) {
        return this.buttons.indexOf(key.toUpperCase()) > -1;
    }

    public static pressUp(key: string) {
        return this.buttons.indexOf(key.toUpperCase()) > -1;
    }

    public static getAxisX(): number {
        return Cursor.position.x;
    }

    public static getAxisY(): number {
        return Cursor.position.y;
    }

    public static pressUpHorizontal(): number {
        return Input.pressUp('a') && Input.pressUp('d') ? 0 : Input.pressUp('a') ? -1 : Input.pressUp('d') ? 1 : 0;
    }

    public static pressUpVertical(): number {
        return Input.pressUp('w') && Input.pressUp('s') ? 0 : Input.pressUp('s') ? -1 : Input.pressUp('w') ? 1 : 0
    }
}