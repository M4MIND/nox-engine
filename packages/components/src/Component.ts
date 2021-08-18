import {Object} from "@gengine/engine/src/object/Object";
import {GameObject} from "@gengine/engine/src/object/GameObject";

export class Component extends Object {
    public readonly gameObject: GameObject;

    constructor(gameObject: GameObject) {
        super();
        this.gameObject = gameObject;
    }
}