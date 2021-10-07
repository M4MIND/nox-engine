import { Matrix4, RendererServer } from '../../../../index';
import EventServer from '../../../server/event/EventServer';
import GameObject from '../../object/GameObject';
import { BaseComponent } from '../BaseComponent';

export default class CameraComponent extends BaseComponent {
    private static _main: CameraComponent;
    private _near: number = 0.3;
    private _far: number = 1000;
    private _fieldOfView: number = (3.14 / 180) * 90;
    private _aspect = RendererServer.canvasManager.width / RendererServer.canvasManager.height;
    private _projectionMatrix: Matrix4 = Matrix4.projection(this.fieldOfView, this.aspect, this.near, this.far);
    private matrix: Matrix4 = new Matrix4();

    public static get main(): CameraComponent {
        return this._main;
    }

    public static set main(value: CameraComponent) {
        this._main = value;
    }

    public get near(): number {
        return this._near;
    }

    public set near(value: number) {
        this._near = value;
    }

    public get far(): number {
        return this._far;
    }

    public set far(value: number) {
        this._far = value;
    }

    public get fieldOfView(): number {
        return this._fieldOfView;
    }

    public set fieldOfView(value: number) {
        this._fieldOfView = (3.14 / 180) * value;
    }

    public get aspect(): number {
        return this._aspect;
    }

    public set aspect(value: number) {
        this._aspect = value;
    }

    public get projectionMatrix(): Matrix4 {
        return this._projectionMatrix;
    }

    public set projectionMatrix(value: Matrix4) {
        this._projectionMatrix = value;
    }

    constructor(gameObject: GameObject) {
        super(gameObject);

        CameraComponent.main = this;

        EventServer.eventManager.subscribe('onCameraPreparation', this.onCameraPreparation.bind(this));
    }

    public getMatrix(): Matrix4 {
        return this.matrix;
    }

    public onCameraPreparation() {
        this.matrix = Matrix4.multiplyFromArray([
            Matrix4.projection(
                this.fieldOfView,
                RendererServer.canvasManager.width / RendererServer.canvasManager.height,
                this.near,
                this.far,
            ),
            Matrix4.inverse(
                Matrix4.multiplyFromArray([
                    Matrix4.translate(this.gameObject.transform.position),
                    this.gameObject.transform.rotation.toMatrix4(),
                ]),
            ),
        ]);
    }
}
