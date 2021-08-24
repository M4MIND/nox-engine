import { Canvas } from "./Canvas";
import { Program } from "./Program";

export class ProgramFactory {
    constructor(private readonly canvas: Canvas) {

    }

    createProgram() {
        return new Program(this.canvas.api);
    }
}