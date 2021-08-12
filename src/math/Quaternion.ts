import { Matrix4 } from './Matrix4';
import { Vector3 } from './Vector3';

export class Quaternion {
    constructor(public x: number = 0, public y: number = 0, public z: number = 0, public w: number = 0) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;
    }

    toMatrix4() {
        let w = this.w;
        let x = this.x;
        let y = this.y;
        let z = this.z;

        let n = w * w + x * x + y * y + z * z;
        let s = n === 0 ? 0 : 2 / n;
        let wx = s * w * x, wy = s * w * y, wz = s * w * z;
        let xx = s * x * x, xy = s * x * y, xz = s * x * z;
        let yy = s * y * y, yz = s * y * z, zz = s * z * z;

        return new Matrix4([
            [1 - (yy + zz), xy - wz, xz + wy, 0],
            [xy + wz, 1 - (xx + zz), yz - wx, 0],
            [xz - wy, yz + wx, 1 - (xx + yy), 0],
            [0, 0, 0, 1]]
        );
    }

    multiple(q: Vector3) {
        var w1 = this.w;
        var x1 = this.x;
        var y1 = this.y;
        var z1 = this.z;

        var w2 = q.w;
        var x2 = q.x;
        var y2 = q.y;
        var z2 = q.z;

        return new Quaternion(
            w1 * x2 + x1 * w2 + y1 * z2 - z1 * y2,
            w1 * y2 + y1 * w2 + z1 * x2 - x1 * z2,
            w1 * z2 + z1 * w2 + x1 * y2 - y1 * x2,
            w1 * w2 - x1 * x2 - y1 * y2 - z1 * z2
        );
    }

    static fromVector(v: Vector3, a: number) {
        v = v.normalize();
        let sin = Math.sin(a / 2);
        let cos = Math.cos(a / 2);
        return new Quaternion(sin * v.x, sin * v.y, sin * v.z, cos)
    }
}