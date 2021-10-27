import { ScriptComponent, Time } from '@nox-engine/engine';
import { Mathf, Vector3 } from '@nox-engine/mathf';

export default class ParentScript extends ScriptComponent {
    private angle = 0;
    public update() {
        this.angle += 30 * Time.deltaTime;

        this.transform.rotation.axisAngle(new Vector3(0,1,0), Mathf.rad2deg * this.angle);
    }
}