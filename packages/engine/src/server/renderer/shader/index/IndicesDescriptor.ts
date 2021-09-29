import { TypeDraw, VertexAttributeFormat } from '../attribute/VertexAttributeDescriptor';

export default class IndicesDescriptor {
    constructor(public readonly type: VertexAttributeFormat, public readonly typeDraw: TypeDraw) {}
}
