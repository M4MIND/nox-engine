import { GEngine, Material, Mesh, RendererServer, Shader, WebGL2Context } from '@gengine/engine';
import {
    TypeDraw,
    VertexAttributeFormat,
    VertexAttributeLocation,
} from '@gengine/engine/src/server/renderer/shader/attribute/VertexAttributeDescriptor';

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

mesh.createAttributeDescriptor(
    VertexAttributeLocation.Position,
    VertexAttributeFormat.Float32,
    3,
    TypeDraw.STATIC_DRAW,
);
mesh.createAttributeDescriptor(VertexAttributeLocation.Color, VertexAttributeFormat.Float32, 3, TypeDraw.STATIC_DRAW);

mesh.createBuffer(VertexAttributeLocation.Position).set([0, 0, 0, 0, 0.5, 0, 0.7, 0, 0]);
mesh.createBuffer(VertexAttributeLocation.Color).set([0, 0, 0, 0.5, 0.7, 0, 0.5, 0.7, 0]);

setInterval(() => {
    RendererServer.clear();
    RendererServer.drawMesh(
        mesh,
        new Material(
            new Shader(
                RendererServer.shaderManager.get('@gengine.base.vertex'),
                RendererServer.shaderManager.get('@gengine.base.fragment'),
            ),
        ),
    );
}, 1000 / 60);
