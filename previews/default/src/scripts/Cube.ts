import { ScriptComponent } from '@gengine/engine';
import TimeServer from '@gengine/engine/src/server/time/TimeServer';

export default class Cube extends ScriptComponent {
    public onUpdate() {
        this.gameObject.transform.scale.y =
            Math.sin(this.gameObject.transform.position.x / 3 + TimeServer.elapsedTime) +
            Math.cos(this.gameObject.transform.position.z / 3 + TimeServer.elapsedTime) +
            8;
    }
}
