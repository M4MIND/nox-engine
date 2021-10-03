import GameObject from '../../../../core/object/GameObject';

export default class Scene {
    public readonly objects: GameObject[] = [];

    addObject(gameObject: GameObject): GameObject {
        this.objects.push(gameObject);

        return gameObject;
    }

    getAllObjects(): GameObject[] {
        return this.objects;
    }
}
