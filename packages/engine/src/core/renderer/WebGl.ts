import { BufferFactory } from './buffers/BufferFactory';
import { ProgramFactory } from './ProgramFactory';
import { Canvas } from "./Canvas";
import { Shader } from './Shader';
import { Program } from './Program';


const vertexShader = `
attribute vec4 position;
varying vec4 v_color;

uniform mat4 transformMatrix;

void main(void) {
    gl_Position = transformMatrix * position;
    v_color = vec4(position.x, position.y, position.z, 1.0);
}`;

const fragmentShader = `
precision mediump float;
varying vec4 v_color;

void main(void) {
    gl_FragColor = v_color;
}`;

export class WebGl {
    public readonly programFactory: ProgramFactory;
    public readonly shader: Shader;
    public readonly bufferFactory: BufferFactory;
    public readonly program: Program;

    constructor(public readonly canvas: Canvas) {
        this.programFactory = new ProgramFactory(canvas);
        this.shader = new Shader(canvas);
        this.bufferFactory = new BufferFactory(canvas.api);
        this.canvas.api.enable(this.canvas.api.CULL_FACE)
        this.canvas.api.enable(this.canvas.api.DEPTH_TEST);
        this.program = this.programFactory.createProgram();

        this.program.attachShader(this.shader.createShader(vertexShader, Shader.VERTEX_SHADER));
        this.program.attachShader(this.shader.createShader(fragmentShader, Shader.FRAGMENT_SHADER));

        this.program.link();
        this.program.use();
    }
}