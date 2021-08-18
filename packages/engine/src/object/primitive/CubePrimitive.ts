import { MeshRendererComponent } from './../../component/mesh/MeshRendererComponent';
import { MeshFilterComponent } from './../../component/mesh/MeshFilterComponent';
import { GameObject } from "../GameObject";
import { Scene } from '../../sceneManagment/Scene';

export class CubePrimitive extends GameObject {
    constructor(scene: Scene) {
        super(scene);

        this.addComponent<MeshFilterComponent>(MeshFilterComponent);
        this.addComponent<MeshRendererComponent>(MeshRendererComponent);
    }
}