import { RendererServer } from '../../../index';
import BaseShader from '../../server/renderer/shader/BaseShader';
import SceneServer from '../../server/scene/SceneServer';
import { BaseComponent } from '../component/BaseComponent';
import MeshFilterComponent from '../component/mesh/MeshFilterComponent';
import MeshRendererComponent from '../component/mesh/MeshRendererComponent';
import TransformComponent from '../component/transform/TransformComponent';
import Material from '../material/Material';
import { PrimitiveClasses, PrimitiveType } from '../mesh/primitive/PrimitiveType';
import CoreObject from './CoreObject';

export default class GameObject extends CoreObject {
    public readonly transform: TransformComponent;

    private components: { [index: string]: BaseComponent } = {};

    constructor() {
        super();

        this.transform = this.addComponent<TransformComponent>(TransformComponent);
    }

    public static createPrimitive(type: PrimitiveType): GameObject {
        let object = SceneServer.sceneManager.getActiveScene().addObject(new GameObject());

        object.addComponent<MeshFilterComponent>(MeshFilterComponent).mesh = new PrimitiveClasses[type]();
        object.addComponent<MeshRendererComponent>(MeshRendererComponent).material = new Material(
            new BaseShader(
                RendererServer.shaderManager.get('@gengine.base.vertex'),
                RendererServer.shaderManager.get('@gengine.base.fragment'),
            ),
        );

        return object;
    }

    public addComponent<T extends BaseComponent>(component: new (...args: any) => T): T {
        if (!this.components[component.name]) {
            this.components[component.name] = new component(this);
        }

        return this.components[component.name] as T;
    }

    public removeComponent<T extends BaseComponent>(component: new (...args: any) => T): void {
        if (this.components[component.name]) {
            delete this.components[component.name];
        }
    }

    public getComponent<T extends BaseComponent>(component: new (...args: any) => T): T | null {
        if (this.hashComponent(component)) {
            return this.components[component.name] as T;
        }

        return null;
    }

    public getComponents(): BaseComponent[] {
        return Object.values(this.components);
    }

    public hashComponent<T extends BaseComponent>(component: new (...args: any) => T): boolean {
        return !!this.components[component.name];
    }
}
