import EventManager, { EventManagerEvents } from './core/EventManager';
import Graphics from './core/graphics/Graphics';
import SceneManager from './core/scene/SceneManager';
import Time from './core/time/Time';
import { RendererServer } from '@nox-engine/renderer';
import { IRendererServerSettings } from '@nox-engine/renderer/src/RendererServer';

interface IEngineSettings {
    rendererSettings: IRendererServerSettings;
}

export default class Engine {
    constructor(settings: IEngineSettings) {
        SceneManager.startUp();
        RendererServer.startUp(settings.rendererSettings);
        Time.startUp();
    }

    public run(preparation: () => void = () => {}) {
        preparation();

        EventManager.dispatch(EventManagerEvents.START);

        this.tick();
    }

    private tick() {
        window.requestAnimationFrame(() => {
            EventManager.dispatch(EventManagerEvents.FIXED_UPDATE);
            EventManager.dispatch(EventManagerEvents.UPDATE);

            Graphics.clear();
            EventManager.dispatch(EventManagerEvents.RENDERER_OBJECT);

            this.tick();
        });
    }
}
