import Vector3 from '../../../mathf/Vector3';
import Mesh from '../Mesh';

export default class Cube extends Mesh {
    constructor() {
        super();

        this.vertices = [
            new Vector3(-0.5, -0.5, 0.5),
            new Vector3(0.5, -0.5, 0.5),
            new Vector3(0.5, 0.5, 0.5),
            new Vector3(-0.5, 0.5, 0.5),
            new Vector3(-0.5, -0.5, -0.5),
            new Vector3(-0.5, 0.5, -0.5),
            new Vector3(0.5, 0.5, -0.5),
            new Vector3(0.5, -0.5, -0.5),
            new Vector3(-0.5, 0.5, -0.5),
            new Vector3(-0.5, 0.5, 0.5),
            new Vector3(0.5, 0.5, 0.5),
            new Vector3(0.5, 0.5, -0.5),
            new Vector3(-0.5, -0.5, -0.5),
            new Vector3(0.5, -0.5, -0.5),
            new Vector3(0.5, -0.5, 0.5),
            new Vector3(-0.5, -0.5, 0.5),
            new Vector3(0.5, -0.5, -0.5),
            new Vector3(0.5, 0.5, -0.5),
            new Vector3(0.5, 0.5, 0.5),
            new Vector3(0.5, -0.5, 0.5),
            new Vector3(-0.5, -0.5, -0.5),
            new Vector3(-0.5, -0.5, 0.5),
            new Vector3(-0.5, 0.5, 0.5),
            new Vector3(-0.5, 0.5, -0.5),
        ];

        this.normals = [
            // Front
            new Vector3(0.0, 0.0, 1.0),
            new Vector3(0.0, 0.0, 1.0),
            new Vector3(0.0, 0.0, 1.0),
            new Vector3(0.0, 0.0, 1.0),

            // Back
            new Vector3(0.0, 0.0, -1.0),
            new Vector3(0.0, 0.0, -1.0),
            new Vector3(0.0, 0.0, -1.0),
            new Vector3(0.0, 0.0, -1.0),

            // Top
            new Vector3(0.0, 1.0, 0.0),
            new Vector3(0.0, 1.0, 0.0),
            new Vector3(0.0, 1.0, 0.0),
            new Vector3(0.0, 1.0, 0.0),

            // Bottom
            new Vector3(0.0, -1.0, 0.0),
            new Vector3(0.0, -1.0, 0.0),
            new Vector3(0.0, -1.0, 0.0),
            new Vector3(0.0, -1.0, 0.0),

            // Right
            new Vector3(1.0, 0.0, 0.0),
            new Vector3(1.0, 0.0, 0.0),
            new Vector3(1.0, 0.0, 0.0),
            new Vector3(1.0, 0.0, 0.0),

            // Left
            new Vector3(-1.0, 0.0, 0.0),
            new Vector3(-1.0, 0.0, 0.0),
            new Vector3(-1.0, 0.0, 0.0),
            new Vector3(-1.0, 0.0, 0.0),
        ];

        this.indices = [
            0, 1, 2, 0, 2, 3, 4, 5, 6, 4, 6, 7, 8, 9, 10, 8, 10, 11, 12, 13, 14, 12, 14, 15, 16, 17, 18, 16, 18, 19, 20,
            21, 22, 20, 22, 23, 20, 21, 22, 20, 22, 23,
        ];
    }
}
