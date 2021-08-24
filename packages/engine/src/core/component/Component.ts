import { GameObject } from "../object/GameObject";
import { CoreObject } from "../object/CoreObject";
import { SceneManager } from "../sceneManagment/SceneManager";
import { Renderer } from "../renderer/Renderer";

export class Component extends CoreObject {
    constructor(public readonly gameObject: GameObject) {
        super();
    }

    onPhysics(): void {

    }

    onRenderer(): void {

    }

    onRenderObject(renderer: Renderer): void {
    }

    start(sceneManager: SceneManager): void {

    }

    update(sceneManager: SceneManager): void {

    }
}