import { GameObject, PrimitiveTypes, ScriptComponent, Time } from '@nox-engine/engine';
import { Mathf, Vector3 } from '@nox-engine/mathf';

export default class ChildrenScript extends ScriptComponent {
    private angle = 0;
    public start() {
    }

    public update() {
        this.angle += 180 * Time.deltaTime;

        this.transform.rotation.axisAngle(new Vector3(1,1,1), Mathf.rad2deg * this.angle);
    }
}