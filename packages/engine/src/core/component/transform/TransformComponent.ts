import { Matrix4, Quaternion, Vector3 } from '@nox-engine/mathf';
import GameObject from '../../object/GameObject';
import BaseComponent from '../BaseComponent';

export default class TransformComponent extends BaseComponent {
    public position = new Vector3();
    public scale = new Vector3(1, 1, 1);
    public rotation = new Quaternion();

    public localMatrix: Matrix4 = new Matrix4();
    public worldMatrix: Matrix4 = new Matrix4();
    private positionMatrix: Matrix4 = new Matrix4();
    private rotationMatrix: Matrix4 = new Matrix4();
    private scaleMatrix: Matrix4 = new Matrix4();
    private child: GameObject[] = [];

    private _parent: TransformComponent | null = null;

    get parent(): TransformComponent | null {
        return this._parent;
    }

    set parent(value: TransformComponent | null) {
        this._parent = value;
    }

    public getWorldMatrix(): Matrix4 {
        this.positionMatrix = Matrix4.translate(this.position);
        this.rotationMatrix = this.rotation.toMatrix4();
        this.scaleMatrix = Matrix4.scale(this.scale);

        this.localMatrix = Matrix4.multiplyFromArray([
            this.positionMatrix,
            this.rotationMatrix,
            this.scaleMatrix,
        ]);

        if (this.gameObject.transform.parent) {
            this.worldMatrix = Matrix4.multiplyFromArray([
                this.gameObject.transform.parent.getWorldMatrix(),
                this.localMatrix,
            ]);
        } else {
            this.worldMatrix = this.localMatrix;
        }

        return this.worldMatrix;
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

    public getParent(): TransformComponent | null {
        return this._parent;
    }

    public forward() {
        return new Vector3(this.localMatrix[8], this.localMatrix[9], this.localMatrix[10]);
    }

    public right() {
        return new Vector3(-this.localMatrix[0], -this.localMatrix[1], -this.localMatrix[2]);
    }

    public up() {
        return new Vector3(this.localMatrix[4], this.localMatrix[5], this.localMatrix[6]);
    }

    public getWorldPosition() {
        return new Vector3(this.worldMatrix[8], this.worldMatrix[9], this.worldMatrix[10]);
    }

    public getLocalPosition() {
        return new Vector3(this.localMatrix[10], this.localMatrix[11], this.localMatrix[12]);
    }

    public getGlobalPosition() {
        return new Vector3().applyMatrix(this.worldMatrix);
    }

    public getWorldForward() {
        return new Vector3(this.localMatrix[3], this.localMatrix[6], this.localMatrix[9]);
    }

    protected preparation(): void {
    }
}
