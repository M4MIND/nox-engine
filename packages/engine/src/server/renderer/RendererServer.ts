import {
    GL_COLOR_BUFFER_BIT,
    GL_CULL_FACE,
    GL_DATA_FLOAT,
    GL_DATA_UNSIGNED_SHORT,
    GL_DEPTH,
    GL_DEPTH_BUFFER_BIT,
    GL_DEPTH_TEST,
    GL_TRIANGLES,
} from './_webgl_consts';
import CanvasManager, { ICanvasManagerSettings } from './manager/CanvasManager';
import ContextManager, { IContextManagerSettings } from './manager/ContextManager';
import ProgramManager from './manager/ProgramManager';
import ShaderManager, { IShaderManagerSettings } from './manager/ShaderManager';
import Material from './material/Material';
import Mesh from './mesh/Mesh';
import { VertexTypeUsage } from './shader/attribute/VertexAttributeDescriptor';

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
        this.contextManager.context.clearColor(0, 1, 1, 1);
        this.contextManager.context.clear(GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT);
        this.contextManager.context.enable(GL_DEPTH_TEST);
        this.contextManager.context.enable(GL_CULL_FACE);
    }

    public static drawMesh(mesh: Mesh, material: Material) {
        material.use();

        // Bind attribute buffers
        for (let attributeDescriptor of mesh.getAttributeDescriptors()) {
            let buffer = mesh.getBuffer(attributeDescriptor.index);

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

            let attributeLocation = material.shader.program.getAttributeLocation(attributeDescriptor.index);

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

        // Bind Indices buffer
        if (mesh.indicesDescriptor) {
            let buffer = mesh.getBuffer(mesh.indicesDescriptor.index);

            if (buffer) {
                buffer.bind(mesh.indicesDescriptor.target);

                if (!buffer.isActive) {
                    buffer.updateBuffer(
                        mesh.indicesDescriptor.target,
                        mesh.indicesDescriptor.type,
                        VertexTypeUsage.STATIC_DRAW,
                    );
                }
            }
        }

        // Set uniforms
        for (let matrix of Object.keys(material.matrix)) {
            let un = material.shader.program?.getUniformLocation(matrix);

            if (!un) {
                continue;
            }

            RendererServer.contextManager.context.uniformMatrix4fv(un, false, material.matrix[matrix]);
        }

        RendererServer.contextManager.context.drawElements(GL_TRIANGLES, 36, GL_DATA_UNSIGNED_SHORT, 0);
    }
}
