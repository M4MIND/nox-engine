import RendererServer from '../../RendererServer';
import {
    ARRAY_CLASSES,
    TargetAttribute,
    TypeDraw,
    VertexAttributeFormat,
} from '../attribute/VertexAttributeDescriptor';

const Map: { [key in VertexAttributeFormat]?: any } = {
    [VertexAttributeFormat.Float32]: Float32Array,
};

export default class WebGLBuffer {
    get isActive(): boolean {
        return this._isActive;
    }

    constructor(
        public readonly name: string,
        private values: number[] = [],
        private webGlBuffer = RendererServer.contextManager.context.createBuffer(),
        private _isActive: boolean = false,
    ) {}

    public updateBuffer(target: TargetAttribute, srcData: VertexAttributeFormat, usage: TypeDraw) {
        RendererServer.contextManager.context.bufferData(target, new ARRAY_CLASSES[srcData](this.values), usage);
    }

    public bind(target: TargetAttribute) {
        RendererServer.contextManager.context.bindBuffer(target, this.webGlBuffer);
    }

    public set(v: number[]) {
        this.values = v;

        this._isActive = false;
    }

    public get() {
        return this.values;
    }
}
