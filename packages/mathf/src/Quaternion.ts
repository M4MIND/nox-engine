import Matrix4 from './Matrix4';
import Vector3 from './Vector3';

export default class Quaternion {
    constructor(private x = 0, private y = 0, private z = 0, private w = 1) {}

    public axisAngle(v: Vector3, angle: number): this {
        let s = Math.sin(angle * .5);

        this.x = v.x * s;
        this.y = v.y * s;
        this.z = v.z * s;
        this.w = Math.cos(angle * .5);

        return this;
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
            0, 0, 0, 1
        );
    }
}
