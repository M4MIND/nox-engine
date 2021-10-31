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
}