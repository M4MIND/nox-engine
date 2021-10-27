import { ScriptComponent } from '@nox-engine/engine';

export default class LightScript extends ScriptComponent {
    public start() {
        this.gameObject.transform.position.x = 0.5;
        this.gameObject.transform.position.y = 0.5;
        this.gameObject.transform.position.z = -1;
    }
}