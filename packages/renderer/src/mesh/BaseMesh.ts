import AttributeDescriptor, { AttributeDescriptorFormat } from './descriptor/AttributeDescriptor';
import IndicesDescriptor from './descriptor/IndicesDescriptor';

export default class BaseMesh {
    private attributeDescriptors: Map<string, AttributeDescriptor> = new Map<string, AttributeDescriptor>();
    private indicesDescriptor: IndicesDescriptor = new IndicesDescriptor();

    public setAttributeDescriptor(attributeDescriptor: AttributeDescriptor) {
        if (!this.hasAttributeDescriptor(attributeDescriptor.index)) {
            this.attributeDescriptors.set(attributeDescriptor.index, attributeDescriptor);
        }

        return attributeDescriptor;
    }

    public hasAttributeDescriptor(index: string): boolean {
        return this.attributeDescriptors.has(index);
    }

    public createAttributeDescriptor(
        index: string,
        srcType: AttributeDescriptorFormat,
        size: number,
        normalize: boolean = false,
        stride: number = 0,
        offset: number = 0,
    ): AttributeDescriptor {
        return this.setAttributeDescriptor(new AttributeDescriptor(index, srcType, size, normalize, stride, offset));
    }

    public getAttributeDescriptor(index: string): AttributeDescriptor | undefined {
        return this.attributeDescriptors.get(index);
    }

    public use() {
        for (let attr of this.attributeDescriptors.values()) {
            attr.bind();
            attr.vertexAttribPointer();
            attr.enableVertexAttribArray();
        }
    }
}
