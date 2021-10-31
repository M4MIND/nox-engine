import GameObject from '../object/GameObject';
import TransformComponent from './transform/TransformComponent';

export default abstract class BaseComponent {
    public readonly gameObject: GameObject;
    protected transform: TransformComponent;

    constructor(gameObject: GameObject) {
        this.gameObject = gameObject;
        this.transform = gameObject.transform;

        this.preparation();
    }

    public getComponent<T extends BaseComponent>(component: new (...args: any[]) => T): T {
        return this.gameObject.getComponent(component);
    }

    public hasComponent<T extends BaseComponent>(component: new (...args: any[]) => T): boolean {
        return this.gameObject.hasComponent(component);
    }

    protected start(): void {}

    protected update(): void {}

    protected onCamera(): void {}

    protected onPreRender(): void {}

    protected onRendererObject(): void {}

    protected abstract preparation(): void;
}
