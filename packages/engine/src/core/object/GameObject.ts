import { CameraComponent, GlobalLightComponent } from '../../..';
import BaseComponent from '../component/BaseComponent';
import MeshFilterComponent from '../component/mesh/MeshFilterComponent';
import MeshRendererComponent from '../component/mesh/MeshRendererComponent';
import TransformComponent from '../component/transform/TransformComponent';
import Cone from '../geometry/Cone';
import Cube from '../geometry/Cube';
import IcoSphere from '../geometry/IcoSphere';
import Monkey from '../geometry/Monkey';
import Torus from '../geometry/Torus';
import Mesh from '../graphics/mesh/Mesh';
import SceneManager from '../scene/SceneManager';
import BaseObject from './BaseObject';

export enum PrimitiveTypes {
    Cone,
    Cube,
    IcoSphere,
    Monkey,
    Torus,
}

const PRIMITIVE_CLASSES: { [index: number]: new () => Mesh } = {
    [PrimitiveTypes.Cube]: Cube,
    [PrimitiveTypes.Cone]: Cone,
    [PrimitiveTypes.IcoSphere]: IcoSphere,
    [PrimitiveTypes.Monkey]: Monkey,
    [PrimitiveTypes.Torus]: Torus,
};

export default class GameObject extends BaseObject {
    public readonly transform: TransformComponent;
    public parent: GameObject | undefined;
    private readonly components: Map<string, BaseComponent> = new Map<string, BaseComponent>();
    private childrens: GameObject[] = [];

    constructor() {
        super();

        this.transform = this.addComponent<TransformComponent>(TransformComponent);
    }

    public static createEmpty(): GameObject {
        return SceneManager.activeScene.addGameObject(new GameObject());
    }

    public static createCamera(): GameObject {
        return SceneManager.activeScene.addGameObject(new GameObject().addComponent<CameraComponent>(CameraComponent).gameObject);
    }

    public static createGlobalLight(): GameObject {
        return new GameObject().addComponent<GlobalLightComponent>(GlobalLightComponent).gameObject;
    }

    public static createPrimitive(type: PrimitiveTypes): GameObject {
        let object = new GameObject();
        object.addComponent<MeshFilterComponent>(MeshFilterComponent).mesh = new PRIMITIVE_CLASSES[type]();
        object.addComponent<MeshRendererComponent>(MeshRendererComponent);

        SceneManager.activeScene.addGameObject(object);

        return object;
    }

    public addComponent<T extends BaseComponent>(component: new (...args: any[]) => T): T {
        if (this.hasComponent(component)) {
            this.removeComponent(component);
        }

        let instance = new component(this);

        this.components.set(component.name, instance);

        return instance;
    }

    public hasComponent<T extends BaseComponent>(component: new (...args: any[]) => T): boolean {
        return this.components.has(component.name);
    }

    public removeComponent<T extends BaseComponent>(component: new (...args: any[]) => T): void {
        if (this.hasComponent(component)) {
            this.components.delete(component.name);
        }
    }

    public getComponent<T extends BaseComponent>(component: new (...args: any[]) => T): T {
        if (this.hasComponent(component)) {
            return this.components.get(component.name) as T;
        }

        throw new Error(`${component.name} -> is not found in game object`);
    }

    public addChildren(gameObject: GameObject) {
        this.childrens.push(gameObject);

        gameObject.parent = this;
    }
}
