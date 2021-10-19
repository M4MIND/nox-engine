import GameObject from '../object/GameObject';

export default class Scene {
    private gameObjects: GameObject[] = [];
    private _name: string;

    public get name(): string {
        return this._name;
    }

    constructor(name: string) {
        this._name = name;
    }

    public addGameObject(gameObject: GameObject): GameObject {
        this.gameObjects.push(gameObject);

        return gameObject;
    }
}
