export default class Vector2 extends Array<number> {
    constructor(public x = 0, public y = 0) {
        super(x, y);
    }
}