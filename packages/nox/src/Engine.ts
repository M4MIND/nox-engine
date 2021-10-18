import { RendererServer } from '@nox-engine/renderer';
import { IRendererServerSettings } from '@nox-engine/renderer/src/RendererServer';

interface IEngineSettings {
    rendererSettings: IRendererServerSettings;
}

export default class Engine {
    constructor(settings: IEngineSettings) {
        RendererServer.startUp(settings.rendererSettings);
    }

    public run() {}
}
