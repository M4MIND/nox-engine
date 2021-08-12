import { Vector3 } from './../../../math/Vector3';
import { Quaternion } from './../../../math/Quaternion';
import { Component } from "../Component";

export class TransformComponent extends Component {
    public position: Vector3 = new Vector3();
    public scale: Vector3 = new Vector3();
    public quaternion: Quaternion = new Quaternion();
}