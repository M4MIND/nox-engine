import RendererServer from '../../RendererServer';
import IContext from '../../manager/context/IContext';

export default abstract class UniformBase {
    protected readonly _index: string;
    protected values: Float32Array = new Float32Array();
    protected readonly context: IContext;
    protected readonly _serialized: boolean;

    public get serialized(): boolean {
        return this._serialized;
    }

    public get index(): string {
        return this._index;
    }

    constructor(index: string, serialized: boolean) {
        this._index = index;
        this._serialized = serialized;
        this.context = RendererServer.contextManager.context;
    }

    public get(): Float32Array {
        return this.values;
    }

    public set(v: number[]): void {
        if (v.length !== this.values.length) {
            this.values = new Float32Array(v);

            return;
        }

        this.values.set(v);
    }

    public abstract bind(index: WebGLUniformLocation): void;
}
