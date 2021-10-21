import { BaseShader } from '@nox-engine/renderer';

let v = `
#version 300 es
precision highp float;

uniform vec4 _U_Color;
uniform mat4 _U_Model;
uniform mat4 _U_View;
uniform mat4 _U_Projection;

in vec4 _A_Position;
in vec4 _A_Normal;

out vec3 _F_Normal;

void main() {
    gl_Position = _U_Projection * _U_View * _U_Model * _A_Position;
    _F_Normal = vec3(_A_Normal);
}
`;

let f = `
#version 300 es
precision highp float;

in vec4 _F_Color;
in vec3 _F_Normal;

uniform vec4 _U_Color;
uniform vec3 _U_LightDirectionColor;
uniform vec3 _U_LightDirection;
uniform vec3 _U_LightAmbient;
uniform mat4 _U_ModelInvertMatrix;

out vec4 outColor;

void main() {
    vec3 normal = normalize(vec3(_U_ModelInvertMatrix * vec4(_F_Normal, 1)));
    float nDotL = max(dot(_U_LightDirection, normal), 0.0);
    outColor = _U_Color;
    
    outColor.rgb *= (_U_LightAmbient + _U_LightDirectionColor) * nDotL;
}
`;

export default class Shader extends BaseShader {
    public static find(name: string): Shader {
        return new Shader(v.trim(), f.trim());
    }
}
