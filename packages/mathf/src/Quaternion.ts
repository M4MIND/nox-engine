import Mathf from './Mathf';
import Matrix4 from './Matrix4';
import Vector3 from './Vector3';

export default class Quaternion {
    constructor(public x = 0, public y = 0, public z = 0, private w = 1) {}

    public axisAngle(v: Vector3, angle: number): this {
        let s = Math.sin(angle * .5);

        this.x = v.getX() * s;
        this.y = v.getY() * s;
        this.z = v.getZ() * s;
        this.w = Math.cos(angle * .5);

        return this;
    }

    public normalize() {
        let l = Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);

        if (l === 0) {
            return new Quaternion(0, 0, 0, 0);
        } else {
            l = 1 / l;
            return new Quaternion(this.x * l, this.y * l, this.z * l, this.w * l);
        }
    }

    public inverse() {
        return new Quaternion(-this.x, -this.y, -this.z, -this.w);
    }

    public toMatrix4(): Matrix4 {
        let w = this.w;
        let x = this.x;
        let y = this.y;
        let z = this.z;

        let n = w * w + x * x + y * y + z * z;
        let s = n === 0 ? 0 : 2 / n;
        let wx = s * w * x, wy = s * w * y, wz = s * w * z;
        let xx = s * x * x, xy = s * x * y, xz = s * x * z;
        let yy = s * y * y, yz = s * y * z, zz = s * z * z;

        return new Matrix4(
            1 - (yy + zz), xy - wz, xz + wy, 0,
            xy + wz, 1 - (xx + zz), yz - wx, 0,
            xz - wy, yz + wx, 1 - (xx + yy), 0,
            0, 0, 0, 1,
        );
    }

    public euler(x: number = 0, y: number = 0, z: number = 0) {
        x = Mathf.rad2deg * x / 2;
        y = Mathf.rad2deg * y / 2;
        z = Mathf.rad2deg * z / 2;

        const cos = Math.cos;
        const sin = Math.sin;

        const c1 = cos(x);
        const c2 = cos(y);
        const c3 = cos(z);

        const s1 = sin(x);
        const s2 = sin(y);
        const s3 = sin(z);

        this.x = s1 * c2 * c3 + c1 * s2 * s3;
        this.y = c1 * s2 * c3 - s1 * c2 * s3;
        this.z = c1 * c2 * s3 + s1 * s2 * c3;
        this.w = c1 * c2 * c3 - s1 * s2 * s3;
    }

    public toVector() {
        return new Vector3(this.x, this.y, this.z);
    }

    public multiple(q: Quaternion) {
        let target = new Quaternion();
        let w = this.w;

        let va = new Vector3(this.x, this.y, this.z);
        let vb = new Vector3(q.x, q.y, q.z);
        target.w = w * q.w - Vector3.dot(va, vb);

        let vaxvb = Vector3.cross(va, vb);

        target.x = w * vb.getX() + q.w * va.getX() + vaxvb.getX();
        target.y = w * vb.getY() + q.w * va.getY() + vaxvb.getY();
        target.z = w * vb.getZ() + q.w * va.getZ() + vaxvb.getZ();

        return target;
    };

    public multipleOnVector(v: Vector3): Vector3 {
        let x = v.getX(),
            y = v.getY(),
            z = v.getZ();

        let qx = this.x,
            qy = this.y,
            qz = this.z,
            qw = this.w;

        let ix = qw * x + qy * z - qz * y,
            iy = qw * y + qz * x - qx * z,
            iz = qw * z + qx * y - qy * x,
            iw = -qx * x - qy * y - qz * z;

        return new Vector3(ix * qw + iw * -qx + iy * -qz - iz * -qy, iy * qw + iw * -qy + iz * -qx - ix * -qz, iz * qw + iw * -qz + ix * -qy - iy * -qx);
    }

    public forward(): Vector3 {
        return new Vector3(2 * (this.x * this.z + this.w * this.y), 2 * (this.y * this.z - this.w * this.x), 1 - 2 * (this.x * this.x + this.y * this.y));
    }
}
