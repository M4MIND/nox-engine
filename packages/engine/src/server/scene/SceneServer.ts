import SceneManager from "./SceneManager";

export default class SceneServer {
    private static _sceneManager: SceneManager;

    static get sceneManager(): SceneManager {
        return this._sceneManager;
    }

    public static startUp() {
        this._sceneManager = new SceneManager();
    }
}