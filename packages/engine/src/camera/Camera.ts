import {GameObject} from '../object/GameObject';
import {Scene} from '../sceneManagment/Scene';
import {CameraComponent} from "../components/rendering/CameraComponent";

export class Camera extends GameObject {
    constructor(scene: Scene) {
        super(scene);

        this.addComponent<CameraComponent>(CameraComponent);
    }
}