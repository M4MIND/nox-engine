import EventManager from './manager/EventManager';

export default class EventServer {
    private static _eventManager: EventManager;

    public static get eventManager(): EventManager {
        return this._eventManager;
    }

    public static startUp() {
        this._eventManager = new EventManager();
    }
}
