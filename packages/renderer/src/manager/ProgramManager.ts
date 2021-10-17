import RendererServer from '../RendererServer';
import { GL_SHADERS } from '../_webgl_consts';
import Hash from '../utils/Hash';
import ContextManager from './ContextManager';
import GpuProgram from './program/GpuProgram';

export default class ProgramManager {
    private program: Map<number, GpuProgram> = new Map<number, GpuProgram>();
    private contextManager: ContextManager = RendererServer.contextManager;
    private _activeProgram: GpuProgram | undefined;

    public get activeProgram(): GpuProgram | undefined {
        return this._activeProgram;
    }

    public set activeProgram(value: GpuProgram | undefined) {
        this._activeProgram = value;
    }

    public get(vertex: string, fragment: string): GpuProgram {
        let id = Hash.generate(`${Hash.generate(vertex)}${Hash.generate(fragment)}`);

        if (this.program.has(id)) {
            return this.program.get(id) as GpuProgram;
        }

        let program = this.contextManager.createProgram();

        let vertexShader = this.contextManager.compileShader(GL_SHADERS.VERTEX_SHADER, vertex);
        let fragmentShader = this.contextManager.compileShader(GL_SHADERS.FRAGMENT_SHADER, fragment);

        this.contextManager.attachShader(program, vertexShader);
        this.contextManager.attachShader(program, fragmentShader);

        this.contextManager.context.linkProgram(program);

        if (!this.contextManager.context.getProgramParameter(program, GL_SHADERS.LINK_STATUS)) {
            throw new Error(
                `Could not compile WebGL program\n${this.contextManager.context.getProgramInfoLog(program)}`,
            );
        }

        return new GpuProgram(id, program);
    }
}
