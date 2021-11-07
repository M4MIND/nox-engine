import EventManager from '../EventManager';
import GameObject from '../object/GameObject';

export default class Scene extends EventManager {
    private gameObjects: GameObject[] = [];

    constructor(name: string) {
        super();
        this._name = name;
    }

    private _name: string;

    public get name(): string {
        return this._name;
    }

    public addGameObject(gameObject: GameObject): GameObject {
        this.gameObjects.push(gameObject);

        return gameObject;
    }

    public getObjects(): GameObject[] {
        return this.gameObjects;
    }
}
