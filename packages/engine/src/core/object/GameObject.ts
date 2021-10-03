import { BaseComponent } from '../component/BaseComponent';
import TransformComponent from '../component/transform/TransformComponent';
import CoreObject from './CoreObject';

export default class GameObject extends CoreObject {
    public readonly transform: TransformComponent;

    private components: { [index: string]: BaseComponent } = {};

    constructor() {
        super();

        this.transform = this.addComponent<TransformComponent>(TransformComponent);
    }

    addComponent<T extends BaseComponent>(component: new (...args: any) => T): T {
        if (!this.components[component.name]) {
            this.components[component.name] = new component(this);
        }

        return this.components[component.name] as T;
    }

    removeComponent<T extends BaseComponent>(component: new (...args: any) => T): void {
        if (this.components[component.name]) {
            delete this.components[component.name];
        }
    }

    getComponent<T extends BaseComponent>(component: new (...args: any) => T): T | null {
        if (this.hashComponent(component)) {
            return this.components[component.name] as T;
        }

        return null;
    }

    getComponents(): BaseComponent[] {
        return Object.values(this.components);
    }

    hashComponent<T extends BaseComponent>(component: new (...args: any) => T): boolean {
        return !!this.components[component.name];
    }
}
