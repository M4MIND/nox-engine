import RendererServer from '../RendererServer';
import Program from '../manager/program/Program';

export default class BaseShader {
    public readonly program: Program | null = null;

    constructor(vertex: string | null, fragment: string | null) {
        this.program = RendererServer.programManager.get(
            RendererServer.shaderManager.parser.compile(vertex),
            RendererServer.shaderManager.parser.compile(fragment),
        );
    }

    public static find(name: string): string | null {
        return RendererServer.shaderManager.library.get(name);
    }

    use(): boolean {
        if (this.program) {
            this.program.use();

            return true;
        }

        return false;
    }
}
