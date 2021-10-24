import { Color, MeshRendererComponent, Time } from '@nox-engine/engine';
import ScriptComponent from '@nox-engine/engine/src/core/component/script/ScriptComponent';

export default class MonkeyScript extends ScriptComponent {
    public update() {
        this.gameObject.transform.rotateX += Time.deltaTime * 10;
        this.gameObject.transform.rotateY += Time.deltaTime * 60;
        this.gameObject.transform.rotateZ += Time.deltaTime * 20;
    }
}
