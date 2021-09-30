import { VertexAttributeSrcData, VertexTargetAttribute, VertexTypeUsage } from '../attribute/VertexAttributeDescriptor';

export default class IndicesDescriptor {
    constructor(
        public readonly index: string,
        public readonly type: VertexAttributeSrcData,
        public readonly typeDraw: VertexTypeUsage,
        public readonly target: VertexTargetAttribute = VertexTargetAttribute.ElementArrayBuffer,
    ) {}
}
