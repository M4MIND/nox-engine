import ScriptComponent from '@nox-engine/engine/src/core/component/script/ScriptComponent';

export default class MonkeyScript extends ScriptComponent {
    public update() {
        this.gameObject.transform.rotateX += 0.5;
        this.gameObject.transform.rotateY += 0.5;
        this.gameObject.transform.rotateZ += 0.5;
    }
}
