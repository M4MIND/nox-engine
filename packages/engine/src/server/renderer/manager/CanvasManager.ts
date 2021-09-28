export interface ICanvasManagerSettings {
    canvas: HTMLCanvasElement;
    width?: number;
    height?: number;
}

export default class CanvasManager {
    public readonly canvas: HTMLCanvasElement;
    private _width: number = 0;
    private _height: number = 0;

    public get width(): number {
        return this._width;
    }

    public set width(value: number) {
        this.canvas.width = value;
        this._width = value;
    }

    public get height(): number {
        return this._height;
    }

    public set height(value: number) {
        this.canvas.height = value;
        this._height = value;
    }

    constructor(settings: ICanvasManagerSettings) {
        this.canvas = settings.canvas;
        this.width = settings.width ?? settings.canvas.width;
        this.height = settings.height ?? settings.canvas.height;
    }

    setViewport(width: number, height: number) {
        this.width = width;
        this.height = height;
    }
}
