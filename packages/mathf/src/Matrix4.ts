import Vector3 from './Vector3';

export default class Matrix4 extends Array<number> {
    /*
    |get00(0),  get01(1),  get02(2),  get03(3)|
    |get10(4),  get11(5),  get12(6),  get13(7)|
    |get20(8),  get21(9),  get22(10), get23(11)|
    |get30(12), get31(13), get32(14), get33(15)|
     */

    constructor(m00 = 1,
                m01 = 0,
                m02 = 0,
                m03 = 0,
                m10 = 0,
                m11 = 1,
                m12 = 0,
                m13 = 0,
                m20 = 0,
                m21 = 0,
                m22 = 1,
                m23 = 0,
                m30 = 0,
                m31 = 0,
                m32 = 0,
                m33 = 1) {
        super(m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33);
    }

    public get00(): number {
        return this[0];
    }

    public set00(v: number): this {
        this[0] = v;
        return this;
    }

    public get01(): number {
        return this[1];
    }

    public set01(v: number): this {
        this[1] = v;
        return this;
    }

    public get02(): number {
        return this[2];
    }

    public set02(v: number): this {
        this[2] = v;
        return this;
    }

    public get03(): number {
        return this[3];
    }

    public set03(v: number): this {
        this[3] = v;
        return this;
    }

    public get10(): number {
        return this[4];
    }

    public set10(v: number): this {
        this[4] = v;
        return this;
    }

    public get11(): number {
        return this[5];
    }

    public set11(v: number): this {
        this[5] = v;
        return this;
    }

    public get12(): number {
        return this[6];
    }

    public set12(v: number): this {
        this[6] = v;
        return this;
    }

    public get13(): number {
        return this[7];
    }

    public set13(v: number): this {
        this[7] = v;
        return this;
    }

    public get20(): number {
        return this[8];
    }

    public set20(v: number): this {
        this[8] = v;
        return this;
    }

    public get21(): number {
        return this[9];
    }

    public set21(v: number): this {
        this[9] = v;
        return this;
    }

    public get22(): number {
        return this[10];
    }

    public set22(v: number): this {
        this[10] = v;
        return this;
    }

    public get23(): number {
        return this[11];
    }

    public set23(v: number): this {
        this[11] = v;
        return this;
    }

    public get30(): number {
        return this[12];
    }

    public set30(v: number): this {
        this[12] = v;
        return this;
    }

    public get31(): number {
        return this[13];
    }

    public set31(v: number): this {
        this[13] = v;
        return this;
    }

    public get32(): number {
        return this[14];
    }

    public set32(v: number): this {
        this[14] = v;
        return this;
    }

    public get33(): number {
        return this[15];
    }

    public set33(v: number): this {
        this[15] = v;
        return this;
    }

    public translate(v: Vector3): Matrix4 {
        return this.set30(v.getX()).set31(v.getY()).set32(v.getZ());
    }

    public scale(v: Vector3 = new Vector3(1, 1, 1)): Matrix4 {
        return this.set00(v.getX()).set11(v.getY()).set22(v.getZ());
    }

    public xRotation(r: number): Matrix4 {
        let s = Math.sin(r);
        let c = Math.cos(r);

        return this.set12(c).set22(s).set31(-s).set32(c);
    }

    public yRotation(r: number): Matrix4 {
        let s = Math.sin(r);
        let c = Math.cos(r);

        return this.set00(c).set12(-s).set20(s).set22(c);
    }

    public zRotation(r: number): Matrix4 {
        let s = Math.sin(r);
        let c = Math.cos(r);

        return this.set00(c).set01(s).set10(-s).set11(c);
    }

