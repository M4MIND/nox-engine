import { Matrix4, Quaternion, Vector3 } from '@nox-engine/mathf';
import EventManager, { CoreEvents } from '../../EventManager';
import SceneManager from '../../scene/SceneManager';
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

    public lookAt(position: Vector3, target: Vector3, up: Vector3 = Vector3.up): void {
        let m = Matrix4.lookAt(position, target, up);

        let w = Math.sqrt(1.0 + m.m00 + m.m11 + m.m22) / 2.0;
        let w4 = (4.0 * w);

        let x = (m.m21 - m.m12) / w4;
        let y = (m.m02 - m.m20) / w4;
        let z = (m.m10 - m.m01) / w4;

        this.rotation = new Quaternion(x, y, z, w);
    }

    public forward() {
        return new Vector3(this.modelMatrix[8], this.modelMatrix[9], this.modelMatrix[10])
    }

    public right() {
        return new Vector3(-this.modelMatrix[0], -this.modelMatrix[1], -this.modelMatrix[2])
    }

    public up() {
        return new Vector3(this.modelMatrix[4], this.modelMatrix[5], this.modelMatrix[6]);
    }

    public onPreRender() {
        this.positionMatrix = Matrix4.translate(this.position);
        this.rotationMatrix = this.rotation.toMatrix4();
        this.scaleMatrix = Matrix4.scale(this.scale);

        this.modelMatrix = Matrix4.multiplyFromArray([
            this.positionMatrix,
            this.rotationMatrix,
            this.scaleMatrix,
        ]);

        if (this.gameObject.parent) {
            this.modelMatrix = Matrix4.multiplyFromArray([
                this.gameObject.parent.transform.getModelMatrix(),
                this.modelMatrix,
            ]);
        }
    }

    protected preparation(): void {
        SceneManager.activeScene.subscribe(CoreEvents.PRE_RENDER, this.onPreRender.bind(this), this.id);
    }
}
