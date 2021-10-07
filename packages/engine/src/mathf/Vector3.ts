export default class Vector3 extends Array<number> {
    constructor(public x: number = 0, public y: number = 0, public z: number = 0) {
        super(x, y, z);
    }

    public static normalize(v: Vector3) {
        let l = Math.sqrt(v.x * v.x + v.y * v.y + v.z * v.z);
        if (l > 0.00001) {
            return new Vector3(v.x / length, v.y / length, v.z / length);
        } else {
            return new Vector3(0, 0, 0);
        }
    }

    public static subtractVectors(a: Vector3, b: Vector3) {
        return new Vector3(a[0] - b[0], a[1] - b[1], a[2] - b[2]);
    }

    public static cross(a: Vector3, b: Vector3) {
        return new Vector3(a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]);
    }
}
