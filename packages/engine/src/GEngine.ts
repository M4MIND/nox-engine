import RendererServer, { IRendererServerSettings } from './server/renderer/RendererServer';

export interface IGEngineSettings {
    rendererServer: IRendererServerSettings;
}

let baseShader = `
@export @gengine.header.webgl2;
#version 300 es
@end;

@export @gengine.base.vertex;
@import @gengine.header.webgl2;
// an attribute is an input (in) to a vertex shader.
// It will receive data from a buffer
in vec4 Position;
in vec4 Color;
in vec3 Normal;

uniform mat4 _TRANSLATION;
uniform mat4 _ROTATION_X;
uniform mat4 _ROTATION_Y;
uniform mat4 _ROTATION_Z;
uniform mat4 _SCALE;
uniform mat4 _PROJECTION;

uniform vec4 _COLOR;

out vec4 v_color;
out vec3 v_normal;
 
// all shaders have a main function
void main() {
 
  // gl_Position is a special variable a vertex shader
  // is responsible for setting
  // gl_Position = _PROJECTION * _POSITION *_ROTATION_Z *_ROTATION_Y * _ROTATION_X * Position;
  gl_Position = _PROJECTION * _TRANSLATION * _ROTATION_Z * _ROTATION_Y * _ROTATION_X * Position;

  v_color = _COLOR;
}
@end;

@export @gengine.base.fragment;
@import @gengine.header.webgl2;
// fragment shaders don't have a default precision so we need
// to pick one. highp is a good default. It means "high precision"
precision highp float;
 
// we need to declare an output for the fragment shader
in vec4 v_color;
in vec3 v_normal;

out vec4 outColor;
 
void main() {
  outColor = v_color;
}
@end;
`;

export default class GEngine {
    constructor(settings: IGEngineSettings) {
        RendererServer.startUp(Object.assign(settings.rendererServer));
        RendererServer.shaderManager.add(baseShader);
    }
}
