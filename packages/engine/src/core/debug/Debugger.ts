import { Vector3 } from '@nox-engine/mathf';
import Graphics from '../graphics/Graphics';
import Color from '../graphics/material/color/Color';
import Material from '../graphics/material/Material';
import Mesh from '../graphics/mesh/Mesh';
import Shader from '../graphics/shader/Shader';

let v = `
#version 300 es
precision highp float;

in vec4 _A_Position;
in vec4 _A_Normal;

uniform mat4 _U_View;
uniform mat4 _U_Projection;

void main() {
    gl_Position = _U_Projection *  _U_View * _A_Position;
}
`;

let f = `
#version 300 es
precision highp float;

out vec4 outColor;

uniform vec4 _U_Color;

void main() {
    outColor = _U_Color;
}
`;

export default class Debugger {
    private static mesh: Mesh;
    private static material: Material;

    public static startUp() {
        this.mesh = new Mesh();
        this.material = new Material(new Shader(v.trim(), f.trim()));
    }

    public static drawLine(start: Vector3, end: Vector3, color: Color = Color.red) {
        this.mesh.vertices = [start, end];
        this.mesh.normals = [start, end];
        this.mesh.triangles = [0, 1];

        this.material.color = color;

        Graphics.drawWireframe(this.mesh, this.material);
    }
}