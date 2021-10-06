import EventServer from '../event/EventServer';

export default class TimeServer {
    private static _startTime: number = 0;
    private static _deltaTime: number = 0;
    private static _elapsedTime: number = 0;

    public static get startTime(): number {
        return this._startTime;
    }

    public static get deltaTime(): number {
        return this._deltaTime;
    }

    public static get elapsedTime(): number {
        return this._elapsedTime;
    }

    public static startUp() {
        this._startTime = Date.now();

        EventServer.eventManager.subscribe('onFixedUpdate', () => {
            this._deltaTime = (Date.now() - this._startTime) / 1000;
            this._elapsedTime += this._deltaTime;
            this._startTime = Date.now();
        });
    }
}
