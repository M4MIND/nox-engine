import { Vector3 } from './../../math/Vector3';
import { Mesh } from "../component/mesh/Mesh";

export class Cube extends Mesh {
    constructor() {
        super();

        this.$vetecies = [
            // Front face
            new Vector3(-1.0, -1.0, 1.0),
            new Vector3(1.0, -1.0, 1.0),
            new Vector3(1.0, 1.0, 1.0),
            new Vector3(-1.0, 1.0, 1.0),

            // Back face
            new Vector3(-1.0, -1.0, -1.0),
            new Vector3(-1.0, 1.0, -1.0),
            new Vector3(1.0, 1.0, -1.0),
            new Vector3(1.0, -1.0, -1.0),

            // Top face
            new Vector3(-1.0, 1.0, -1.0),
            new Vector3(-1.0, 1.0, 1.0),
            new Vector3(1.0, 1.0, 1.0),
            new Vector3(1.0, 1.0, -1.0),

            // Bottom face
            new Vector3(-1.0, -1.0, -1.0),
            new Vector3(1.0, -1.0, -1.0),
            new Vector3(1.0, -1.0, 1.0),
            new Vector3(-1.0, -1.0, 1.0),

            // Right face
            new Vector3(1.0, -1.0, -1.0),
            new Vector3(1.0, 1.0, -1.0),
            new Vector3(1.0, 1.0, 1.0),
            new Vector3(1.0, -1.0, 1.0),

            // Left face
            new Vector3(-1.0, -1.0, -1.0),
            new Vector3(-1.0, -1.0, 1.0),
            new Vector3(-1.0, 1.0, 1.0),
            new Vector3(-1.0, 1.0, -1.0),
        ];

        this.$triangles = [
            0, 1, 2, 0, 2, 3,    // front
            4, 5, 6, 4, 6, 7,    // back
            8, 9, 10, 8, 10, 11,   // top
            12, 13, 14, 12, 14, 15,   // bottom
            16, 17, 18, 16, 18, 19,   // right
            20, 21, 22, 20, 22, 23,   // left
        ];
    }
}