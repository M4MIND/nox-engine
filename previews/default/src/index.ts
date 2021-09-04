import {
    ArrayFloat32Attribute,
    ElementArrayBuffer,
    FragmentShader,
    Material,
    Matrix4,
    RendererServer,
    ShaderWrapper,
    UniformMat4fv,
    Vector3,
    VertexShader
} from "@gengine/engine";
import CubeMesh from "@gengine/engine/src/mesh/CubeMesh";
import Mesh from "@gengine/engine/src/server/renderer/Mesh";

import {SuzanneMesh} from "@gengine/engine/src/mesh/SuzanneMesh";
//attribute vec4 a_vertex_position : POSITION;
const vertexShader = `#version 300 es

layout (location = 0) in vec4 a_vertex_position;
layout (location = 1) in vec4 a_vertex_color;

uniform mat4 u_position_matrix;
uniform mat4 u_scale_matrix;
uniform mat4 u_x_rotation_matrix;
uniform mat4 u_y_rotation_matrix;
uniform mat4 u_z_rotation_matrix;
uniform mat4 u_projection_matrix;

out vec4 vColor;

void main(void) {
    gl_Position = u_projection_matrix * u_position_matrix * u_x_rotation_matrix * u_y_rotation_matrix * u_x_rotation_matrix * u_scale_matrix * a_vertex_position;

    vColor = a_vertex_color;
}`;

const fragmentShader = `#version 300 es
precision mediump float;

in vec4 vColor;
out vec4 vColorOut;

void main(void) {
    vColorOut = vColor;
}`;

let canvas = document.createElement('canvas');

document.body.appendChild(canvas);

document.body.style.margin = "0";
document.body.style.padding = "0";

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

RendererServer.startUp(canvas);

let collection: { mesh: Mesh, material: Material }[] = [];

for (let i = 0; i < 1; i++) {
    let mesh = new CubeMesh();

    let material1 = new Material(new ShaderWrapper(new VertexShader(vertexShader), new FragmentShader(fragmentShader)));

    material1.shader.vertexShader.createAttribute<ArrayFloat32Attribute>('a_vertex_position', RendererServer.contextManager.context.FLOAT, 3, ArrayFloat32Attribute);
    material1.shader.vertexShader.createAttribute<ArrayFloat32Attribute>('a_vertex_color', RendererServer.contextManager.context.FLOAT, 3, ArrayFloat32Attribute);
    material1.shader.vertexShader.createAttribute<ElementArrayBuffer>('a_elements', RendererServer.contextManager.context.FLOAT, 3, ElementArrayBuffer);

    material1.shader.vertexShader.createUniform<UniformMat4fv>('u_scale_matrix', UniformMat4fv).set(Matrix4.scale(new Vector3(0.5, 0.5, 0.5)));
    material1.shader.vertexShader.createUniform<UniformMat4fv>('u_position_matrix', UniformMat4fv).set(Matrix4.translate(new Vector3(Math.random() > 0.5 ? Math.random() * 8 : Math.random() * -8, Math.random() > 0.5 ? Math.random() * 8 : Math.random() * -8, Math.random() * -20 - 5)));
    material1.shader.vertexShader.createUniform<UniformMat4fv>('u_x_rotation_matrix', UniformMat4fv).set(Matrix4.xRotation(Math.random() * 100 / 180 * Math.PI));
    material1.shader.vertexShader.createUniform<UniformMat4fv>('u_y_rotation_matrix', UniformMat4fv).set(Matrix4.yRotation(Math.random() * 100 / 180 * Math.PI));
    material1.shader.vertexShader.createUniform<UniformMat4fv>('u_z_rotation_matrix', UniformMat4fv).set(Matrix4.zRotation(Math.random() * 100 * Math.PI));
    material1.shader.vertexShader.createUniform<UniformMat4fv>('u_projection_matrix', UniformMat4fv).set(Matrix4.projection(90 / 180 * Math.PI, RendererServer.canvasManager.canvas.width / RendererServer.canvasManager.canvas.height, 1, 2000));

    material1.shader.vertexShader.attributes.a_vertex_position.fromVector3(mesh.vertexes);

    material1.shader.vertexShader.attributes.a_elements.fromArray(mesh.triangles);

    material1.shader.vertexShader.attributes.a_vertex_color.fromVector3(mesh.vertexes.map(i => {
        return new Vector3(Math.random(), Math.random(), Math.random());
    }));

    collection.push({mesh: mesh, material: material1});
}

RendererServer.renderMesh(collection);

//RendererServer.renderMesh(collection)

//RendererServer.renderPass(collection);

// import {Engine, GameObject} from "@gengine/engine";
// import MeshFilter from "@gengine/engine/src/core/component/mesh/MeshFilter";
// import MeshRenderer from "@gengine/engine/src/core/component/mesh/MeshRenderer";
//
// let app = new Engine(document.getElementById('canvas') as HTMLCanvasElement);
// let object = new GameObject();
//
// object.addComponent<MeshFilter>(MeshFilter);
// object.addComponent<MeshRenderer>(MeshRenderer);
//
// app.canvas.setViewport(window.innerWidth, window.innerHeight);
// app.scene.addObject(object);