import {Behavior} from "../../core/component/Behavior";
import {SceneManager} from "../../core/sceneManagment/SceneManager";

export abstract class ScriptComponent extends Behavior {
    public abstract start(sceneManager: SceneManager): void;
    public abstract update(sceneManager: SceneManager): void;
}