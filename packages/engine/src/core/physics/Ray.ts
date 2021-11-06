import { Vector3 } from '@nox-engine/mathf';

export default class  {
    private _position: Vector3;
    private _direction: Vector3;

    get position(): Vector3 {
        return this._position;
    }

    get direction(): Vector3 {
        return this._direction;
    }

    constructor(position: Vector3, target: Vector3) {
        this._position = position;
        this._direction = Vector3.normalize(target);
    }
}