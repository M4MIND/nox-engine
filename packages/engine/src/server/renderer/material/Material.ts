import ShaderWrapper from "./shader/ShaderWrapper";
import RendererServer from "../RendererServer";
import Program from "../program/Program";

export default class Material {
    public readonly program: Program;
    public readonly shader: ShaderWrapper;

    constructor(shader: ShaderWrapper) {
        this.program = RendererServer.programManger.createProgram(shader);
        this.shader = shader;

        this.program.link();
    }
}