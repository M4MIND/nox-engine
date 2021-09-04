import RendererServer from "../../../RendererServer";
import Program from "../../../program/Program";

export default abstract class ShaderUniform {
    public readonly name: string;
    public readonly buffer: WebGLBuffer;
    protected values: number[] = [];

    constructor(name: string) {
        this.name = name;
        this.buffer = RendererServer.contextManager.context.createBuffer() as WebGLBuffer;
    }

    public abstract updateUniform(program: Program): void;

    public set(v: number[]) {
        this.values = v;
    };
}
