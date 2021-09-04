import ShaderUniform from "./ShaderUniform";
import Program from "../../../program/Program";
import RendererServer from "../../../RendererServer";

export default class UniformMat4fv extends ShaderUniform {
    set(v: number[]): void {
        super.set(v);
    }

    updateUniform(program: Program): void {
        RendererServer.contextManager.context.uniformMatrix4fv(program.getUniformLocation(this), false, this.values);
    }
}