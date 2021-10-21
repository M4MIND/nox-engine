import { GL_BUFFERS_TARGET, GL_BUFFERS_USAGE } from '../../_webgl_consts';
import BufferWrapper from '../buffer/BufferWrapper';

export default class IndicesDescriptor {
    private data: Uint16Array = new Uint16Array();
    private buffer: BufferWrapper;
    private _dataLength: number = 0;

    public get dataLength(): number {
        return this._dataLength;
    }

    constructor() {
        this.buffer = new BufferWrapper();
    }

    public bind() {
        this.buffer.bind(GL_BUFFERS_TARGET.ELEMENT_ARRAY_BUFFER);
    }

    public unbind() {
        this.buffer.unbind(GL_BUFFERS_TARGET.ELEMENT_ARRAY_BUFFER);
    }

    public set(value: number[]) {
        if (value.length !== this._dataLength) {
            this.data = new Uint16Array(value);
            this._dataLength = value.length;
        } else {
            this.data.set(value);
        }

        this.bind();
        this.buffer.setData(GL_BUFFERS_TARGET.ELEMENT_ARRAY_BUFFER, this.data, GL_BUFFERS_USAGE.STATIC_DRAW);
        this.unbind();
    }
}
