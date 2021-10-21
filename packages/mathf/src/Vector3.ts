export default class Vector3 extends Array<number> {
    constructor(public x: number = 0, public y: number = 0, public z: number = 0) {
        super(x, y, z);
    }

    public static normalize(v: Vector3) {
        let l = Math.sqrt(v.x * v.x + v.y * v.y + v.z * v.z);
        return new Vector3(v.x / l, v.y / l, v.z / l);
    }

    public normalize(): this {
        let l = Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);

        this.x /= l;
        this.y /= l;
        this.z /= l;

        return this;
    }
}
