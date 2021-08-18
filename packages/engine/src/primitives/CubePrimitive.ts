import {GameObject} from "../object/GameObject";
import {MeshFilterComponent} from "../components/mesh/MeshFilterComponent";
import {MeshRendererComponent} from "../components/mesh/MeshRendererComponent";
import {CubeMesh} from "../meshes/CubeMesh";
import {Scene} from "../sceneManagment/Scene";

export class CubePrimitive extends GameObject {
    constructor(scene: Scene) {
        super(scene);

        this.addComponent<MeshFilterComponent>(MeshFilterComponent).mesh = new CubeMesh();
        this.addComponent<MeshRendererComponent>(MeshRendererComponent);
    }
}