    public multiply(b: Matrix4): this {
        let t00 = this[0];
        let t01 = this[1];
        let t02 = this[2];

        let t10 = this[4];
        let t11 = this[5];
        let t12 = this[6];

        let t20 = this[8];
        let t21 = this[9];
        let t22 = this[10];

        let t30 = this[12];
        let t31 = this[13];
        let t32 = this[14];

        let b00 = b[0];
        let b01 = b[1];
        let b02 = b[2];
        let b03 = b[3];

        let b10 = b[4];
        let b11 = b[5];
        let b12 = b[6];
        let b13 = b[7];

        let b20 = b[8];
        let b21 = b[9];
        let b22 = b[10];
        let b23 = b[11];

        let b30 = b[12];
        let b31 = b[13];
        let b32 = b[14];
        let b33 = b[15];

        return this.set00(b00 * t00 + b01 * t10 + b02 * t20 + b03 * t30)
            .set01(b00 * t01 + b01 * t11 + b02 * t21 + b03 * t31)
            .set02(b00 * t02 + b01 * t12 + b02 * t22 + b03 * t32)
            .set10(b10 * t00 + b11 * t10 + b12 * t20 + b13 * t30)
            .set11(b10 * t01 + b11 * t11 + b12 * t21 + b13 * t31)
            .set12(b10 * t02 + b11 * t12 + b12 * t22 + b13 * t32)
            .set20(b20 * t00 + b21 * t10 + b22 * t20 + b23 * t30)
            .set21(b20 * t01 + b21 * t11 + b22 * t21 + b23 * t31)
            .set22(b20 * t02 + b21 * t12 + b22 * t22 + b23 * t32)
            .set30(b30 * t00 + b31 * t10 + b32 * t20 + b33 * t30)
            .set31(b30 * t01 + b31 * t11 + b32 * t21 + b33 * t31)
            .set32(b30 * t02 + b31 * t12 + b32 * t22 + b33 * t32);
    }

    public inverse(): this {
        let m00 = this[0];
        let m01 = this[1];
        let m02 = this[2];
        let m03 = this[3];
        let m10 = this[4];
        let m11 = this[5];
        let m12 = this[6];
        let m13 = this[7];
        let m20 = this[8];
        let m21 = this[9];
        let m22 = this[10];
        let m23 = this[11];
        let m30 = this[12];
        let m31 = this[13];
        let m32 = this[14];
        let m33 = this[15];

        let tmp_0 = m22 * m33;
        let tmp_1 = m32 * m23;
        let tmp_2 = m12 * m33;
        let tmp_3 = m32 * m13;
        let tmp_4 = m12 * m23;
        let tmp_5 = m22 * m13;
        let tmp_6 = m02 * m33;
        let tmp_7 = m32 * m03;
        let tmp_8 = m02 * m23;
        let tmp_9 = m22 * m03;
        let tmp_10 = m02 * m13;
        let tmp_11 = m12 * m03;
        let tmp_12 = m20 * m31;
        let tmp_17 = m20 * m11;
        let tmp_18 = m00 * m31;
        let tmp_19 = m30 * m01;
        let tmp_20 = m00 * m21;
        let tmp_21 = m20 * m01;
        let tmp_22 = m00 * m11;
        let tmp_23 = m10 * m01;
        let tmp_13 = m30 * m21;
        let tmp_14 = m10 * m31;
        let tmp_15 = m30 * m11;
        let tmp_16 = m10 * m21;

        let t0 = tmp_0 * m11 + tmp_3 * m21 + tmp_4 * m31 - (tmp_1 * m11 + tmp_2 * m21 + tmp_5 * m31);
        let t1 = tmp_1 * m01 + tmp_6 * m21 + tmp_9 * m31 - (tmp_0 * m01 + tmp_7 * m21 + tmp_8 * m31);
        let t2 = tmp_2 * m01 + tmp_7 * m11 + tmp_10 * m31 - (tmp_3 * m01 + tmp_6 * m11 + tmp_11 * m31);
        let t3 = tmp_5 * m01 + tmp_8 * m11 + tmp_11 * m21 - (tmp_4 * m01 + tmp_9 * m11 + tmp_10 * m21);

        let d = 1.0 / (m00 * t0 + m10 * t1 + m20 * t2 + m30 * t3);

        return this.set00(d * t0)
            .set01(d * t1)
            .set02(d * t2)
            .set03(d * t3)
            .set10(d * (tmp_1 * m10 + tmp_2 * m20 + tmp_5 * m30 - (tmp_0 * m10 + tmp_3 * m20 + tmp_4 * m30)))
            .set11(d * (tmp_0 * m00 + tmp_7 * m20 + tmp_8 * m30 - (tmp_1 * m00 + tmp_6 * m20 + tmp_9 * m30)))
            .set12(d * (tmp_3 * m00 + tmp_6 * m10 + tmp_11 * m30 - (tmp_2 * m00 + tmp_7 * m10 + tmp_10 * m30)))
            .set13(d * (tmp_4 * m00 + tmp_9 * m10 + tmp_10 * m20 - (tmp_5 * m00 + tmp_8 * m10 + tmp_11 * m20)))
            .set20(d * (tmp_12 * m13 + tmp_15 * m23 + tmp_16 * m33 - (tmp_13 * m13 + tmp_14 * m23 + tmp_17 * m33)))
            .set21(d * (tmp_13 * m03 + tmp_18 * m23 + tmp_21 * m33 - (tmp_12 * m03 + tmp_19 * m23 + tmp_20 * m33)))
            .set22(d * (tmp_14 * m03 + tmp_19 * m13 + tmp_22 * m33 - (tmp_15 * m03 + tmp_18 * m13 + tmp_23 * m33)))
            .set23(d * (tmp_17 * m03 + tmp_20 * m13 + tmp_23 * m23 - (tmp_16 * m03 + tmp_21 * m13 + tmp_22 * m23)))
            .set30(d * (tmp_14 * m22 + tmp_17 * m32 + tmp_13 * m12 - (tmp_16 * m32 + tmp_12 * m12 + tmp_15 * m22)))
            .set31(d * (tmp_20 * m32 + tmp_12 * m02 + tmp_19 * m22 - (tmp_18 * m22 + tmp_21 * m32 + tmp_13 * m02)))
            .set32(d * (tmp_18 * m12 + tmp_23 * m32 + tmp_15 * m02 - (tmp_22 * m32 + tmp_14 * m02 + tmp_19 * m12)))
            .set33(d * (tmp_22 * m22 + tmp_16 * m02 + tmp_21 * m12 - (tmp_20 * m12 + tmp_23 * m22 + tmp_17 * m02)));
    }

