import { ScriptComponent } from '@nox-engine/engine';

export default class LightScript extends ScriptComponent {
    public start() {
        this.gameObject.transform.position.setX(0.5).setY(0.5).setZ(-1);
    }

    public update(): void {
    }
}