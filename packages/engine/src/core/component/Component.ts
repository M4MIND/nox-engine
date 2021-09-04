import _Object from "../object/_Object";
import GameObject from "../object/GameObject";

export class Component extends _Object {
    constructor(public readonly gameObject: GameObject) {
        super();
    }
}