import Shader from "./Shader";
import RendererServer from "../../RendererServer";
import ShaderAttribute from "./attribute/ShaderAttribute";
import ShaderUniform from "./uniform/ShaderUniform";

export default class VertexShader extends Shader {
    public readonly attributes: {[index: string]: ShaderAttribute} = {};
    public readonly uniforms: {[index: string]: ShaderUniform} = {};

    constructor(code: string) {
        super(code, RendererServer.contextManager.context.VERTEX_SHADER);
    }
}