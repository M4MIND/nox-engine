import { Matrix4, Quaternion, Vector3 } from '@nox-engine/mathf';
import EventManager, { CoreEvents } from '../../EventManager';
import BaseComponent from '../BaseComponent';

export default class TransformComponent extends BaseComponent {
    public position = new Vector3();
    public scale = new Vector3(1, 1, 1);
    public rotation = new Quaternion();

    private modelMatrix: Matrix4 = new Matrix4();
    private positionMatrix: Matrix4 = new Matrix4();
    private rotationMatrix: Matrix4 = new Matrix4();
    private scaleMatrix: Matrix4 = new Matrix4();

    public getPositionMatrix(): Matrix4 {
        return this.positionMatrix;
    }

    public getRotationMatrix(): Matrix4 {
        return this.rotationMatrix;
    }

    public getModelMatrix(): Matrix4 {
        return this.modelMatrix;
    }

    public getScaleMatrix(): Matrix4 {
        return this.scaleMatrix;
    }

    public onPreRender() {
        this.positionMatrix = Matrix4.translate(this.position);
        this.rotationMatrix = this.rotation.toMatrix4();
        this.scaleMatrix = Matrix4.scale(this.scale);

        this.modelMatrix = Matrix4.multiplyFromArray([
            this.gameObject.parent ? this.gameObject.parent.transform.getModelMatrix() : new Matrix4(),
            this.positionMatrix,
            this.rotationMatrix,
            this.scaleMatrix,
        ]);
    }

    protected preparation(): void {
        EventManager.subscribe(CoreEvents.PRE_RENDER, this.onPreRender.bind(this));
    }
}
