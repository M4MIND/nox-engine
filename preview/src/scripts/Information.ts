import ScriptComponent from '@nox-engine/engine/src/core/component/script/ScriptComponent';
import { Time } from '@nox-engine/engine';

export default class Information extends ScriptComponent {
    private infoBox: HTMLDivElement = document.createElement('div');

    start() {
        this.infoBox.style.position = 'fixed';
        this.infoBox.style.top = '1em';
        this.infoBox.style.right = '1em';
        document.body.appendChild(this.infoBox);
    }

    update() {
        this.infoBox.innerText = `FPS: ${(1.0 / Time.deltaTime).toFixed(1)}`
    }
}