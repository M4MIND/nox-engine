import { TransformComponent } from '../component/transform/TransformComponent';
import { Object } from "./Object";
import { Component } from "../component/Component";
import { Scene } from '../sceneManagment/Scene';


interface ComponentCollection {
    [index: string]: Component;
}

export class GameObject extends Object {
    public tag: string = "";
    private components: ComponentCollection = {};
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
        return this.components[component.name] ? true : false;
    }
}