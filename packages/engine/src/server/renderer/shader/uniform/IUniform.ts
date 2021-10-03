import Uniform4fv from './Uniform4fv';
import UniformBase from './UniformBase';
import UniformMatrix4x4 from './UniformMatrix4x4';

export enum UniformType {
    Matrix4x4,
    Fv4,
}

export const UNIFORM_CLASSES: { [index: number]: IUniform } = {
    [UniformType.Matrix4x4]: UniformMatrix4x4,
    [UniformType.Fv4]: Uniform4fv,
};

export default interface IUniform {
    new (index: string, serialized: boolean): UniformBase;
}
