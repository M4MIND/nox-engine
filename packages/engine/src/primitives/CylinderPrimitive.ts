import {GameObject} from "../core/object/GameObject";
import {Scene} from "../core/sceneManagment/Scene";
import {CylinderMesh} from "../meshes/CylinderMesh";
import { MeshFilterComponent } from "../components/mesh/MeshFilterComponent";
import { MeshRendererComponent } from "../components/mesh/MeshRendererComponent";

export class CylinderPrimitive extends GameObject {
    constructor() {
        super();

        this.addComponent<MeshFilterComponent>(MeshFilterComponent).mesh = new CylinderMesh();
        this.addComponent<MeshRendererComponent>(MeshRendererComponent);
    }
}