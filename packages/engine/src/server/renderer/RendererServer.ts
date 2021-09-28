import CanvasManager, { ICanvasManagerSettings } from './manager/CanvasManager';
import ContextManager, { IContextManagerSettings } from './manager/ContextManager';
import ProgramManager from './manager/ProgramManager';

interface ISettings {
    canvasManager: ICanvasManagerSettings;
    contextManager: IContextManagerSettings;
}

export default class RendererServer {
    private static _canvasManager: CanvasManager;
    private static _contextManager: ContextManager;
    private static _programManager: ProgramManager;

    static get canvasManager(): CanvasManager {
        return this._canvasManager;
    }

    static get contextManager(): ContextManager {
        return this._contextManager;
    }

    static get programManager(): ProgramManager {
        return this._programManager;
    }

    public static startUp(settings: ISettings) {
        this._canvasManager = new CanvasManager(settings.canvasManager);
        this._contextManager = new ContextManager(settings.contextManager);
        this._programManager = new ProgramManager();
    }
}
