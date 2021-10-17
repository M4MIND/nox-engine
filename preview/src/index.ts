import { Engine, Material, Mesh, Shader } from '../../packages/nox';
import { RendererServer, WebGL2Context } from '@nox-engine/renderer';

let v = `
#version 300 es
precision highp float;
uniform vec4 _U_Color;

in vec4 _A_Position;

out vec4 _F_Color; 

void main() {
    gl_Position = _A_Position;
}
`;

let f = `
#version 300 es
precision highp float;

uniform vec4 _U_Color;

out vec4 outColor;
in vec4 _F_Color;

void main() {
    outColor = _U_Color;
}
`;

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
});

let material = new Material(new Shader(v.trim(), f.trim()));
let mesh = new Mesh();

mesh.getAttributeDescriptor('_A_Position')?.set([-0.5, 0.5, 0.0, -0.5, -0.5, 0.0, 0.5, -0.5, 0.0]);

function a() {
    window.requestAnimationFrame(() => {
        RendererServer.rendererManager.clear();
        RendererServer.rendererManager.drawMesh(mesh, material);
        a();
    });
}

a();
