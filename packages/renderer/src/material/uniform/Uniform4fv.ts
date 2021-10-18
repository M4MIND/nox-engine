import RendererServer from '../../RendererServer';
import BaseUniformDescriptor from './BaseUniformDescriptor';

export default class Uniform4fv extends BaseUniformDescriptor {
    constructor(index: string) {
        super(index, 4);
    }

    public set(value: number[]) {
        if (value.length !== 4) {
            throw new Error(``);
        }

        super.set(value);
    }

    public use() {
        let uniformLocation = this.getUniformLocation();

        if (!uniformLocation) {
            return;
        }

        RendererServer.contextManager.context.uniform4fv(uniformLocation, this.value);
    }
}
