import UniformBase from './UniformBase';

export default class UniformMatrix4x4 extends UniformBase {
    public bind(index: WebGLUniformLocation): void {
        this.context.uniformMatrix4fv(index, this.serialized, this.values);
    }
}
