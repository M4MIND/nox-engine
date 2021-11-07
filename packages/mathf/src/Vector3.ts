import Matrix4 from './Matrix4';

export default class Vector3 extends Array<number> {
    public static back = new Vector3(0, 0, -1);
    public static down = new Vector3(0, -1, 0);
    public static forward = new Vector3(0, 0, 1);
    public static left = new Vector3(1, 0, 0);
    public static right = new Vector3(-1, 0, 0);
    public static up = new Vector3(0, 1, 0);
    public static zero = new Vector3(0, 0, 0);

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

    public static cross(a: Vector3, b: Vector3) {
        let vx = a.x, vy = a.y, vz = a.z, x = b.x, y = b.y, z = b.z;

        return new Vector3((y * vz) - (z * vy), (z * vx) - (x * vz), (x * vy) - (y * vx));
    }

    public static subtract(a: Vector3, b: Vector3): Vector3 {
        return new Vector3(a.x - b.x, a.y - b.y, a.z - b.z);
    }

    public static add(a: Vector3, b: Vector3): Vector3 {
        return new Vector3(a.x + b.x, a.y + b.y, a.z + b.z);
    }

    public static dot(a: Vector3, b: Vector3) {
        return a.x * b.x + a.y * b.y + a.z * b.z;
    }

    public static multiplyOnLength(v: Vector3, n: number) {
        return new Vector3(v.x * n, v.y * n, v.z * n);
    }

    public static applyMatrix(v: Vector3, m: Matrix4): Vector3 {
        const x = v.x, y = v.y, z = v.z;

        const w = 1 / (m[3] * x + m[7] * y + m[11] * z + m[15]);

        v.x = (m[0] * x + m[4] * y + m[8] * z + m[12]) * w;
        v.y = (m[1] * x + m[5] * y + m[9] * z + m[13]) * w;
        v.z = (m[2] * x + m[6] * y + m[10] * z + m[14]) * w;

        return v;
    }

    public normalize(): Vector3 {
        return Vector3.normalize(this);
    }

    public cross(v: Vector3): Vector3 {
        return Vector3.cross(this, v);
    }

    public subtract(v: Vector3): Vector3 {
        return Vector3.subtract(this, v);
    }

    public add(v: Vector3): Vector3 {
        return Vector3.add(this, v);
    }

    public dot(v: Vector3): number {
        return Vector3.dot(this, v);
    }

    public multiplyOnLength(n: number): Vector3 {
        return Vector3.multiplyOnLength(this, n);
    }

    public applyMatrix(m: Matrix4): Vector3 {
        return Vector3.applyMatrix(this, m);
    }
}
