import EventManager, { CoreEvents } from '../EventManager';
import SceneManager from '../scene/SceneManager';

export default class Time {
    private static _startTime = Date.now();
    private static _deltaTime = 0;
    private static _elapsedTime = 0;

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
        SceneManager.activeScene.subscribe(CoreEvents.FIXED_UPDATE, () => {
            this._deltaTime = (Date.now() - this._startTime) / 1000;
            this._elapsedTime += this._deltaTime;
            this._startTime = Date.now();
        }, 'System_Timer');
    }
}
