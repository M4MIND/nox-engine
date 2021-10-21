import BaseComponent from '../BaseComponent';
import { Vector3 } from '@nox-engine/mathf';

export default class TransformComponent extends BaseComponent {
    public position = new Vector3();
    public scale = new Vector3(1, 1, 1);
    public rotateX = 0;
    public rotateY = 0;
    public rotateZ = 0;

    protected preparation(): void {}
}
