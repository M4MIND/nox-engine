import RendererServer from "../../../RendererServer";
import Vector3 from "../../../../../mathf/Vector3";
import Vector4 from "../../../../../mathf/Vector4";
import Program from "../../../program/Program";
import Buffer from "../../../Buffer";

export default abstract class ShaderAttribute {
    public readonly name: string;
    protected size: number;
    protected type: number;
    protected buffer: Buffer;
    protected values: number[] = [];

    public constructor(name: string, type: number, size: number) {
        this.name = name;
        this.size = size;
        this.type = type;
        this.buffer = new Buffer();
    }

    fromVector3(v: Vector3[]) {
        for (let _v of v) {
            this.values.push(_v.x);
            this.values.push(_v.y);
            this.values.push(_v.z);
        }
    }

    fromArray(v: number[]) {
        this.values = v;
    }

    fromVector4(v: Vector4[]) {
        for (let _v of v) {
            this.values.push(_v.x);
            this.values.push(_v.y);
            this.values.push(_v.z);
            this.values.push(_v.w);
        }
    }

    public abstract bindBuffer(program: Program): void;

    public abstract updateBuffer(): void;
}