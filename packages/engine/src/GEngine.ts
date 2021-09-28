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
void main() {
}
@end;

@export @gengine.base.fragment;
@import @gengine.header.webgl2;
void main() {


}
@end;
`;

export default class GEngine {
    constructor(settings: IGEngineSettings) {
        RendererServer.startUp(Object.assign(settings.rendererServer));
        RendererServer.shaderManager.add(baseShader);
    }
}
