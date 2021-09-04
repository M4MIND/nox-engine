import CanvasManager from "./canvas/CanvasManager";
import ContextManager from "./context/ContextManager";
import Material from "./material/Material";
import ProgramManager from "./program/ProgramManager";
import CubeMesh from "../../mesh/CubeMesh";
import ShaderManager from "./shader/ShaderManager";

export default class RendererServer {
    private static _canvasManager: CanvasManager;
    private static _contextManager: ContextManager;
    private static _programManger: ProgramManager;
    private static _shaderManager: ShaderManager;

    static get canvasManager(): CanvasManager {
        return this._canvasManager;
    }

    static get contextManager(): ContextManager {
        return this._contextManager;
    }

    static get programManger(): ProgramManager {
        return this._programManger;
    }

    static get shaderManager(): ShaderManager {
        return this._shaderManager;
    }

    public static startUp(canvas: HTMLCanvasElement) {
        this._canvasManager = new CanvasManager(canvas);
        this._contextManager = new ContextManager();
        this._programManger = new ProgramManager();
        this._shaderManager = new ShaderManager();
    }

    public static renderMesh(p: { material: Material; mesh: CubeMesh }[]) {
        // Clear the canvas
        this.contextManager.context.clearColor(1, 1, 1, 1);
        // Enable the depth test
        this.contextManager.context.enable(this.contextManager.context.DEPTH_TEST);
        //this.contextManager.context.enable(this.contextManager.context.LESS);
        // Clear the color buffer bit
        this.contextManager.context.clear(this.contextManager.context.COLOR_BUFFER_BIT);
        // Set the view port
        this.contextManager.context.viewport(0, 0, this.canvasManager.canvas.width, this.canvasManager.canvas.height);

        // Cached lastProgram
        let lastProgram = null;

        for (const v of p) {
            if (lastProgram !== v.material.program.uid) {
                v.material.program.use();

                lastProgram = v.material.program.uid;
            }

            for (const attr of Object.values(v.material.shader.vertexShader.attributes)) {
                attr.updateBuffer();
                attr.bindBuffer(v.material.program);
            }

            for (const un of Object.values(v.material.shader.vertexShader.uniforms)) {
                un.updateUniform(v.material.program);
            }

            this.contextManager.context.drawElements(RendererServer.contextManager.context.TRIANGLES, v.mesh.triangles.length, RendererServer.contextManager.context.UNSIGNED_SHORT, 0)
        }
    }

    public static renderPass(list: Material[]) {
        // Clear the canvas
        this.contextManager.context.clearColor(1, 1, 1, 1);
        // Enable the depth test
        this.contextManager.context.enable(this.contextManager.context.DEPTH_TEST);
        this.contextManager.context.enable(this.contextManager.context.LESS);
        // Clear the color buffer bit
        this.contextManager.context.clear(this.contextManager.context.COLOR_BUFFER_BIT);
        // Set the view port
        this.contextManager.context.viewport(0, 0, this.canvasManager.canvas.width, this.canvasManager.canvas.height);

        // Cached lastProgram
        let lastProgram = null;

        for (const v of list) {
            if (lastProgram !== v.program.uid) {
                v.program.use();

                lastProgram = v.program.uid;
            }

            for (const attr of Object.values(v.shader.vertexShader.attributes)) {
                attr.updateBuffer();
                attr.bindBuffer(v.program);
            }

            for (const un of Object.values(v.shader.vertexShader.uniforms)) {
                un.updateUniform(v.program);
            }

            this.contextManager.context.drawElements(RendererServer.contextManager.context.TRIANGLES, 36, RendererServer.contextManager.context.UNSIGNED_SHORT, 0)
        }
    }
}