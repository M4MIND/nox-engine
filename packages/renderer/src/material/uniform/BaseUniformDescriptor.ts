import RendererServer from '../../RendererServer';

export default class BaseUniformDescriptor {
    public readonly index: string;
    protected size: number;
    protected value: Float32Array;

    constructor(index: string, size: number) {
        this.index = index;
        this.size = size;
        this.value = new Float32Array(this.size);
    }

    public set(value: number[]) {
        if (value.length !== this.size) {
            this.value = new Float32Array(value);
            this.size = value.length;
        } else {
            this.value.set(value);
        }
    }

    protected getUniformLocation(): WebGLUniformLocation | undefined | null {
        return RendererServer.programManager.activeProgram?.getUniformLocation(this.index);
    }

    public use(): void {}
}
