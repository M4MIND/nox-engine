export default class BaseUniformDescriptor {
    public readonly name: string;
    private size: number;
    private value: Float32Array;

    constructor(name: string, size: number) {
        this.name = name;
        this.size = size;
        this.value = new Float32Array(this.size);
    }

    public set(value: number[]) {
        if (value.length !== this.size) {
            this.value = new Float32Array(value);
            this.size = value.length;
        } else {
            this.value.set(value);
        }
    }

    public use(): void {}
}
