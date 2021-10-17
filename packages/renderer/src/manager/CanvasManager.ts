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
        this._width = value;

        this.canvas.width = value;
    }

    public get height(): number {
        return this._height;
    }

    public set height(value: number) {
        this._height = value;

        this.canvas.height = value;
    }

    constructor(settings: ICanvasManagerSettings) {
        this.canvas = settings.canvas;

        this.width = settings.width ?? this.canvas.width;
        this.height = settings.height ?? this.canvas.height;
    }

    public getContext(id: 'webgl' | 'webgl2'): RenderingContext | null {
        return this.canvas.getContext(id);
    }
}
