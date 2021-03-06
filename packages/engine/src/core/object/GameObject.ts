
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
    private readonly components: Map<string, BaseComponent> = new Map<string, BaseComponent>();

    constructor(name: string = 'Game Object') {
        super(name);

        this.transform = this.addComponent<TransformComponent>(TransformComponent);
    }

    public static createEmpty(name: string = 'Empty'): GameObject {
        return SceneManager.activeScene.addGameObject(new GameObject(name));
    }

    public static createCamera(): GameObject {
        return SceneManager.activeScene.addGameObject(new GameObject('Camera').addComponent<CameraComponent>(CameraComponent).gameObject);
    }

    public static createGlobalLight(): GameObject {
        return SceneManager.activeScene.addGameObject(new GameObject('Global Light').addComponent<GlobalLightComponent>(GlobalLightComponent).gameObject);
    }

    public static createPrimitive(type: PrimitiveTypes, name: string | null = null): GameObject {
        if (!PrimitiveTypes[type]) {
            throw new Error(`Can't create ${PrimitiveTypes[type]}`)
        }

        let object = new GameObject(name ?? PrimitiveTypes[type]);
        object.addComponent<MeshFilterComponent>(MeshFilterComponent).mesh = new PRIMITIVE_CLASSES[type]();
        object.addComponent<MeshRendererComponent>(MeshRendererComponent);

        return SceneManager.activeScene.addGameObject(object);
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

    public getComponents(): Iterable<BaseComponent> {
        return this.components.values();
    }

    public getComponent<T extends BaseComponent>(component: new (...args: any[]) => T): T {
        if (this.hasComponent(component)) {
            return this.components.get(component.name) as T;
        }

        throw new Error(`${component.name} -> is not found in game object`);
    }

    public onCollision() {
        console.log(`${this.name}: onCollision`);
    }
}
