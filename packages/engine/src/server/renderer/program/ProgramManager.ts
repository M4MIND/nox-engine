import Program from "./Program";
import ShaderWrapper from "../material/shader/ShaderWrapper";
import RendererServer from "../RendererServer";

interface IPrograms {
    [index: string]: Program
}

export default class ProgramManager {
    private programs: IPrograms = {};

    public createProgram(shader: ShaderWrapper) {
        let key = btoa(shader.vertexShader.code + shader.fragmentShader.code);

        if (!this.programs[key]) {
            this.programs[key] = new Program(RendererServer.contextManager.createProgram(), key);
            this.programs[key].attachShader(shader.vertexShader);
            this.programs[key].attachShader(shader.fragmentShader);
        }

        return this.programs[key];
    }
}