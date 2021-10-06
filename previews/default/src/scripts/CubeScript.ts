import { ScriptComponent, TimeServer } from '@gengine/engine';

export default class CubeScript extends ScriptComponent {
    public onUpdate() {
        this.gameObject.transform.x += 36 * TimeServer.deltaTime;
        this.gameObject.transform.y += 36 * TimeServer.deltaTime;
        this.gameObject.transform.z += 36 * TimeServer.deltaTime;
    }
}
