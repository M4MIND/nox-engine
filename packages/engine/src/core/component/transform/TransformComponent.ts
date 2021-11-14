import { Matrix4, Quaternion, Vector3 } from '@nox-engine/mathf';
import GameObject from '../../object/GameObject';
import BaseComponent from '../BaseComponent';

export default class TransformComponent extends BaseComponent {
    public position = new Vector3();
    public scale = new Vector3(1, 1, 1);
    public rotation = new Quaternion();

    private localMatrix: Matrix4 = new Matrix4();
    private worldMatrix: Matrix4 = new Matrix4();
    private positionMatrix: Matrix4 = new Matrix4();
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
        this.positionMatrix.translate(this.position);
        this.scaleMatrix.scale(this.scale);

        this.localMatrix.clear();

        this.localMatrix = Matrix4.multiplyFromArray(
            this.localMatrix,
            this.positionMatrix,
            this.rotation.toMatrix4(),
            this.scaleMatrix,
        );

        if (this.gameObject.transform.parent) {
            this.worldMatrix.clear();

            this.worldMatrix = Matrix4.multiplyFromArray(
                this.worldMatrix,
                this.gameObject.transform.parent.getWorldMatrix(),
                this.localMatrix,
            );
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

        let w = Math.sqrt(1.0 + m.get00() + m.get11() + m.get22()) / 2.0;
        let w4 = (4.0 * w);

        let x = (m.get21() - m.get12()) / w4;
        let y = (m.get02() - m.get20()) / w4;
        let z = (m.get10() - m.get01()) / w4;

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
