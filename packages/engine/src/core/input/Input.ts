export default class Input {
    private static buttons: string[] = [];

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
    }

    private static buttonIsset(key: string) {
        return this.buttons.indexOf(key) > -1;
    }

    public static pressUp(key: string) {
        return this.buttons.indexOf(key) > -1;
    }
}