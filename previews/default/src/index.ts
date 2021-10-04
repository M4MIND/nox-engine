// import {
//     GEngine,
//     Material,
//     Matrix4x4,
//     BaseMesh,
//     RendererServer,
//     Shader,
//     UniformType,
//     Vector3,
//     VertexAttributeSrcData,
//     VertexTypeUsage,
//     WebGL2Context,
// } from '@gengine/engine';
//
// declare global {
//     interface Window {
//         gengine: GEngine;
//     }
// }
//
// let canvas = document.createElement('canvas');
// document.body.appendChild(canvas);
//
// new GEngine({
//     rendererServer: {
//         canvasManager: {
//             canvas: canvas,
//             width: window.innerWidth,
//             height: window.innerHeight,
//         },
//         contextManager: {
//             context: WebGL2Context,
//         },
//     },
// });
//
// let mesh = new BaseMesh();
//
// mesh.createAttributeDescriptor('Position', VertexAttributeSrcData.Float32, 3, VertexTypeUsage.STATIC_DRAW);
//
// mesh.createAttributeDescriptor('Normal', VertexAttributeSrcData.Float32, 3, VertexTypeUsage.STATIC_DRAW);
//
// mesh.createIndicesDescriptor('Indices', VertexAttributeSrcData.UInt16, VertexTypeUsage.STATIC_DRAW);
//
// mesh.createBuffer('Position').set([
//     -0.5, -0.5, 0.5, 0.5, -0.5, 0.5, 0.5, 0.5, 0.5, -0.5, 0.5, 0.5, -0.5, -0.5, -0.5, -0.5, 0.5, -0.5, 0.5, 0.5, -0.5,
//     0.5, -0.5, -0.5, -0.5, 0.5, -0.5, -0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, -0.5, -0.5, -0.5, -0.5, 0.5, -0.5, -0.5,
//     0.5, -0.5, 0.5, -0.5, -0.5, 0.5, 0.5, -0.5, -0.5, 0.5, 0.5, -0.5, 0.5, 0.5, 0.5, 0.5, -0.5, 0.5, -0.5, -0.5, -0.5,
//     -0.5, -0.5, 0.5, -0.5, 0.5, 0.5, -0.5, 0.5, -0.5,
// ]);
//
// mesh.createBuffer('Normal').set([
//     // Front
//     0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0,
//
//     // Back
//     0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0,
//
//     // Top
//     0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0,
//
//     // Bottom
//     0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0,
//
//     // Right
//     1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0,
//
//     // Left
//     -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0,
// ]);
//
// mesh.createBuffer('Indices').set([
//     0, 1, 2, 0, 2, 3, 4, 5, 6, 4, 6, 7, 8, 9, 10, 8, 10, 11, 12, 13, 14, 12, 14, 15, 16, 17, 18, 16, 18, 19, 20, 21, 22,
//     20, 22, 23, 20, 21, 22, 20, 22, 23,
// ]);
//
// let material = new Material(
//     new Shader(
//         RendererServer.shaderManager.get('@gengine.base.vertex'),
//         RendererServer.shaderManager.get('@gengine.base.fragment'),
//     ),
// );
//
// material.createUniform('_TRANSLATE', UniformType.Matrix4x4).set(Matrix4x4.translate(new Vector3(0, 0, -3)));
// material.createUniform('_SCALE', UniformType.Matrix4x4).set(Matrix4x4.scale(new Vector3(1, 1, 1)));
// material.createUniform('_ROTATION_X', UniformType.Matrix4x4).set(Matrix4x4.xRotation(0));
// material.createUniform('_ROTATION_Y', UniformType.Matrix4x4).set(Matrix4x4.yRotation(0));
// material.createUniform('_ROTATION_Z', UniformType.Matrix4x4).set(Matrix4x4.zRotation(0));
// material.createUniform('_COLOR', UniformType.Fv4).set([0.2, 0.2, 0.5, 1]);
// material
//     .createUniform('_PROJECTION', UniformType.Matrix4x4)
//     .set(
//         Matrix4x4.projection(
//             (3.14 / 180) * 90,
//             RendererServer.canvasManager.width / RendererServer.canvasManager.height,
//         ),
//     );
//
// let scale = new Vector3(1, 1, 1);
//
// function a() {
//     window.requestAnimationFrame(() => {
//         RendererServer.rendererManager.clear();
//         RendererServer.rendererManager.drawMesh(mesh, material);
//
//         a();
//     });
// }
//
// a();
import ExampleScript from './scripts/ExampleScript';
import {
    GameObject,
    GEngine,
    Material,
    MeshFilterComponent,
    MeshRendererComponent,
    RendererServer,
    Shader,
    WebGL2Context,
} from '@gengine/engine';
import Cube from '@gengine/engine/src/core/mesh/base/Cube';

let canvas = document.createElement('canvas');
document.body.appendChild(canvas);

let app = new GEngine({
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

for (let i = 0; i < 4000; i++) {
    let baseObject = new GameObject();

    baseObject.addComponent<ExampleScript>(ExampleScript);
    baseObject.addComponent<MeshFilterComponent>(MeshFilterComponent).mesh = new Cube();
    baseObject.addComponent<MeshRendererComponent>(MeshRendererComponent).material = new Material(
        new Shader(
            RendererServer.shaderManager.get('@gengine.base.vertex'),
            RendererServer.shaderManager.get('@gengine.base.fragment'),
        ),
    );

    app.addGameObject(baseObject);
}

app.run();
