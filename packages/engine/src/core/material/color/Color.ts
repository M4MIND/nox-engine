export default class Color extends Array {
    public static black: Color = new Color(0, 0, 0);
    public static white: Color = new Color(1, 1, 1);

    constructor(public r = 1, public g = 1, public b = 1, public a = 1) {
        super(4);

        this[0] = r;
        this[1] = g;
        this[2] = b;
        this[3] = a;
    }
}
