import { ScriptComponent } from '@nox-engine/engine';

export default class InfoScript extends ScriptComponent {
    private dom: HTMLDivElement = document.createElement('div');

    public start() {
        this.dom.style.position = 'fixed';
        this.dom.style.left = '1em';
        this.dom.style.top = '1em';

        document.body.appendChild(this.dom);
    }

    public clear() {
        this.dom.innerText = '';
    }

    public addInfo(text: string) {
        this.dom.innerText += text;
    }
}