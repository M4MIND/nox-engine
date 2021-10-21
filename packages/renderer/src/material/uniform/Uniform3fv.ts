import RendererServer from '../../RendererServer';
import BaseUniformDescriptor from './BaseUniformDescriptor';

export default class Uniform3fv extends BaseUniformDescriptor {
    constructor(index: string) {
        super(index, 3);
    }

    public set(value: number[]) {
        if (value.length !== 3) {
            throw new Error(``);
        }

        super.set(value);
    }

    public use() {
        let uniformLocation = this.getUniformLocation();

        if (!uniformLocation) {
            return;
        }

        RendererServer.contextManager.context.uniform3vf(uniformLocation, this.value);
    }
}
