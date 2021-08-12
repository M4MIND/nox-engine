export class Vector3 {
    constructor(public x: number = 0, public y: number = 0, public z: number = 1, public w: number = 1) {
    }

    public length(): number {
        return Vector3._length(this);
    }

    public normalize(): Vector3 {
        return Vector3.normalize(this);
    }

    public static _length(v: Vector3): number {
        return Math.sqrt(v.x * v.x + v.y * v.y + v.z * v.z)
    }

    static normalize(v: Vector3): Vector3 {
        let len = v.length();
        return new Vector3(v.x / len, v.y / len, v.z / len);
    }
}