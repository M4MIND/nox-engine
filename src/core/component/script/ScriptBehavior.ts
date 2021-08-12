import { TransformComponent } from './../transform/TransformComponent';
import { Object3D } from "../../object/Object3D";
import { Component } from "../Component";

export abstract class ScriptBehavior extends Component {
    protected transform: TransformComponent;
    protected name: string;
    protected tag: string;

    constructor(object: Object3D) {
        super(object);

        this.transform = object.$transform;
        this.tag = object.$tag;
        this.name = object.$name;
    }

    public abstract start(): void;
    public abstract update(): void;
}