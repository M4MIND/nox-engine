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

out vec4 v_color;
 
// all shaders have a main function
void main() {
 
  // gl_Position is a special variable a vertex shader
  // is responsible for setting
  gl_Position = Position;
  v_color = vec4(Color);
}
@end;

@export @gengine.base.fragment;
@import @gengine.header.webgl2;
// fragment shaders don't have a default precision so we need
// to pick one. highp is a good default. It means "high precision"
precision highp float;
 
// we need to declare an output for the fragment shader
in vec4 v_color;
out vec4 outColor;
 
void main() {
  // Just set the output to a constant reddish-purple
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
