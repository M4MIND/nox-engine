export default class _Object {
    private _name: string = "Object";

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }
}