    public multiplyFromArray(...args: Matrix4[]) {
        let l = args.length - 1;

        for (let i = 0; i < l; i++) {
            this.multiply(args[i + 1]);
        }

        return this;
    }

    public clear() {
        this[0] = 1;
        this[1] = 0;
        this[2] = 0;
        this[3] = 0;
        this[4] = 0;
        this[5] = 1;
        this[6] = 0;
        this[7] = 0;
        this[8] = 0;
        this[9] = 0;
        this[10] = 1;
        this[11] = 0;
        this[12] = 0;
        this[13] = 0;
        this[14] = 0;
        this[15] = 1;
    }

    public static translate(v: Vector3 = Vector3.zero): Matrix4 {
        return new this(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, v.getX(), v.getY(), v.getZ());
    }

    public static scale(v: Vector3 = new Vector3(1, 1, 1)): Matrix4 {
        return new this(v.getX(), 0, 0, 0, 0, v.getY(), 0, 0, 0, 0, v.getZ());
    }

    public static xRotation(r: number): Matrix4 {
        let s = Math.sin(r);
        let c = Math.cos(r);

        return new this(1, 0, 0, 0, 0, c, s, 0, 0, -s, c);
    }

    public static yRotation(r: number): Matrix4 {
        let s = Math.sin(r);
        let c = Math.cos(r);

        return new this(c, 0, -s, 0, 0, 1, 0, 0, s, 0, c, 0, 0, 0, 0, 1);
    }

