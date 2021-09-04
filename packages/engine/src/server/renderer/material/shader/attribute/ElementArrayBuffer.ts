import ShaderAttribute from "./ShaderAttribute";
import Program from "../../../program/Program";
import RendererServer from "../../../RendererServer";

export default class ElementArrayBuffer extends ShaderAttribute {
    bindBuffer(program: Program): void {
    }

    updateBuffer(): void {
        this.buffer.bind(RendererServer.contextManager.context.ELEMENT_ARRAY_BUFFER);
        this.buffer.setData(RendererServer.contextManager.context.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.values), RendererServer.contextManager.context.STATIC_DRAW);
    }
}