import { GameObject } from "../object/GameObject";

export class Scene {
    public readonly objects: GameObject[] = [];
    
    addObject<T extends GameObject>(object: new (... args: any) => T): T {
        const instance = new object(this);

        this.objects.push(instance);

        return instance;
    }
}