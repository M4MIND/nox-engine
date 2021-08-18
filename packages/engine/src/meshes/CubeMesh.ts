import {Mesh} from "../components/mesh/Mesh";
import {Vector3} from "../mathf/Vector3";

export class CubeMesh extends Mesh {
    constructor() {
        super();

        this.vertexes = [
            new Vector3(1.000000, 1.000000, -1.000000),
            new Vector3(1.000000, -1.000000, -1.000000),
            new Vector3(1.000000, 1.000000, 1.000000),
            new Vector3(1.000000, -1.000000, 1.000000),
            new Vector3(-1.000000, 1.000000, -1.000000),
            new Vector3(-1.000000, -1.000000, -1.000000),
            new Vector3(-1.000000, 1.000000, 1.000000),
            new Vector3(-1.000000, -1.000000, 1.000000),
        ]
    }
}