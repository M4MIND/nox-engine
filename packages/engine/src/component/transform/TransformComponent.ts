import { Component } from '../Component';
import { Vector3, Quaternion } from '@gengine/mathf';

export class TransformComponent extends Component {
    public position: Vector3 = new Vector3();
    public right: Vector3 = new Vector3(1, 0, 0);
    public up: Vector3 = new Vector3(0, 1, 0);
    public forvard: Vector3 = new Vector3(0, 0, 1);
    public rotation: Quaternion = new Quaternion();
}