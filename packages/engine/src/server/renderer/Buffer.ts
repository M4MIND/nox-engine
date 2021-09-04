import {RendererServer} from "../../../index";

export default class Buffer {
    private buffer: WebGLBuffer;

    constructor() {
        this.buffer = RendererServer.contextManager.createBuffer();
    }

    public bind(target: GLenum):void {
        RendererServer.contextManager.context.bindBuffer(target, this.buffer)
    }

    public setData(target: GLenum, data: BufferSource, usage: GLenum) {
        RendererServer.contextManager.context.bufferData(target, data, usage);
    }

    public unbind(target: GLenum) {
        RendererServer.contextManager.context.bindBuffer(target, null);
    }
}