import Matrix4 from './Matrix4';

export default class Vector3 extends Array <number> {
    public static back = new Vector3(0, 0, -1);
    public static down = new Vector3(0, -1, 0);
    public static forward = new Vector3(0, 0, 1);
    public static left = new Vector3(1, 0, 0);
    public static right = new Vector3(-1, 0, 0);
    public static up = new Vector3(0, 1, 0);
    public static zero = new Vector3(0, 0, 0);

    constructor(x = 0, y = 0, z = 0) {
        super(x, y, z);
    }

    public set(x: number, y: number, z: number) {
        this.setX(x).setY(y).setZ(z);
    }

    public getX(): number {
        return this[0];
    }

    public setX(v: number): this {
        this[0] = v;
        return this;
    }

    public getY(): number {
        return this[1];
    }

    public setY(v: number): this {
        this[1] = v;

        return this;
    }

    public getZ(): number {
        return this[2];
    }

    public setZ(v: number): this {
        this[2] = v;
        return this;
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

    public static add(a: Vector3, b: Vector3): Vector3 {
        return new Vector3(a.getX() + b.getX(), a.getY() + b.getY(), a.getZ() + b.getZ());
    }

    public static dot(a: Vector3, b: Vector3) {
        return a.getX() * b.getX() + a.getY() * b.getY() + a.getZ() * b.getZ();
    }

    public static subtract(a: Vector3, b: Vector3): Vector3 {
        return new Vector3(a.getX() - b.getX(), a.getY() - b.getY(), a.getZ() - b.getZ());
    }

    public static normalize(v: Vector3): Vector3 {
        let l = Math.sqrt(v.getX() * v.getX() + v.getY() * v.getY() + v.getZ() * v.getZ());

        if (l > 0.00001) {
            return new Vector3(v.getX() / l, v.getY() / l, v.getZ() / l);
        }
        return new Vector3(0, 0, 0);
    }

    public static cross(a: Vector3, b: Vector3): Vector3 {
        let vx = a.getX(), vy = a.getY(), vz = a.getZ(), x = b.getX(), y = b.getY(), z = b.getZ();

        return new Vector3((y * vz) - (z * vy), (z * vx) - (x * vz), (x * vy) - (y * vx));
    }

    public static multiplyOnLength(v: Vector3, n: number): Vector3 {
        return new Vector3(v.getX() * n, v.getY() * n, v.getZ() * n);
    }

    public static applyMatrix(v: Vector3, m: Matrix4): Vector3 {
        const x = v.getX(), y = v.getY(), z = v.getZ();

        const w = 1 / (m.get03() * x + m.get13() * y + m.get23() * z + m.get33());

        return v.setX((m.get00() * x + m.get10() * y + m.get20() * z + m.get30()) * w)
            .setY((m.get01() * x + m.get11() * y + m.get21() * z + m.get31()) * w)
            .setZ((m.get02() * x + m.get12() * y + m.get22() * z + m.get32()) * w);
    }
}