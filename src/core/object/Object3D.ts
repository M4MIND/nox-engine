import { TransformComponent } from '../component/transform/TransformComponent';
import { Component } from "../component/Component";

interface IComponents {
    [key: string]: Component
}

export class Object3D {
    private name: string = "Object";
    private tag: string = "Tag";

    private components: IComponents = {};
    private transform: TransformComponent;
    private parent: Object3D;
    private childrens: Object3D[] = [];


    /**
     * Getter $name
     * @return {string}
     */
    public get $name(): string {
        return this.name;
    }

    /**
     * Setter $name
     * @param {string} value
     */
    public set $name(value: string) {
        this.name = value;
    }


    /**
     * Getter $tag
     * @return {string}
     */
    public get $tag(): string {
        return this.tag;
    }

    /**
     * Setter $tag
     * @param {string} value
     */
    public set $tag(value: string) {
        this.tag = value;
    }


    /**
     * Getter $transform
     * @return {TransformComponent}
     */
    public get $transform(): TransformComponent {
        return this.transform;
    }

    /**
     * Setter $transform
     * @param {TransformComponent} value
     */
    public set $transform(value: TransformComponent) {
        this.transform = value;
    }


    constructor() {
        this.transform = this.addComponent<TransformComponent>(TransformComponent);
    }

    addComponent<T extends Component>(component: { new(g: Object3D): T }): T {
        if (!this.hashComponent(component)) {
            this.components[component.name] = new component(this);
        }

        return this.components[component.name] as T;
    }

    removeComponent<T extends Component>(component: { new(g: Object3D): T }): void {
        if (component.name === TransformComponent.name) {
            return;
        }

        if (this.hashComponent(component)) {
            delete this.components[component.name];
        }
    }

    hashComponent<T extends Component>(component: { new(g: Object3D): T }): boolean {
        return this.components[component.name] ? true : false;
    }

    getComponent<T extends Component>(component: { new(g: Object3D): T }): T {
        return this.components[component.name] as T | undefined;
    }

    getComponents(): Component[] {
        return Object.values(this.components);
    }
}