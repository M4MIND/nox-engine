import { Matrix4 } from '@nox-engine/mathf';
import EventManager, { CoreEvents } from '../../EventManager';
import Shader from '../../graphics/shader/Shader';
import BaseComponent from '../BaseComponent';

export default class CameraComponent extends BaseComponent {
    public start(): void {}

    public update(): void {}

    public onCamera() {
        Shader.getGlobalUniform('_U_View')?.set(
            Matrix4.inverse(Matrix4.multiplyFromArray([
                Matrix4.translate(this.transform.position),
                this.transform.rotation.toMatrix4(),
            ])),
        );
    }

    public preparation(): void {
        EventManager.subscribe(CoreEvents.CAMERA, this.onCamera.bind(this));
    }
}
