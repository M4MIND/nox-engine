import UniformBase from './UniformBase';

export default class Uniform4fv extends UniformBase {
    public bind(index: WebGLUniformLocation): void {
        this.context.uniform4fv(index, this.values);
    }
}
