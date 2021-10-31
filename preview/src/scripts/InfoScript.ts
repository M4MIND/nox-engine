import { ScriptComponent } from '@nox-engine/engine';

export default class InfoScript extends ScriptComponent {
    private dom: HTMLDivElement = document.createElement('div');
    private data: string = '';

    public start() {
        this.dom.style.position = 'fixed';
        this.dom.style.left = '1em';
        this.dom.style.top = '1em';

        document.body.appendChild(this.dom);
    }

    public clear() {
        this.dom.innerText = '';
        this.data = '';
    }

    public addInfo(text: string) {
        this.data += text;
    }

    public render() {
        this.dom.innerText = this.data;
    }

    public update(): void {
    }
}