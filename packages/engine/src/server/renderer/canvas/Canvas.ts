export default class Canvas {
    private canvas: HTMLCanvasElement;
    private _width: number;
    private _height: number;

    get width(): number {
        return this._width;
    }

    set width(value: number) {
        this._width = value;
        this.canvas.width = value;
    }

    get height(): number {
        return this._height;
    }

    set height(value: number) {
        this._height = value;
        this.canvas.height = value;
    }

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this._width = canvas.width;
        this._height = canvas.height;
    }

    public setViewport(width: number = 350, height: number = 150) {
        this.width = width;
        this.height = height;
    }

    public getWebGlContext() {
        return this.canvas.getContext("webgl");
    }

    public getWebGl2Context() {
        return this.canvas.getContext("webgl2")
    }
}