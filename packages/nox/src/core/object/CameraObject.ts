import CameraComponent from '../component/rendering/CameraComponent';
import GameObject from './GameObject';

export default class CameraObject extends GameObject {
    constructor(name: string = 'Camera') {
        super(name);

        this.addComponent<CameraComponent>(CameraComponent);
    }
}
