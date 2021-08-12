import { Camera } from './../camera/Camera';
import { Renderer } from './../renderer/Render';
import { Object3D } from "../object/Object3D";

export abstract class CoreBehavior {
    protected object: Object3D;

    constructor(object: Object3D) {
        this.object = object;
    }

    public abstract awake(): void;
    public abstract start(): void;
    public abstract update(): void;
    public abstract onRendererObject(renderer: Renderer, camera: Camera): void;
}