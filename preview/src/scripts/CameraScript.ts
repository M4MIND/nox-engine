import { ScriptComponent } from '@nox-engine/engine';
import { Mathf, Vector3 } from '@nox-engine/mathf';

export default class CameraScript extends ScriptComponent {
    public start() {
        this.gameObject.transform.position = new Vector3(0, 0, -10);
        this.gameObject.transform.rotation.axisAngle(new Vector3(0, -1, 0), Mathf.rad2deg * 180);
    }

    public update() {

    }
}