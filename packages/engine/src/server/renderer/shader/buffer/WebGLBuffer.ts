import RendererServer from '../../RendererServer';
import {
    ARRAY_CLASSES,
    VertexTypeUsage,
    VertexAttributeSrcData,
    VertexTargetAttribute,
} from '../attribute/VertexAttributeDescriptor';

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

    public updateBuffer(target: VertexTargetAttribute, srcData: VertexAttributeSrcData, usage: VertexTypeUsage) {
        RendererServer.contextManager.context.bufferData(target, new ARRAY_CLASSES[srcData](this.values), usage);
    }

    public bind(target: VertexTargetAttribute) {
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
