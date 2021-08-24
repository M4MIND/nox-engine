import {GameObject} from "../object/GameObject";

export class Scene {
    public readonly objects: GameObject[] = [];

    addObject<T extends GameObject>(object: new (...args: any) => T): T {
        const instance = new object();

        this.objects.push(instance);

        return instance;
    }

    getAllObjects(): GameObject[] {
        return this.objects;
    }
}