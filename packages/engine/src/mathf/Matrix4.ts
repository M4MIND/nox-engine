import Vector3 from './Vector3';

export default class Matrix4 extends Array<number> {
    constructor(
        m00: number = 1,
        m01: number = 0,
        m02: number = 0,
        m03: number = 0,
        m10: number = 0,
        m11: number = 1,
        m12: number = 0,
        m13: number = 0,
        m20: number = 0,
        m21: number = 0,
        m22: number = 1,
        m23: number = 0,
        m30: number = 0,
        m31: number = 0,
        m32: number = 0,
        m33: number = 1,
    ) {
        super(m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33);
    }

    static translate(v: Vector3 = new Vector3(0, 0, 0)) {
        return new Matrix4(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, v.x, v.y, v.z);
    }

    static scale(v: Vector3 = new Vector3(1, 1, 1)) {
        return new Matrix4(v.x, 0, 0, 0, 0, v.y, 0, 0, 0, 0, v.z, 0, 0, 0, 0, 1);
    }

    static xRotation(r: number) {
        let s = Math.sin(r);
        let c = Math.cos(r);

        return new Matrix4(1, 0, 0, 0, 0, c, s, 0, 0, -s, c, 0, 0, 0, 0, 1);
    }

    static yRotation(r: number) {
        let s = Math.sin(r);
        let c = Math.cos(r);

        return new Matrix4(c, 0, -s, 0, 0, 1, 0, 0, s, 0, c, 0, 0, 0, 0, 1);
    }

    static zRotation(r: number) {
        let s = Math.sin(r);
        let c = Math.cos(r);

        return new Matrix4(c, s, 0, 0, -s, c, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
    }

    static projection(fieldOfViewInRadians: number = 0, aspect: number = 0, near: number = 1, far: number = 1000): Matrix4 {
        let f = Math.tan(Math.PI * 0.5 - 0.5 * fieldOfViewInRadians);
        let rangeInv = 1.0 / (near - far);

        return new Matrix4(f / aspect, 0, 0, 0, 0, f, 0, 0, 0, 0, (near + far) * rangeInv, -1, 0, 0, near * far * rangeInv * 2, 0);
    }
}
