import EventServer from '../../../server/event/EventServer';
import GameObject from '../../object/GameObject';
import { BaseComponent } from '../BaseComponent';

export default class CameraProjectionComponent extends BaseComponent {
    public near: number = 0.3;
    public far: number = 1000;

    constructor(gameObject: GameObject) {
        super(gameObject);

        EventServer.eventManager.subscribe('onCameraPreparation', this.onCameraPreparation.bind(this));
    }

    public onCameraPreparation() {}
}
