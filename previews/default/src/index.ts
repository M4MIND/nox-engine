import { GEngine, Material, Matrix4x4, Mesh, RendererServer, Shader, Vector3, WebGL2Context } from '@gengine/engine';
import {
    VertexAttributeLocation,
    VertexAttributeSrcData,
    VertexTypeUsage,
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

const faceColors = [
    [1.0, 1.0, 1.0, 1.0],
    [1.0, 0.0, 0.0, 1.0],
    [0.0, 1.0, 0.0, 1.0],
    [0.0, 0.0, 1.0, 1.0],
    [1.0, 1.0, 0.0, 1.0],
    [1.0, 0.0, 1.0, 1.0],
];

let colors: number[] = [];

for (let j = 0; j < faceColors.length; ++j) {
    const c = faceColors[j];

    colors = colors.concat(c, c, c, c);
}

let mesh = new Mesh();

mesh.createAttributeDescriptor(
    VertexAttributeLocation.Position,
    VertexAttributeSrcData.Float32,
    3,
    VertexTypeUsage.STATIC_DRAW,
);

mesh.createAttributeDescriptor(
    VertexAttributeLocation.Color,
    VertexAttributeSrcData.Float32,
    4,
    VertexTypeUsage.STATIC_DRAW,
);

mesh.createAttributeDescriptor(
    VertexAttributeLocation.Normal,
    VertexAttributeSrcData.Float32,
    3,
    VertexTypeUsage.STATIC_DRAW,
);

mesh.createIndicesDescriptor(
    VertexAttributeLocation.Indices,
    VertexAttributeSrcData.UInt16,
    VertexTypeUsage.STATIC_DRAW,
);

mesh.createBuffer(VertexAttributeLocation.Position).set([
    -0.5, -0.5, 0.5, 0.5, -0.5, 0.5, 0.5, 0.5, 0.5, -0.5, 0.5, 0.5, -0.5, -0.5, -0.5, -0.5, 0.5, -0.5, 0.5, 0.5, -0.5,
    0.5, -0.5, -0.5, -0.5, 0.5, -0.5, -0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, -0.5, -0.5, -0.5, -0.5, 0.5, -0.5, -0.5,
    0.5, -0.5, 0.5, -0.5, -0.5, 0.5, 0.5, -0.5, -0.5, 0.5, 0.5, -0.5, 0.5, 0.5, 0.5, 0.5, -0.5, 0.5, -0.5, -0.5, -0.5,
    -0.5, -0.5, 0.5, -0.5, 0.5, 0.5, -0.5, 0.5, -0.5,
]);
mesh.createBuffer(VertexAttributeLocation.Color).set(colors);

mesh.createBuffer(VertexAttributeLocation.Normal).set([
    // Front
    0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0,

    // Back
    0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0,

    // Top
    0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0,

    // Bottom
    0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0,

    // Right
    1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0,

    // Left
    -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0,
]);

mesh.createBuffer(VertexAttributeLocation.Indices).set([
    0, 1, 2, 0, 2, 3, 4, 5, 6, 4, 6, 7, 8, 9, 10, 8, 10, 11, 12, 13, 14, 12, 14, 15, 16, 17, 18, 16, 18, 19, 20, 21, 22,
    20, 22, 23, 20, 21, 22, 20, 22, 23,
]);

let material = new Material(
    new Shader(
        RendererServer.shaderManager.get('@gengine.base.vertex'),
        RendererServer.shaderManager.get('@gengine.base.fragment'),
    ),
);

let rX = 0;
let rY = 0;
let rZ = 0;

let time = Date.now();

let fps = document.createElement('div');
let POSITION = new Vector3();

fps.style.position = 'fixed';
fps.style.top = '1em';
fps.style.left = '1em';

document.body.appendChild(fps);

function a() {
    window.requestAnimationFrame(() => {
        let delta = (Date.now() - time) / 1000;
        rX += 180 * delta;
        rY += 180 * delta;
        rZ += 180 * delta;

        POSITION.x += 0 * delta;
        POSITION.y += 0 * delta;
        POSITION.z += -3 * delta;

        material.setMatrix('_POSITION', Matrix4x4.translate(POSITION));
        material.setMatrix('_SCALE', Matrix4x4.scale(new Vector3(0.5, 0.5, 0.5)));
        material.setMatrix('_ROTATION_X', Matrix4x4.xRotation((3.14 / 180) * rX));
        material.setMatrix('_ROTATION_Y', Matrix4x4.yRotation((3.14 / 180) * rY));
        material.setMatrix('_ROTATION_Z', Matrix4x4.zRotation((3.14 / 180) * rZ));
        material.setMatrix(
            '_PROJECTION',
            Matrix4x4.projection(
                (3.14 / 180) * 90,
                RendererServer.canvasManager.canvas.width / RendererServer.canvasManager.canvas.height,
            ),
        );

        RendererServer.clear();
        RendererServer.drawMesh(mesh, material);

        fps.innerText = `${(1 / delta).toFixed()}`;

        time = Date.now();

        a();
    });
}

a();
