import RendererServer from '../RendererServer';
import {
    GL_COLOR_BUFFER_BIT,
    GL_CULL_FACE,
    GL_DATA_FLOAT,
    GL_DATA_UNSIGNED_SHORT,
    GL_DEPTH_BUFFER_BIT,
    GL_DEPTH_TEST,
    GL_TRIANGLES,
} from '../_webgl_consts';
import BaseMaterial from '../material/BaseMaterial';
import BaseMesh from '../mesh/BaseMesh';
import { VertexTypeUsage } from '../shader/attribute/VertexAttributeDescriptor';
import IContext from './context/IContext';

export default class RendererManager {
    private enable: boolean;

    constructor(private context: IContext = RendererServer.contextManager.context) {
        this.enable = false;
    }

    public clear() {
        this.context.viewPort(0, 0, RendererServer.canvasManager.width, RendererServer.canvasManager.height);
        this.context.clearColor(1, 1, 1, 1);
        this.context.clear(GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT);
        this.context.enable(GL_DEPTH_TEST);
        this.context.enable(GL_CULL_FACE);
    }

    public drawMesh(mesh: BaseMesh, material: BaseMaterial, indicesCount: number) {
        if (!this.enable) {
            material.use();

            this.enable = true;
        }

        // Bind attribute buffers
        for (let attributeDescriptor of mesh.getAttributeDescriptors()) {
            let buffer = mesh.getBuffer(attributeDescriptor.index);

            if (!buffer) {
                continue;
            }

            buffer.bind(attributeDescriptor.target);

            if (buffer.isUpdate) {
                continue;
            }

            buffer.updateBuffer(attributeDescriptor.target, attributeDescriptor.srcType, attributeDescriptor.usage);

            if (!material.shader.program) {
                return;
            }

            let attributeLocation = material.shader.program.getAttributeLocation(attributeDescriptor.index);

            if (attributeLocation >= 0) {
                this.context.enableVertexAttribArray(attributeLocation);
                this.context.vertexAttribPointer(
                    attributeLocation,
                    attributeDescriptor.size,
                    GL_DATA_FLOAT,
                    attributeDescriptor.normalized,
                    attributeDescriptor.stride,
                    attributeDescriptor.offset,
                );
            }
        }

        // Bind Indices buffer
        if (mesh.indicesDescriptor) {
            let buffer = mesh.getBuffer(mesh.indicesDescriptor.index);

            if (buffer) {
                buffer.bind(mesh.indicesDescriptor.target);

                if (!buffer.isUpdate) {
                    buffer.updateBuffer(
                        mesh.indicesDescriptor.target,
                        mesh.indicesDescriptor.type,
                        VertexTypeUsage.STATIC_DRAW,
                    );
                }
            }
        }

        for (let uniform of material.getUniforms()) {
            let uniformLocation = material.shader.program?.getUniformLocation(uniform.index);

            if (uniformLocation) {
                uniform.bind(uniformLocation);
            }
        }

        this.context.drawElements(GL_TRIANGLES, indicesCount, GL_DATA_UNSIGNED_SHORT, 0);
    }
}
