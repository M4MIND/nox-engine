import {GameObject} from "../core/object/GameObject";
import {MeshFilterComponent} from "../components/mesh/MeshFilterComponent";
import {MeshRendererComponent} from "../components/mesh/MeshRendererComponent";
import {CubeMesh} from "../meshes/CubeMesh";
import { Material } from "../components/mesh/Material";

export class CubePrimitive extends GameObject {
    constructor() {
        super();

        this.addComponent<MeshFilterComponent>(MeshFilterComponent).mesh = new CubeMesh();
        this.addComponent<MeshRendererComponent>(MeshRendererComponent).material = new Material();
    }
}