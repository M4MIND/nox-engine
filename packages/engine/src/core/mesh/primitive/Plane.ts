import Vector3 from '../../../mathf/Vector3';
import Mesh from '../Mesh';

export default class Plane extends Mesh {
    constructor() {
        super();

        this.vertices = [
            new Vector3(-0.5, -0.5, 0),
            new Vector3(0.5, -0.5, 0),
            new Vector3(-0.5, 0.5, 0),
            new Vector3(0.5, 0.5, 0),
        ];
        this.normals = [
            new Vector3(0.0, 0.0, -1.0),
            new Vector3(0.0, 0.0, -1.0),
            new Vector3(0.0, 0.0, -1.0),
            new Vector3(0.0, 0.0, -1.0),
        ];
        this.indices = [0, 3, 1, 3, 0, 2];
    }
}
