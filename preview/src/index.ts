import MonkeyScript from './scripts/MonkeyScript';
import { Color, Engine, GameObject, MeshRendererComponent, PrimitiveTypes } from '@nox-engine/engine';
import { WebGL2Context } from '@nox-engine/renderer';

let canvas = document.createElement('canvas');

document.body.appendChild(canvas);

new Engine({
    rendererSettings: {
        canvasManager: {
            canvas: canvas,
            width: window.innerWidth,
            height: window.innerHeight,
        },
        contextManager: {
            context: WebGL2Context,
        },
    },
}).run(() => {
    for (let x = 0; x < 32; x++) {
        for (let z = 0; z < 32; z++) {
            let object = GameObject.createPrimitive(PrimitiveTypes.Cube);

            object.addComponent(MonkeyScript);

            object.transform.position.z = -16 - z * 2;
            object.transform.position.x = x * 2 - 32;
            object.transform.position.y = 0;
            object.getComponent<MeshRendererComponent>(MeshRendererComponent).material.color = Color.yellow;
        }
    }
});

// let material = new BaseMaterial(new BaseShader(v.trim(), f.trim()));
// let mesh = new BaseMesh();
// let cube = new Cone();
//
// mesh.createAttributeDescriptor('_A_Position', AttributeDescriptorFormat.Float32, 3).set(cube.vertices.flat());
//
// mesh.createAttributeDescriptor('_A_Normal', AttributeDescriptorFormat.Float32, 3).set(cube.normals.flat());
//
// mesh.indicesDescriptor.set(cube.triangles);
//
// material.addUniform(new Uniform4fv('_U_Color')).set(Color.gray);
// material.addUniform(new Uniform4fv('_U_Light_Position')).set([1, -1, 1, 0]);
// material
//     .addUniform(new UniformMatrix4('_U_Projection'))
//     .set(
//         Matrix4.projection((3.14 / 180) * 90, RendererServer.canvasManager.width / RendererServer.canvasManager.height),
//     );
// material
//     .addUniform(new UniformMatrix4('_U_View'))
//     .set(
//         Matrix4.multiplyFromArray([
//             Matrix4.translate(new Vector3(0, 0, 0)),
//             Matrix4.zRotation(0),
//             Matrix4.yRotation(0),
//             Matrix4.xRotation(0),
//         ]),
//     );
//
// let x = 0;
// let y = 0;
// let z = 0;
//
// function a() {
//     window.requestAnimationFrame(() => {
//         x += 0.2;
//         y += 0.2;
//         z += 0.2;
//         material
//             .addUniform(new UniformMatrix4('_U_Model'))
//             .set(
//                 Matrix4.multiplyFromArray([
//                     Matrix4.translate(new Vector3(0, 0, -3)),
//                     Matrix4.zRotation((3.14 / 180) * z),
//                     Matrix4.yRotation((3.14 / 180) * y),
//                     Matrix4.xRotation((3.14 / 180) * x),
//                     Matrix4.scale(new Vector3(1, 1, 1)),
//                 ]),
//             );
//
//         RendererServer.rendererManager.clear();
//         RendererServer.rendererManager.drawMesh(mesh, material);
//         a();
//     });
// }
//
// a();
//
// let xhr = new XMLHttpRequest();
//
// xhr.open('GET', '/src/Cylinder.obj');
//
// xhr.send();
//
// xhr.onload = () => {
//     console.log(ObjectParser.parse(xhr.response));
// };

// let v = `
// #version 300 es
// precision highp float;
//
// uniform vec4 _U_Color;
// uniform mat4 _U_Model;
// uniform mat4 _U_View;
// uniform mat4 _U_Projection;
//
// in vec4 _A_Position;
// in vec4 _A_Normal;
//
// out vec3 _F_Normal;
//
// void main() {
//     gl_Position = _U_Projection * _U_View * _U_Model * _A_Position;
//     _F_Normal = vec3(_A_Normal);
// }
// `;
//
// let f = `
// #version 300 es
// precision highp float;
//
// in vec4 _F_Color;
// in vec3 _F_Normal;
//
// uniform vec4 _U_Color;
// uniform vec4 _U_Light_Position;
//
// out vec4 outColor;
//
// void main() {
//     vec3 normal = normalize(_F_Normal);
//
//     float light = dot(normal, vec3(1,1,0));
//
//     outColor = _U_Color;
//
//     outColor.rgb *= light;
// }
// `;
