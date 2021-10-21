import RendererServer from '../../RendererServer';
import { GL_BUFFERS_TARGET, GL_BUFFERS_USAGE } from '../../_webgl_consts';

export default class BufferWrapper {
    private buffer: WebGLBuffer;

    constructor() {
        this.buffer = RendererServer.contextManager.context.createBuffer() as WebGLBuffer;
    }

    public bind(target: GL_BUFFERS_TARGET) {
        RendererServer.contextManager.context.bindBuffer(target, this.buffer);
    }

    public unbind(target: GL_BUFFERS_TARGET) {
        RendererServer.contextManager.context.bindBuffer(target, null);
    }

    public setData(target: GL_BUFFERS_TARGET, data: ArrayBufferView, usage: GL_BUFFERS_USAGE) {
        RendererServer.contextManager.context.bufferData(target, data, usage);
    }
}
