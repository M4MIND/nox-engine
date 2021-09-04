import Canvas from "./Canvas";

export default class CanvasManager {
    public readonly canvas: Canvas;
    constructor(canvas: HTMLCanvasElement) {
        this.canvas = new Canvas(canvas);
    }
}