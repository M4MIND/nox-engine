export default class Vector4 extends Array<number> {
    constructor(public x: number = 0, public y: number = 0, public z: number = 0, public w: number = 1) {
        super(x, y, z, w);
    }
}
