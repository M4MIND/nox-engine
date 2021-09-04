import Scene from "./Scene";

export default class SceneManager {
    private _activeScene: Scene = new Scene();

    get activeScene(): Scene {
        return this._activeScene;
    }

    constructor() {
    }
}