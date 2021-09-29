export default class Vector3 extends Array {
    constructor(public x: number = 0, public y: number = 0, public z: number = 0) {
        super(3);
    }
}
