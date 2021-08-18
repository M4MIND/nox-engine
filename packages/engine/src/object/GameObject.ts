import {Object} from "./Object";
import {Scene} from '../sceneManagment/Scene';
import {Component} from "../components/Component";
import {TransformComponent} from "../components/transform/TransformComponent";

export class GameObject extends Object {
    public tag: string = "";
    private components: { [index: string]: Component } = {};
    private parent: GameObject | null = null;
    private children: GameObject[] = [];
    public readonly scene: Scene;
    public readonly transform: TransformComponent;

    constructor(scene: Scene) {
        super();

        this.scene = scene;
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

    hashComponent<T extends Component>(component: new (...args: any) => T): boolean {
        return !!this.components[component.name];
    }
}