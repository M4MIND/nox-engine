import { Object3D } from "../object/Object3D";

export class Scene {
    private objects: Object3D[] = [];
    
    constructor() {

    }

    add(object: Object3D): Object3D {
        this.objects.push(object);
        
        return object;
    }

    all(): Object3D[] {
        return this.objects;
    }
}