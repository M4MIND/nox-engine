import RendererServer from '../RendererServer';
import { GL_DATA_FLOAT, GL_DATA_UNSIGNED_SHORT, GL_TRIANGLES } from '../_webgl_consts';
import Material from '../material/Material';
import Mesh from '../mesh/Mesh';
import { VertexTypeUsage } from '../shader/attribute/VertexAttributeDescriptor';

export default class RendererManager {
    public drawMesh(mesh: Mesh, material: Material) {
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
