import BaseComponent from '../BaseComponent';
import { Matrix4, Quaternion, Vector3 } from '@nox-engine/mathf';

export default class TransformComponent extends BaseComponent {
    public position = new Vector3();
    public scale = new Vector3(1, 1, 1);
    public rotation = new Quaternion()

    public getMatrix(): Matrix4 {
        return Matrix4.multiplyFromArray([
            this.gameObject.parent ? this.gameObject.parent.transform.getMatrix() : new Matrix4(),
            Matrix4.translate(this.position),
            this.rotation.toMatrix4(),
            Matrix4.scale(this.scale),
        ])
    }

    protected preparation(): void {}
}
