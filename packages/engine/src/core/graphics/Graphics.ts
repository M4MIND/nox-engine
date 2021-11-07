import Material from './material/Material';
import Mesh from './mesh/Mesh';
import { BaseMaterial, BaseMesh, RendererServer } from '@nox-engine/renderer';

export default class Graphics {
    public static clear() {
        RendererServer.rendererManager.clear();
    }

    public static drawMesh(mesh: BaseMesh, material: BaseMaterial) {
        RendererServer.rendererManager.drawMesh(mesh, material);
    }

    public static drawWireframe(mesh: BaseMesh, material: BaseMaterial) {
        RendererServer.rendererManager.drawWireframe(mesh, material)
    }
}
