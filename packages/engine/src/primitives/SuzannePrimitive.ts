import { GameObject, MeshFilterComponent, MeshRendererComponent } from "../..";
import { Material } from "../components/mesh/Material";
import { SuzanneMesh } from "../meshes/SuzanneMesh";

export class SuzannePrimitive extends GameObject {
    constructor() {
        super();

        this.addComponent<MeshFilterComponent>(MeshFilterComponent).mesh = new SuzanneMesh();
        this.addComponent<MeshRendererComponent>(MeshRendererComponent).material = new Material();
    }
}