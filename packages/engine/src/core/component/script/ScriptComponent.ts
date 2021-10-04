import EventServer from '../../../server/event/EventServer';
import GameObject from '../../object/GameObject';
import { BaseComponent } from '../BaseComponent';

export default class ScriptComponent extends BaseComponent {
    constructor(gameObject: GameObject) {
        super(gameObject);

        EventServer.eventManager.subscribe('onStart', this.onStart.bind(this));
        EventServer.eventManager.subscribe('onUpdate', this.onUpdate.bind(this));
    }
}
