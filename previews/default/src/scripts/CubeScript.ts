import { ScriptComponent, Time } from '@gengine/engine';

export default class CubeScript extends ScriptComponent {
    public onUpdate() {
        this.gameObject.transform.rotation.x += (3.14 / 180) * Time.deltaTime;
        this.gameObject.transform.rotation.y += (3.14 / 180) * Time.deltaTime;
        this.gameObject.transform.rotation.z += (3.14 / 180) * Time.deltaTime;
    }
}
