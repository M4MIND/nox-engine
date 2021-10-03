import RendererServer from '../../RendererServer';
import IContext from '../../manager/context/IContext';

export default abstract class UniformBase {
    protected readonly _index: string;
    protected values: number[] = [];
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

    public get(): number[] {
        return this.values;
    }

    public set(v: number[]): void {
        this.values = v;
    }

    public abstract bind(index: WebGLUniformLocation): void;
}
