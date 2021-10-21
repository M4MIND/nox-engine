import Mesh from '../graphics/mesh/Mesh';
import { Vector3 } from '@nox-engine/mathf';

export default class Cube extends Mesh {
    constructor() {
        super();

        this.vertices = [
            new Vector3(0.5, -0.5, 0.5),
            new Vector3(-0.5, -0.5, 0.5),
            new Vector3(0.5, 0.5, 0.5),
            new Vector3(-0.5, 0.5, 0.5),
            new Vector3(0.5, 0.5, -0.5),
            new Vector3(-0.5, 0.5, -0.5),
            new Vector3(0.5, -0.5, -0.5),
            new Vector3(-0.5, -0.5, -0.5),
            new Vector3(0.5, 0.5, 0.5),
            new Vector3(-0.5, 0.5, 0.5),
            new Vector3(0.5, 0.5, -0.5),
            new Vector3(-0.5, 0.5, -0.5),
            new Vector3(0.5, -0.5, -0.5),
            new Vector3(0.5, -0.5, 0.5),
            new Vector3(-0.5, -0.5, 0.5),
            new Vector3(-0.5, -0.5, -0.5),
            new Vector3(-0.5, -0.5, 0.5),
            new Vector3(-0.5, 0.5, 0.5),
            new Vector3(-0.5, 0.5, -0.5),
            new Vector3(-0.5, -0.5, -0.5),
            new Vector3(0.5, -0.5, -0.5),
            new Vector3(0.5, 0.5, -0.5),
            new Vector3(0.5, 0.5, 0.5),
            new Vector3(0.5, -0.5, 0.5),
        ];

        this.normals = [
            new Vector3(0.0, 0.0, 1.0),
            new Vector3(0.0, 0.0, 1.0),
            new Vector3(0.0, 0.0, 1.0),
            new Vector3(0.0, 0.0, 1.0),
            new Vector3(0.0, 1.0, 0.0),
            new Vector3(0.0, 1.0, 0.0),
            new Vector3(0.0, 0.0, -1.0),
            new Vector3(0.0, 0.0, -1.0),
            new Vector3(0.0, 1.0, 0.0),
            new Vector3(0.0, 1.0, 0.0),
            new Vector3(0.0, 0.0, -1.0),
            new Vector3(0.0, 0.0, -1.0),
            new Vector3(0.0, -1.0, 0.0),
            new Vector3(0.0, -1.0, 0.0),
            new Vector3(0.0, -1.0, 0.0),
            new Vector3(0.0, -1.0, 0.0),
            new Vector3(-1.0, 0.0, 0.0),
            new Vector3(-1.0, 0.0, 0.0),
            new Vector3(-1.0, 0.0, 0.0),
            new Vector3(-1.0, 0.0, 0.0),
            new Vector3(1.0, 0.0, 0.0),
            new Vector3(1.0, 0.0, 0.0),
            new Vector3(1.0, 0.0, 0.0),
            new Vector3(1.0, 0.0, 0.0),
        ];
        this.triangles = [
            0, 2, 3, 0, 3, 1, 8, 4, 5, 8, 5, 9, 10, 6, 7, 10, 7, 11, 12, 13, 14, 12, 14, 15, 16, 17, 18, 16, 18, 19, 20,
            21, 22, 20, 22, 23,
        ];
    }
}
