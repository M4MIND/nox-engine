import {Behavior} from "../Behavior";

export abstract class ScriptComponent extends Behavior {
    public abstract start(): void;
    public abstract update(): void;
}