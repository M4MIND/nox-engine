import CoreObject from '../object/CoreObject';
import GameObject from '../object/GameObject';

export class BaseComponent extends CoreObject {
    constructor(public readonly gameObject: GameObject) {
        super();
    }

    onStart(): void {}

    onUpdate(): void {}

    onPhysics(): void {}

    onWillRendererObject(): void {}

    onRenderer(): void {}

    onRenderObject(): void {}
}
