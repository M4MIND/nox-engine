import {
    GEngine,
    Material,
    Matrix4x4,
    Mesh,
    RendererServer,
    Shader,
    Vector3,
    VertexAttributeSrcData,
    VertexTypeUsage,
    WebGL2Context,
} from '@gengine/engine';
import { UniformType } from '@gengine/engine/src/server/renderer/shader/uniform/IUniform';

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

mesh.createAttributeDescriptor('Position', VertexAttributeSrcData.Float32, 3, VertexTypeUsage.STATIC_DRAW);

mesh.createAttributeDescriptor('Color', VertexAttributeSrcData.Float32, 4, VertexTypeUsage.STATIC_DRAW);

mesh.createAttributeDescriptor('Normal', VertexAttributeSrcData.Float32, 3, VertexTypeUsage.STATIC_DRAW);

mesh.createIndicesDescriptor('Indices', VertexAttributeSrcData.UInt16, VertexTypeUsage.STATIC_DRAW);

mesh.createBuffer('Position').set([
    -0.5, -0.5, 0.5, 0.5, -0.5, 0.5, 0.5, 0.5, 0.5, -0.5, 0.5, 0.5, -0.5, -0.5, -0.5, -0.5, 0.5, -0.5, 0.5, 0.5, -0.5,
    0.5, -0.5, -0.5, -0.5, 0.5, -0.5, -0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, -0.5, -0.5, -0.5, -0.5, 0.5, -0.5, -0.5,
    0.5, -0.5, 0.5, -0.5, -0.5, 0.5, 0.5, -0.5, -0.5, 0.5, 0.5, -0.5, 0.5, 0.5, 0.5, 0.5, -0.5, 0.5, -0.5, -0.5, -0.5,
    -0.5, -0.5, 0.5, -0.5, 0.5, 0.5, -0.5, 0.5, -0.5,
]);
mesh.createBuffer('Color').set(colors);

mesh.createBuffer('Normal').set([
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

mesh.createBuffer('Indices').set([
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
fps.style.position = 'fixed';
fps.style.top = '1em';
fps.style.left = '1em';

document.body.appendChild(fps);

material.createUniform('_TRANSLATION', UniformType.Matrix4x4).set(Matrix4x4.translate(new Vector3(0, 0, -3)));
material.createUniform('_ROTATION_X', UniformType.Matrix4x4).set(Matrix4x4.xRotation(0));
material.createUniform('_ROTATION_Y', UniformType.Matrix4x4).set(Matrix4x4.yRotation(0));
material.createUniform('_ROTATION_Z', UniformType.Matrix4x4).set(Matrix4x4.zRotation(0));
material
    .createUniform('_PROJECTION', UniformType.Matrix4x4)
    .set(
        Matrix4x4.projection(
            (3.14 / 180) * 90,
            RendererServer.canvasManager.width / RendererServer.canvasManager.height,
        ),
    );

material.createUniform('_COLOR', UniformType.Fv4).set([0.5, 0.5, 0.5, 1]);

function a() {
    window.requestAnimationFrame(() => {
        let delta = (Date.now() - time) / 1000;
        rX += 10 * delta;
        rY += 10 * delta;
        rZ += 10 * delta;

        material.getUniform('_ROTATION_X')?.set(Matrix4x4.xRotation((3.14 / 180) * rX));
        material.getUniform('_ROTATION_Y')?.set(Matrix4x4.yRotation((3.14 / 180) * rY));
        material.getUniform('_ROTATION_Z')?.set(Matrix4x4.zRotation((3.14 / 180) * rZ));

        RendererServer.clear();
        RendererServer.rendererManager.drawMesh(mesh, material);

        fps.innerText = `${(1 / delta).toFixed()}`;

        time = Date.now();

        a();
    });
}

a();
