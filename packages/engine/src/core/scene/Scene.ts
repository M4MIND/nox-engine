import EventManager from '../EventManager';
import GameObject from '../object/GameObject';

export default class Scene extends EventManager {
    private rootGameObject: GameObject = new GameObject('Scene');
    private name: string;

    constructor(name: string) {
        super();
        this.name = name;
    }

    public addGameObject(gameObject: GameObject): GameObject {
        this.rootGameObject.transform.parent = gameObject.transform;

        return gameObject;
    }
}
