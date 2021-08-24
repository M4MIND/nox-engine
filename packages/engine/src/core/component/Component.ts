import {GameObject} from "../object/GameObject";
import {CoreObject} from "../object/CoreObject";
import {SceneManager} from "../sceneManagment/SceneManager";

export class Component extends CoreObject {
    constructor(public readonly gameObject: GameObject) {
        super();
    }

    onPhysics(): void {

    }

    onRenderer(): void {

    }

    onRenderObject(): void {

    }

    start(sceneManager: SceneManager): void {

    }

    update(sceneManager: SceneManager): void {

    }
}