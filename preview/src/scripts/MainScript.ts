import { Cursor, GameObject, PrimitiveTypes, ScriptComponent } from '@nox-engine/engine';
import { Vector3 } from '@nox-engine/mathf';
import CameraScript from './CameraScript';
import LightScript from './LightScript';

export default class MainScript extends ScriptComponent {
    public start() {
        Cursor.enable = false;

        GameObject.createCamera().addComponent(CameraScript);
        GameObject.createGlobalLight().addComponent(LightScript);

        for (let x = -32; x < 32; x ++) {
            for (let z = -32; z < 32; z ++) {
                GameObject.createPrimitive(PrimitiveTypes.Cube).transform.position = new Vector3(x, 0, z);
            }
        }
    }
}