import CoreObject from '../object/CoreObject';
import GameObject from '../object/GameObject';

export class BaseComponent extends CoreObject {
    constructor(public readonly gameObject: GameObject) {
        super();
    }

    onPhysics(): void {}

    onRenderer(): void {}

    onRenderObject(): void {}
}
