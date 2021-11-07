import {
    GL_ALIASED_LINE_WIDTH_RANGE,
    GL_COLOR_BUFFER_BIT,
    GL_CULL_FACE,
    GL_DATA_UNSIGNED_SHORT,
    GL_DEPTH_BUFFER_BIT,
    GL_DEPTH_TEST,
    GL_LINE_STRIP,
    GL_LINE_WIDTH,
    GL_LINES,
    GL_TRIANGLES,
} from '../_webgl_consts';
import BaseMaterial from '../material/BaseMaterial';
import BaseMesh from '../mesh/BaseMesh';
import RendererServer from '../RendererServer';
import BaseShader from '../shader/BaseShader';

export default class RendererManager {
    public clear() {
        RendererServer.contextManager.context.viewPort(
            0,
            0,
            RendererServer.canvasManager.width,
            RendererServer.canvasManager.height,
        );
        RendererServer.contextManager.context.clearColor(1, 1, 1, 1);
        RendererServer.contextManager.context.clear(GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT);
        RendererServer.contextManager.context.enable(GL_DEPTH_TEST);
        RendererServer.contextManager.context.enable(GL_CULL_FACE);
    }

    public drawWireframe(mesh: BaseMesh, material: BaseMaterial) {
        this.useProgram(material);
        this.useMeshAndMaterial(mesh, material);

        RendererServer.contextManager.context.drawElements(
            GL_LINE_STRIP,
            mesh.indicesDescriptor.dataLength,
            GL_DATA_UNSIGNED_SHORT,
            0,
        );

        mesh.unuse();
    }

    public drawMesh(mesh: BaseMesh, material: BaseMaterial) {
        this.useProgram(material);
        this.useMeshAndMaterial(mesh, material);

        RendererServer.contextManager.context.drawElements(
            GL_TRIANGLES,
            mesh.indicesDescriptor.dataLength,
            GL_DATA_UNSIGNED_SHORT,
            0,
        );

        mesh.unuse();
    }

    private useProgram(material: BaseMaterial) {
        if (
            !RendererServer.programManager.activeProgram ||
            RendererServer.programManager.activeProgram.id !== material.getId()
        ) {
            material.active();
        }
    }

    private useMeshAndMaterial(mesh: BaseMesh, material: BaseMaterial) {
        mesh.use();
        material.use();
        BaseShader.use();
    }
}
