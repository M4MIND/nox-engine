import { Vector3 } from './../../../math/Vector3';
export class Mesh {
    private vetecies: Vector3[];
    private normals: Vector3[];
    private triangles: number[];

    public get $vetecies(): Vector3[] {
        return this.vetecies;
    }

    public get $normals(): Vector3[] {
        return this.normals;
    }

    public set $vetecies(value: Vector3[]) {
        this.vetecies = value;
    }

    public set $normals(value: Vector3[]) {
        this.normals = value;
    }

    public get $triangles(): number[] {
        return this.triangles;
    }

    public set $triangles(value: number[]) {
        this.triangles = value;
    }
}