import { Mathf, Matrix4 } from '@nox-engine/mathf';
import { RendererServer } from '@nox-engine/renderer';
import EventManager, { CoreEvents } from '../../EventManager';
import Shader from '../../graphics/shader/Shader';
import { BasicUniforms } from '../../graphics/Unifroms';
import BaseComponent from '../BaseComponent';

export default class CameraComponent extends BaseComponent {
    private _fieldOfView: number = 60;

    get fieldOfView(): number {
        return this._fieldOfView;
    }

    set fieldOfView(value: number) {
        this._fieldOfView = value;
    }

    public start(): void {}

    public update(): void {}

    public onCamera() {
        Shader.getGlobalUniform(BasicUniforms.VIEW)?.set(
            Matrix4.inverse(Matrix4.multiplyFromArray([
                Matrix4.translate(this.transform.position),
                this.transform.rotation.toMatrix4(),
            ])),
        );

        Shader.getGlobalUniform(BasicUniforms.PROJECTION)?.set(Matrix4.projection(
            Mathf.rad2deg * this.fieldOfView,
            RendererServer.canvasManager.canvas.width / RendererServer.canvasManager.canvas.height,
        ));
    }

    public preparation(): void {
        EventManager.subscribe(CoreEvents.CAMERA, this.onCamera.bind(this));
    }
}