    public static zRotation(r: number): Matrix4 {
        let s = Math.sin(r);
        let c = Math.cos(r);

        return new this(c, s, 0, 0, -s, c, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
    }

    public static projection(
        fieldOfViewInRadians: number = 0,
        aspect: number = 0,
        near: number = 0.1,
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

    public static inverse(m: Matrix4) {
        let m00 = m[0];
        let m01 = m[1];
        let m02 = m[2];
        let m03 = m[3];
        let m10 = m[4];
        let m11 = m[5];
        let m12 = m[6];
        let m13 = m[7];
        let m20 = m[8];
        let m21 = m[9];
        let m22 = m[10];
        let m23 = m[11];
        let m30 = m[12];
        let m31 = m[13];
        let m32 = m[14];
        let m33 = m[15];

        let tmp_0 = m22 * m33;
        let tmp_1 = m32 * m23;
        let tmp_2 = m12 * m33;
        let tmp_3 = m32 * m13;
        let tmp_4 = m12 * m23;
        let tmp_5 = m22 * m13;
        let tmp_6 = m02 * m33;
        let tmp_7 = m32 * m03;
        let tmp_8 = m02 * m23;
        let tmp_9 = m22 * m03;
        let tmp_10 = m02 * m13;
        let tmp_11 = m12 * m03;
        let tmp_12 = m20 * m31;
        let tmp_17 = m20 * m11;
        let tmp_18 = m00 * m31;
        let tmp_19 = m30 * m01;
        let tmp_20 = m00 * m21;
        let tmp_21 = m20 * m01;
        let tmp_22 = m00 * m11;
        let tmp_23 = m10 * m01;
        let tmp_13 = m30 * m21;
        let tmp_14 = m10 * m31;
        let tmp_15 = m30 * m11;
        let tmp_16 = m10 * m21;

        let t0 = tmp_0 * m11 + tmp_3 * m21 + tmp_4 * m31 - (tmp_1 * m11 + tmp_2 * m21 + tmp_5 * m31);
        let t1 = tmp_1 * m01 + tmp_6 * m21 + tmp_9 * m31 - (tmp_0 * m01 + tmp_7 * m21 + tmp_8 * m31);
        let t2 = tmp_2 * m01 + tmp_7 * m11 + tmp_10 * m31 - (tmp_3 * m01 + tmp_6 * m11 + tmp_11 * m31);
        let t3 = tmp_5 * m01 + tmp_8 * m11 + tmp_11 * m21 - (tmp_4 * m01 + tmp_9 * m11 + tmp_10 * m21);

        let d = 1.0 / (m00 * t0 + m10 * t1 + m20 * t2 + m30 * t3);

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

    public static transpose(m: Matrix4) {
        return new Matrix4(
            m[0],
            m[4],
            m[8],
            m[12],
            m[1],
            m[5],
            m[9],
            m[13],
            m[2],
            m[6],
            m[10],
            m[14],
            m[3],
            m[7],
            m[11],
            m[15],
        );
    }

    public static multiply(a: Matrix4, b: Matrix4): Matrix4 {
        let t00 = a[0];
        let t01 = a[1];
        let t02 = a[2];

        let t10 = a[4];
        let t11 = a[5];
        let t12 = a[6];

        let t20 = a[8];
        let t21 = a[9];
        let t22 = a[10];

        let t30 = a[12];
        let t31 = a[13];
        let t32 = a[14];

        let b00 = b[0];
        let b01 = b[1];
        let b02 = b[2];
        let b03 = b[3];

        let b10 = b[4];
        let b11 = b[5];
        let b12 = b[6];
        let b13 = b[7];

        let b20 = b[8];
        let b21 = b[9];
        let b22 = b[10];
        let b23 = b[11];

        let b30 = b[12];
        let b31 = b[13];
        let b32 = b[14];
        let b33 = b[15];

        return new Matrix4(
            b00 * t00 + b01 * t10 + b02 * t20 + b03 * t30,
            b00 * t01 + b01 * t11 + b02 * t21 + b03 * t31,
            b00 * t02 + b01 * t12 + b02 * t22 + b03 * t32,
            0,
            b10 * t00 + b11 * t10 + b12 * t20 + b13 * t30,
            b10 * t01 + b11 * t11 + b12 * t21 + b13 * t31,
            b10 * t02 + b11 * t12 + b12 * t22 + b13 * t32,
            0,
            b20 * t00 + b21 * t10 + b22 * t20 + b23 * t30,
            b20 * t01 + b21 * t11 + b22 * t21 + b23 * t31,
            b20 * t02 + b21 * t12 + b22 * t22 + b23 * t32,
            0,
            b30 * t00 + b31 * t10 + b32 * t20 + b33 * t30,
            b30 * t01 + b31 * t11 + b32 * t21 + b33 * t31,
            b30 * t02 + b31 * t12 + b32 * t22 + b33 * t32,
            1,
        );
    }

    public static multiplyFromArray(...args: Matrix4[]): Matrix4 {
        let m = args[0];

        let l = args.length - 1;

        for (let i = 0; i < l; i++) {
            m.multiply(args[i + 1]);
        }

        return m;
    }

    public static multipleVectorOnMatrix(v: Vector3, m: Matrix4): Vector3 {
        return new Vector3(
            m[0] * v.getX() + m[1] * v.getY() + m[2] + v.getZ(),
            m[4] * v.getX() + m[5] * v.getY() + m[10] + v.getZ(),
            m[8] * v.getX() + m[9] * v.getY() + m[12] + v.getZ(),
        );
    }

    public static lookAt(position: Vector3, target: Vector3, up: Vector3) {
        let z = Vector3.normalize(Vector3.subtract(position, target));
        let x = Vector3.normalize(Vector3.cross(up, z));
        let y = Vector3.normalize(Vector3.cross(z, x));

        return new Matrix4(
            x.getX(), x.getY(), x.getZ(), 0,
            y.getX(), y.getY(), y.getZ(), 0,
            z.getX(), z.getY(), z.getZ(), 0,
            position.getX(), position.getY(), position.getZ(), 1,
        );
    }

    public static clone(m: Matrix4) {
        return new Matrix4(
            m[0], m[1], m[2], m[3], m[4], m[5], m[6], m[7], m[8], m[9], m[10], m[11], m[12], m[13], m[14], m[15],
        );
    }
}