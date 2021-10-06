import Mesh from '../Mesh';
import Cube from './Cube';
import Plane from './Plane';
import Quad from './Quad';
import Sphere from './Sphere';

export enum PrimitiveType {
    Cube,
    Sphere,
    Plane,
    Quad,
}

export const PrimitiveClasses: { [index: number]: new () => Mesh } = {
    [PrimitiveType.Cube]: Cube,
    [PrimitiveType.Sphere]: Sphere,
    [PrimitiveType.Plane]: Plane,
    [PrimitiveType.Quad]: Quad,
};
