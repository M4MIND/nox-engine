import _Object from "./_Object";
import {Component} from "../component/Component";
import TransformComponent from "../component/transform/TransformComponent";

export default class GameObject extends _Object {
    private tag: string = "Example Tag";
    private components: { [index: string]: Component } = {};
    private parent: GameObject | null = null;
    private children: GameObject[] = [];
    private transform: TransformComponent;

    constructor() {
        super();

        this.transform = this.addComponent<TransformComponent>(TransformComponent);
    }

    addComponent<T extends Component>(component: new (...args: any) => T): T {
        if (!this.components[component.name]) {
            this.components[component.name] = new component(this);
        }

        return this.components[component.name] as T;
    }

    removeComponent<T extends Component>(component: new (...args: any) => T) {
        if (this.components[component.name]) {
            delete this.components[component.name];
        }
    }

    getComponent<T extends Component>(component: new (...args: any) => T): T | null {
        if (this.hashComponent(component)) {
            return this.components[component.name] as T;
        }

        return null;
    }

    getComponents(): Component[] {
        return Object.values(this.components);
    }

    hashComponent<T extends Component>(component: new (...args: any) => T): boolean {
        return !!this.components[component.name];
    }
}