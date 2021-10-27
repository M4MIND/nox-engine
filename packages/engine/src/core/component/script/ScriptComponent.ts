import EventManager, { CoreEvents } from '../../EventManager';
import BaseComponent from '../BaseComponent';

export default class ScriptComponent extends BaseComponent {
    protected preparation(): void {
        EventManager.subscribe(CoreEvents.START, this.start.bind(this));
        EventManager.subscribe(CoreEvents.UPDATE, this.update.bind(this));
    }
}
