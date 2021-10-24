import Scene from './Scene';

export default class SceneManager {
    private static scenes: Map<string, Scene> = new Map<string, Scene>();
    private static _activeScene: Scene;

    public static get activeScene(): Scene {
        return this._activeScene;
    }

    public static setActiveScene(scene: Scene) {
        this._activeScene = scene;
    }

    public static startUp() {
        this.setActiveScene(this.createScene('Main Scene'));
    }

    public static createScene(name: string): Scene {
        let scene = new Scene(name);

        this.scenes.set(name, scene);

        return scene;
    }
}
