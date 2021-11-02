export default class Vector3 extends Array<number> {
    public static up = new Vector3(0, 1, 0);
    public static left = new Vector3(1, 0, 0);
    public static forward = new Vector3(1, 0, -1);

    constructor(private _x: number = 0, private _y: number = 0, private _z: number = 0) {
        super(_x, _y, _z);
    }

    get x(): number {
        return this._x;
    }

    set x(value: number) {
        this._x = value;

        this[0] = value;
    }

    get y(): number {
        return this._y;
    }

    set y(value: number) {
        this._y = value;

        this[1] = value;
    }

    get z(): number {
        return this._z;
    }

    set z(value: number) {
        this._z = value;

        this[2] = value;
    }

    public static normalize(v: Vector3) {
        let l = Math.sqrt(v._x * v._x + v._y * v._y + v._z * v._z);
        if (l > 0.00001) {
            return new Vector3(v._x / l, v._y / l, v._z / l);
        }
        return new Vector3(0, 0, 0);
    }

    public static cross(v1: Vector3, v2: Vector3) {
        var vx = v1.x, vy = v1.y, vz = v1.z, x = v2.x, y = v2.y, z = v2.z;

        let target = new Vector3();

        target.x = (y * vz) - (z * vy);
        target.y = (z * vx) - (x * vz);
        target.z = (x * vy) - (y * vx);

        return target;
    }

    public static subtract(a: Vector3, b: Vector3): Vector3 {
        return new Vector3(a.x - b.x, a.y - b.y, a.z - b.z);
    }
    
    public static sum(a: Vector3, b: Vector3): Vector3 {
        return new Vector3(a.x + b.x, a.y + b.y, a.z + b.z);
    }

    public static dot(v1: Vector3, v2: Vector3) {
        return v1.x * v2.x + v1.y * v2.y + v1.z * v2.z;
    }
}
