import Material from './material/Material';
import Mesh from './mesh/Mesh';
import { RendererServer } from '@nox-engine/renderer';

export default class Graphics {
    public static clear() {
        RendererServer.rendererManager.clear();
    }

    public static drawMesh(mesh: Mesh, material: Material) {
        RendererServer.rendererManager.drawMesh(mesh, material);
    }
}
