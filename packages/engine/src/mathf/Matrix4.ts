import Vector3 from './Vector3';

export default class Matrix4 extends Array<number> {
    constructor(
        public readonly m00: number = 1,
        public readonly m01: number = 0,
        public readonly m02: number = 0,
        public readonly m03: number = 0,
        public readonly m10: number = 0,
        public readonly m11: number = 1,
        public readonly m12: number = 0,
        public readonly m13: number = 0,
        public readonly m20: number = 0,
        public readonly m21: number = 0,
        public readonly m22: number = 1,
        public readonly m23: number = 0,
        public readonly m30: number = 0,
        public readonly m31: number = 0,
        public readonly m32: number = 0,
        public readonly m33: number = 1,
    ) {
        super(m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33);
    }

    static translate(v: Vector3 = new Vector3(0, 0, 0)) {
        return new Matrix4(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, v.x, v.y, v.z);
    }

    static scale(v: Vector3 = new Vector3(1, 1, 1)) {
        return new Matrix4(v.x, 0, 0, 0, 0, v.y, 0, 0, 0, 0, v.z, 0, 0, 0, 0, 1);
    }

    public static xRotation(r: number) {
        let s = Math.sin(r);
        let c = Math.cos(r);

        return new Matrix4(1, 0, 0, 0, 0, c, s, 0, 0, -s, c, 0, 0, 0, 0, 1);
    }

    public static yRotation(r: number) {
        let s = Math.sin(r);
        let c = Math.cos(r);

        return new Matrix4(c, 0, -s, 0, 0, 1, 0, 0, s, 0, c, 0, 0, 0, 0, 1);
    }

    public static zRotation(r: number) {
        let s = Math.sin(r);
        let c = Math.cos(r);

        return new Matrix4(c, s, 0, 0, -s, c, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
    }

    public static projection(
        fieldOfViewInRadians: number = 0,
        aspect: number = 0,
        near: number = 1,
        far: number = 1000,
    ): Matrix4 {
        let f = Math.tan(Math.PI * 0.5 - 0.5 * fieldOfViewInRadians);
        let rangeInv = 1.0 / (near - far);

        return new Matrix4(
            f / aspect,
            0,
            0,
            0,
            0,
            f,
            0,
            0,
            0,
            0,
            (near + far) * rangeInv,
            -1,
            0,
            0,
            near * far * rangeInv * 2,
            0,
        );
    }

    public static multiplyFromArray(a: Matrix4[]): Matrix4 {
        let m = a[0];

        for (let i = 0; i < a.length - 1; i++) {
            m = this.multiply(m, a[i + 1]);
        }

        return m;
    }

    public static multiply(a: Matrix4, b: Matrix4): Matrix4 {
        return new Matrix4(
            b.m00 * a.m00 + b.m01 * a.m10 + b.m02 * a.m20 + b.m03 * a.m30,
            b.m00 * a.m01 + b.m01 * a.m11 + b.m02 * a.m21 + b.m03 * a.m31,
            b.m00 * a.m02 + b.m01 * a.m12 + b.m02 * a.m22 + b.m03 * a.m32,
            b.m00 * a.m03 + b.m01 * a.m13 + b.m02 * a.m23 + b.m03 * a.m33,
            b.m10 * a.m00 + b.m11 * a.m10 + b.m12 * a.m20 + b.m13 * a.m30,
            b.m10 * a.m01 + b.m11 * a.m11 + b.m12 * a.m21 + b.m13 * a.m31,
            b.m10 * a.m02 + b.m11 * a.m12 + b.m12 * a.m22 + b.m13 * a.m32,
            b.m10 * a.m03 + b.m11 * a.m13 + b.m12 * a.m23 + b.m13 * a.m33,
            b.m20 * a.m00 + b.m21 * a.m10 + b.m22 * a.m20 + b.m23 * a.m30,
            b.m20 * a.m01 + b.m21 * a.m11 + b.m22 * a.m21 + b.m23 * a.m31,
            b.m20 * a.m02 + b.m21 * a.m12 + b.m22 * a.m22 + b.m23 * a.m32,
            b.m20 * a.m03 + b.m21 * a.m13 + b.m22 * a.m23 + b.m23 * a.m33,
            b.m30 * a.m00 + b.m31 * a.m10 + b.m32 * a.m20 + b.m33 * a.m30,
            b.m30 * a.m01 + b.m31 * a.m11 + b.m32 * a.m21 + b.m33 * a.m31,
            b.m30 * a.m02 + b.m31 * a.m12 + b.m32 * a.m22 + b.m33 * a.m32,
            b.m30 * a.m03 + b.m31 * a.m13 + b.m32 * a.m23 + b.m33 * a.m33,
        );
    }
}
