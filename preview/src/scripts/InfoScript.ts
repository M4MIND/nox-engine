import { ScriptComponent } from '@nox-engine/engine';

export default class InfoScript extends ScriptComponent {
    private dom: HTMLDivElement = document.createElement('div');
    private data: string = '';

    private point: HTMLDivElement = document.createElement('div');

    public start() {
        this.dom.style.position = 'fixed';
        this.dom.style.left = '1em';
        this.dom.style.top = '1em';

        this.point.style.width = "16px";
        this.point.style.height = "16px";
        this.point.style.position = "fixed";
        this.point.style.top = "50%";
        this.point.style.left = "50%";
        this.point.style.backgroundColor = "#0099FF";
        this.point.style.marginLeft = "-8px";
        this.point.style.marginTop = "-8px";

        document.body.appendChild(this.point);

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