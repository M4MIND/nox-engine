import { ScriptComponent, Time } from '@gengine/engine';
import CameraComponent from '@gengine/engine/src/core/component/rendering/CameraComponent';

export default class CameraScript extends ScriptComponent {
    public onStart() {
        this.gameObject.transform.position.y = 20;
        this.gameObject.transform.position.z = 120;
        this.gameObject.transform.position.x = 32;
    }
    public onUpdate() {
        let camera = this.gameObject.getComponent<CameraComponent>(CameraComponent);

        if (camera) {
            camera.fieldOfView = 120;
        }
    }
}
