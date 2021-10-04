import Mesh from '../Mesh';
import Cube from './Cube';

export enum PrimitiveType {
    Cube,
}

export const PrimitiveClasses: { [index: number]: new () => Mesh } = {
    [PrimitiveType.Cube]: Cube,
};
