import { Scene } from "./Scene";

export class SceneManager {
    private scene: Scene = new Scene();
    
    public createScene(): Scene {
        return new Scene();
    }

    public getActiveScene(): Scene {
        return this.scene;
    }
}