import { WebGl } from './WebGl';
import { Canvas } from './Canvas';
import { Vector3 } from './../../math/Vector3';
import { Mesh } from "../component/mesh/Mesh";

export class Renderer {
    private canvas: Canvas;
    private webgl: WebGl;

    constructor(canvas: Canvas) {
        this.canvas = canvas;
        this.webgl = new WebGl();
    }

    drawMesh(mesh: Mesh, position: Vector3) {
    }
}