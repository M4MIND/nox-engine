import GameObject from '../object/GameObject';
import TransformComponent from './transform/TransformComponent';

export default abstract class BaseComponent {
    protected readonly gameObject: GameObject;
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

    public start(): void {}

    public update(): void {}

    public onRendererObject(): void {}

    protected abstract preparation(): void;
}