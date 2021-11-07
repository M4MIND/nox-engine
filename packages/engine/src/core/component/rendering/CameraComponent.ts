import { Mathf, Matrix4 } from '@nox-engine/mathf';
import { RendererServer } from '@nox-engine/renderer';
import EventManager, { CoreEvents } from '../../EventManager';
import Shader from '../../graphics/shader/Shader';
import { BasicUniforms } from '../../graphics/Unifroms';
import SceneManager from '../../scene/SceneManager';
import BaseComponent from '../BaseComponent';

export default class CameraComponent extends BaseComponent {
    public static viewMatrix: Matrix4;
    public static projectionMatrix: Matrix4;

    private _fieldOfView: number = 60;

    get fieldOfView(): number {
        return this._fieldOfView;
    }

    set fieldOfView(value: number) {
        this._fieldOfView = value;
    }

    public onCamera() {
        CameraComponent.viewMatrix = Matrix4.inverse(this.transform.getWorldMatrix());
        CameraComponent.projectionMatrix = Matrix4.projection(
            Mathf.rad2deg * this.fieldOfView,
            RendererServer.canvasManager.canvas.width / RendererServer.canvasManager.canvas.height,
        );

        Shader.getGlobalUniform(BasicUniforms.VIEW)?.set(CameraComponent.viewMatrix);

        Shader.getGlobalUniform(BasicUniforms.PROJECTION)?.set(CameraComponent.projectionMatrix);
    }

    public preparation(): void {
        SceneManager.activeScene.subscribe(CoreEvents.CAMERA, this.onCamera.bind(this), this.id);
    }
}
