export default class Color extends Array<number> {
    public static black: Color = new Color(0, 0, 0, 1);
    public static blue = new Color(0, 0, 0, 1);
    public static cyan = new Color(0, 1, 1, 1);
    public static gray: Color = new Color(0.5, 0.5, 0.5, 1);
    public static green = new Color(0, 1, 0, 1);
    public static magenta = new Color(1, 0, 1, 1);
    public static red = new Color(1, 0, 0, 1);
    public static white = new Color(1, 1, 1, 1);
    public static yellow = new Color(1, 0.92, 0.016, 1);

    constructor(r = 0, g = 0, b = 0, a = 1) {
        super();

        this[0] = r;
        this[1] = g;
        this[2] = b;
        this[3] = a;
    }
}
