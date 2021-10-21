import EventManager, { EventManagerEvents } from '../../EventManager';
import BaseComponent from '../BaseComponent';

export default class ScriptComponent extends BaseComponent {
    protected preparation(): void {
        EventManager.subscribe(EventManagerEvents.UPDATE, this.update.bind(this));
    }
}
