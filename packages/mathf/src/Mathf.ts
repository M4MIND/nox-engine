export default class Mathf {
    public static rad2deg = 0.017453292519943295;
    public static deg2rad = 57.29577951308232;

    public static clamp(number: number,min: number, max: number): number {
        return Math.min(Math.max(number, min), max);
    }
}