import { Matrix } from './../../mathf/Matrix';
import { BufferFactory } from './buffers/BufferFactory';
import { ProgramFactory } from './ProgramFactory';
import { Canvas } from "./Canvas";
import { Shader } from './Shader';
import { Program } from './Program';
import { Vector3 } from '../../..';


const vertexShader = `
attribute vec4 position;

uniform mat4 transformMatrix;

void main(void) {
    // gl_Position =  projection * translate * xRotation * yRotation * zRotation * scale * position;

    gl_Position = transformMatrix * position;
}`;

const fragmentShader = `
void main(void) {
    gl_FragColor = vec4(0.0, 0.0, 0.0, 0.3);
}`;

let angle = 0;

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

    draw() {

        angle = angle + 0.2 % 360;

        this.bufferFactory.createArrayBuffer([
            0, 0, 0,
            1, 0, 0,
            1, 1, 0,
            0, 1, 0,
            0, 1, 1,
            1, 1, 1,
            1, 0, 1,
            0, 0, 1,
        ]);

        this.bufferFactory.createElementArrayBuffer([
            0, 2, 1,
            0, 3, 2,
            2, 3, 4,
            2, 4, 5,
            1, 2, 5,
            1, 5, 6,
            0, 7, 4,
            0, 4, 3,
            5, 4, 7,
            5, 7, 6,
            0, 6, 7,
            0, 1, 6
        ]);

        this.program.setVertexAttributePointer('position');


        this.program.uniformMatrix4fv("transformMatrix", Matrix.multiples(
            /// Матрица проекции
            Matrix.projection((120 * Math.PI / 180), this.canvas.width / this.canvas.height, 1, 2000),
            /// Матрицы камеры
            Matrix.xRotation(angle * Math.PI / 180),
            Matrix.yRotation(angle * Math.PI / 180),
            Matrix.zRotation(angle * Math.PI / 180),
            Matrix.translate(new Vector3(0.5,0.5,-12)),
            /// Матрицы объекта
            Matrix.translate(new Vector3(0, 0, 0)),
            Matrix.xRotation(angle * Math.PI / 180),
            Matrix.yRotation(angle * Math.PI / 180),
            Matrix.zRotation(angle * Math.PI / 180),
            Matrix.scale(new Vector3(2,2,1))
        ));

        this.canvas.api.clearColor(1, 1, 1, 1);

        // Enable the depth test
        this.canvas.api.enable(this.canvas.api.DEPTH_TEST);

        // Clear the color buffer bit
        this.canvas.api.clear(this.canvas.api.COLOR_BUFFER_BIT);

        // Set the view port
        this.canvas.api.viewport(0, 0, this.canvas.width, this.canvas.height);

        // Draw the triangle
        this.canvas.api.drawElements(this.canvas.api.TRIANGLES, 36, this.canvas.api.UNSIGNED_SHORT, 0);
    }
}