import { Mesh } from "../components/mesh/Mesh";
import { Vector3 } from "../mathf/Vector3";

export class PlaneMesh extends Mesh {
    constructor() {
        super();

        this.vertexes = [
            new Vector3(-1.000000, 0.000000, 1.000000),
            new Vector3(1.000000, 0.000000, 1.000000),
            new Vector3(-1.000000, 0.000000, -1.000000),
            new Vector3(1.000000, 0.000000, -1.000000),
        ]

        this.triangles = [
            0, 1, 3,
            0, 3, 2
        ]
    }
}