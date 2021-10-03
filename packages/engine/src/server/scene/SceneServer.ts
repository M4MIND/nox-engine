import SceneManager from './manager/SceneManager';

export default class SceneServer {
    private static _sceneManager: SceneManager;

    public static get sceneManager(): SceneManager {
        return this._sceneManager;
    }

    public static startUp() {
        this._sceneManager = new SceneManager();
    }
}
