import RendererServer from "../../../RendererServer";
import ShaderAttribute from "./ShaderAttribute";
import Program from "../../../program/Program";

export default class ArrayFloat32Attribute extends ShaderAttribute {
    updateBuffer(): void {
        this.buffer.bind(RendererServer.contextManager.context.ARRAY_BUFFER)
        this.buffer.setData(RendererServer.contextManager.context.ARRAY_BUFFER, new Float32Array(this.values), RendererServer.contextManager.context.STATIC_DRAW);
        this.buffer.unbind(RendererServer.contextManager.context.ARRAY_BUFFER);
    }

    public bindBuffer(program: Program): void {
        this.buffer.bind(RendererServer.contextManager.context.ARRAY_BUFFER);
        RendererServer.contextManager.context.vertexAttribPointer(program.getAttributeLocation(this), this.size, RendererServer.contextManager.context.FLOAT, false, 0, 0);
        RendererServer.contextManager.context.enableVertexAttribArray(program.getAttributeLocation(this));
        this.buffer.unbind(RendererServer.contextManager.context.ARRAY_BUFFER);
    }
}