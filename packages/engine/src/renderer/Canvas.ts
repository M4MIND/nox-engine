export class Canvas {
    private _width: number;
    private _height: number;

    get width(): number {
        return this._width;
    }

    get height(): number {
        return this._height;
    }

    constructor(private canvas: HTMLCanvasElement) {
        this._width = canvas.width;
        this._height = canvas.height;
    }

    setViewport(w: number, h: number) {
        this._width = w;
        this._height = h;

        this.canvas.width = w;
        this.canvas.height = h;
    }
}