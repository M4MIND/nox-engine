import {GameObject} from '../object/GameObject';
import {CameraComponent} from "../../components/rendering/CameraComponent";

export class Camera extends GameObject {
    constructor() {
        super();

        this.addComponent<CameraComponent>(CameraComponent);
    }
}