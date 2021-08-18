import { GameObject } from '@gengine/engine';
import {Object} from "../object/Object";

export class Component extends Object {
    public readonly gameObject: GameObject;

    constructor(gameObject: GameObject) {
        super();
        this.gameObject = gameObject;
    }
}