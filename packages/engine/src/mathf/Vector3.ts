export class Vector3 extends Array<number> {
    constructor(public x: number = 0, public y: number = 0, public z: number = 0) {
        super(x, y, z);
    }
}