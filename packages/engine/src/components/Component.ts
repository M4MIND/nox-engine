import {GameObject} from "../object/GameObject";

export class Component extends Object {
    public readonly gameObject: GameObject;

    constructor(gameObject: GameObject) {
        super();
        this.gameObject = gameObject;
    }
}