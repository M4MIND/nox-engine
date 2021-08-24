import {CoreObject} from "./CoreObject";
import {Scene} from '../sceneManagment/Scene';
import {TransformComponent} from "../../components/transform/TransformComponent";
import {Component} from "../component/Component";

export class GameObject extends CoreObject {
    public tag: string = "";
    private components: { [index: string]: Component } = {};
    private parent: GameObject | null = null;
    private children: GameObject[] = [];
    public readonly transform: TransformComponent;

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