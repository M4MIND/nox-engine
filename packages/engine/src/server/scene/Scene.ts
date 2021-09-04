import GameObject from "../../core/object/GameObject";

export default class Scene {
    private objectsCollection: GameObject[] = [];

    addObject(gameObject: GameObject): Scene {
        this.objectsCollection.push(gameObject);

        return this;
    }
}