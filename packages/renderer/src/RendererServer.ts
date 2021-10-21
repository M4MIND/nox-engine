import CanvasManager, { ICanvasManagerSettings } from './manager/CanvasManager';
import ContextManager, { IContextManagerSettings } from './manager/ContextManager';
import ProgramManager from './manager/ProgramManager';
import RendererManager from './manager/RendererManager';

export interface IRendererServerSettings {
    canvasManager: ICanvasManagerSettings;
    contextManager: IContextManagerSettings;
}

export default class RendererServer {
    private static _canvasManager: CanvasManager;
    private static _contextManager: ContextManager;
    private static _programManager: ProgramManager;
    private static _rendererManager: RendererManager;

    public static get canvasManager(): CanvasManager {
        return this._canvasManager;
    }

    public static get contextManager(): ContextManager {
        return this._contextManager;
    }

    public static get programManager(): ProgramManager {
        return this._programManager;
    }

    public static get rendererManager(): RendererManager {
        return this._rendererManager;
    }

    public static startUp(settings: IRendererServerSettings) {
        this._canvasManager = new CanvasManager(settings.canvasManager);
        this._contextManager = new ContextManager(settings.contextManager);
        this._programManager = new ProgramManager();
        this._rendererManager = new RendererManager();
    }
}
