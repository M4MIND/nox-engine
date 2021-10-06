import Vector3 from '../../../mathf/Vector3';
import { BaseComponent } from '../BaseComponent';

export default class TransformComponent extends BaseComponent {
    public position: Vector3 = new Vector3();
    public scale: Vector3 = new Vector3(1, 1, 1);
    public right: Vector3 = new Vector3(1, 0, 0);
    public up: Vector3 = new Vector3(0, 1, 0);
    public forward: Vector3 = new Vector3(0, 0, 1);
    public x = 0;
    public y = 0;
    public z = 0;
}
