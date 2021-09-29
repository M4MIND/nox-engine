import { GL_COLOR_BUFFER_BIT, GL_DATA_FLOAT, GL_DEPTH_BUFFER_BIT, GL_TRIANGLES } from './_webgl_consts';
import CanvasManager, { ICanvasManagerSettings } from './manager/CanvasManager';
import ContextManager, { IContextManagerSettings } from './manager/ContextManager';
import ProgramManager from './manager/ProgramManager';
import ShaderManager, { IShaderManagerSettings } from './manager/ShaderManager';
import Material from './material/Material';
import Mesh from './mesh/Mesh';

export interface IRendererServerSettings {
    canvasManager: ICanvasManagerSettings;
    contextManager: IContextManagerSettings;
    shaderManager?: IShaderManagerSettings;
}

export default class RendererServer {
    private static _canvasManager: CanvasManager;
    private static _contextManager: ContextManager;
    private static _programManager: ProgramManager;
    private static _shaderManager: ShaderManager;

    public static get contextManager(): ContextManager {
        return this._contextManager;
    }

    public static get canvasManager(): CanvasManager {
        return this._canvasManager;
    }

    public static get programManager(): ProgramManager {
        return this._programManager;
    }

    public static get shaderManager(): ShaderManager {
        return this._shaderManager;
    }

    public static startUp(settings: IRendererServerSettings) {
        this._canvasManager = new CanvasManager(settings.canvasManager);
        this._contextManager = new ContextManager(settings.contextManager);
        this._programManager = new ProgramManager();
        this._shaderManager = new ShaderManager(settings.shaderManager);
    }

    public static clear() {
        this.contextManager.context.viewPort(0, 0, this.canvasManager.width, this.canvasManager.height);
        this.contextManager.context.clearColor(0, 0, 0, 0);
        this.contextManager.context.clear(GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT);
    }

    public static drawMesh(mesh: Mesh, material: Material) {
        material.use();

        for (let attributeDescriptor of mesh.getAttributeDescriptors()) {
            let buffer = mesh.getBuffer(attributeDescriptor.name);

            if (!buffer) {
                continue;
            }

            buffer.bind(attributeDescriptor.target);

            if (buffer.isActive) {
                continue;
            }

            buffer.updateBuffer(attributeDescriptor.target, attributeDescriptor.type, attributeDescriptor.usage);

            if (!material.shader.program) {
                return;
            }

            let attributeLocation = material.shader.program.getAttributeLocation(attributeDescriptor.name);

            if (attributeLocation >= 0) {
                RendererServer.contextManager.context.enableVertexAttribArray(attributeLocation);
                RendererServer.contextManager.context.vertexAttribPointer(
                    attributeLocation,
                    attributeDescriptor.size,
                    GL_DATA_FLOAT,
                    false,
                    0,
                    0,
                );
            }
        }

        RendererServer.contextManager.context.drawArrays(GL_TRIANGLES, 0, 3);
        // Bind buffers from mesh
    }
}
