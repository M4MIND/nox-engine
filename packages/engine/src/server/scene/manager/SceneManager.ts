import Scene from './scene/Scene';

export default class SceneManager {
    constructor(private readonly scene: Scene = new Scene()) {}

    public getActiveScene(): Scene {
        return this.scene;
    }
}
