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

    public static inverse(m: Matrix4) {
        var m00 = m[0 * 4 + 0];
        var m01 = m[0 * 4 + 1];
        var m02 = m[0 * 4 + 2];
        var m03 = m[0 * 4 + 3];
        var m10 = m[1 * 4 + 0];
        var m11 = m[1 * 4 + 1];
        var m12 = m[1 * 4 + 2];
        var m13 = m[1 * 4 + 3];
        var m20 = m[2 * 4 + 0];
        var m21 = m[2 * 4 + 1];
        var m22 = m[2 * 4 + 2];
        var m23 = m[2 * 4 + 3];
        var m30 = m[3 * 4 + 0];
        var m31 = m[3 * 4 + 1];
        var m32 = m[3 * 4 + 2];
        var m33 = m[3 * 4 + 3];
        var tmp_0 = m22 * m33;
        var tmp_1 = m32 * m23;
        var tmp_2 = m12 * m33;
        var tmp_3 = m32 * m13;
        var tmp_4 = m12 * m23;
        var tmp_5 = m22 * m13;
        var tmp_6 = m02 * m33;
        var tmp_7 = m32 * m03;
        var tmp_8 = m02 * m23;
        var tmp_9 = m22 * m03;
        var tmp_10 = m02 * m13;
        var tmp_11 = m12 * m03;
        var tmp_12 = m20 * m31;
        var tmp_13 = m30 * m21;
        var tmp_14 = m10 * m31;
        var tmp_15 = m30 * m11;
        var tmp_16 = m10 * m21;
        var tmp_17 = m20 * m11;
        var tmp_18 = m00 * m31;
        var tmp_19 = m30 * m01;
        var tmp_20 = m00 * m21;
        var tmp_21 = m20 * m01;
        var tmp_22 = m00 * m11;
        var tmp_23 = m10 * m01;

        var t0 = tmp_0 * m11 + tmp_3 * m21 + tmp_4 * m31 - (tmp_1 * m11 + tmp_2 * m21 + tmp_5 * m31);
        var t1 = tmp_1 * m01 + tmp_6 * m21 + tmp_9 * m31 - (tmp_0 * m01 + tmp_7 * m21 + tmp_8 * m31);
        var t2 = tmp_2 * m01 + tmp_7 * m11 + tmp_10 * m31 - (tmp_3 * m01 + tmp_6 * m11 + tmp_11 * m31);
        var t3 = tmp_5 * m01 + tmp_8 * m11 + tmp_11 * m21 - (tmp_4 * m01 + tmp_9 * m11 + tmp_10 * m21);

        var d = 1.0 / (m00 * t0 + m10 * t1 + m20 * t2 + m30 * t3);

        return new Matrix4(
            d * t0,
            d * t1,
            d * t2,
            d * t3,
            d * (tmp_1 * m10 + tmp_2 * m20 + tmp_5 * m30 - (tmp_0 * m10 + tmp_3 * m20 + tmp_4 * m30)),
            d * (tmp_0 * m00 + tmp_7 * m20 + tmp_8 * m30 - (tmp_1 * m00 + tmp_6 * m20 + tmp_9 * m30)),
            d * (tmp_3 * m00 + tmp_6 * m10 + tmp_11 * m30 - (tmp_2 * m00 + tmp_7 * m10 + tmp_10 * m30)),
            d * (tmp_4 * m00 + tmp_9 * m10 + tmp_10 * m20 - (tmp_5 * m00 + tmp_8 * m10 + tmp_11 * m20)),
            d * (tmp_12 * m13 + tmp_15 * m23 + tmp_16 * m33 - (tmp_13 * m13 + tmp_14 * m23 + tmp_17 * m33)),
            d * (tmp_13 * m03 + tmp_18 * m23 + tmp_21 * m33 - (tmp_12 * m03 + tmp_19 * m23 + tmp_20 * m33)),
            d * (tmp_14 * m03 + tmp_19 * m13 + tmp_22 * m33 - (tmp_15 * m03 + tmp_18 * m13 + tmp_23 * m33)),
            d * (tmp_17 * m03 + tmp_20 * m13 + tmp_23 * m23 - (tmp_16 * m03 + tmp_21 * m13 + tmp_22 * m23)),
            d * (tmp_14 * m22 + tmp_17 * m32 + tmp_13 * m12 - (tmp_16 * m32 + tmp_12 * m12 + tmp_15 * m22)),
            d * (tmp_20 * m32 + tmp_12 * m02 + tmp_19 * m22 - (tmp_18 * m22 + tmp_21 * m32 + tmp_13 * m02)),
            d * (tmp_18 * m12 + tmp_23 * m32 + tmp_15 * m02 - (tmp_22 * m32 + tmp_14 * m02 + tmp_19 * m12)),
            d * (tmp_22 * m22 + tmp_16 * m02 + tmp_21 * m12 - (tmp_20 * m12 + tmp_23 * m22 + tmp_17 * m02)),
        );
    }
}
