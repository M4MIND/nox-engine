import { GEngine, Material, Mesh, RendererServer, Shader, Vector3, WebGL2Context } from '@gengine/engine';

declare global {
    interface Window {
        gengine: GEngine;
    }
}

let canvas = document.createElement('canvas');
document.body.appendChild(canvas);

new GEngine({
    rendererServer: {
        canvasManager: {
            canvas: canvas,
            width: window.innerWidth,
            height: window.innerHeight,
        },
        contextManager: {
            context: WebGL2Context,
        },
    },
});

let mesh = new Mesh();

mesh.setVertices([
    new Vector3(0, 0, 0),
    new Vector3(1, 0, 0),
    new Vector3(1, 1, 0),
    new Vector3(0, 1, 0),
    new Vector3(0, 1, 1),
    new Vector3(1, 1, 1),
    new Vector3(1, 0, 1),
    new Vector3(0, 0, 1),
]).setTriangles([
    0, 2, 1, 0, 3, 2, 2, 3, 4, 2, 4, 5, 1, 2, 5, 1, 5, 6, 0, 7, 4, 0, 4, 3, 5, 4, 7, 5, 7, 6, 0, 6, 7, 0, 1, 6,
]);

RendererServer.drawMesh(
    mesh,
    new Material(
        new Shader(
            RendererServer.shaderManager.get('@gengine.base.vertex'),
            RendererServer.shaderManager.get('@gengine.base.fragment'),
        ),
    ),
);
