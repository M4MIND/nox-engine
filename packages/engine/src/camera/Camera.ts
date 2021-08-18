import { CameraComponent } from '../component/rendering/CameraComponent';
import { GameObject } from '../object/GameObject';
import { Scene } from '../sceneManagment/Scene';

export class Camera extends GameObject {
    constructor(scene: Scene) {
        super(scene);
        
        this.addComponent<CameraComponent>(CameraComponent);
    }
}