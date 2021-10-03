import { GL_COLOR_BUFFER_BIT, GL_CULL_FACE, GL_DEPTH_BUFFER_BIT, GL_DEPTH_TEST } from './_webgl_consts';
import CanvasManager, { ICanvasManagerSettings } from './manager/CanvasManager';
import ContextManager, { IContextManagerSettings } from './manager/ContextManager';
import ProgramManager from './manager/ProgramManager';
import RendererManager from './manager/RendererManager';
import ShaderManager, { IShaderManagerSettings } from './manager/ShaderManager';

export interface IRendererServerSettings {
    canvasManager: ICanvasManagerSettings;
    contextManager: IContextManagerSettings;
    shaderManager?: IShaderManagerSettings;
}

export default class RendererServer {
    private static _canvasManager: CanvasManager;
    private static _contextManager: ContextManager;
    private static _programManager: ProgramManager;
    private static _shaderManager: ShaderManager;
    private static _rendererManager: RendererManager;

    public static get contextManager(): ContextManager {
        return this._contextManager;
    }

    public static get canvasManager(): CanvasManager {
        return this._canvasManager;
    }

    public static get programManager(): ProgramManager {
        return this._programManager;
    }

    public static get shaderManager(): ShaderManager {
        return this._shaderManager;
    }

    public static get rendererManager(): RendererManager {
        return this._rendererManager;
    }

    public static startUp(settings: IRendererServerSettings) {
        this._canvasManager = new CanvasManager(settings.canvasManager);
        this._contextManager = new ContextManager(settings.contextManager);
        this._programManager = new ProgramManager();
        this._shaderManager = new ShaderManager(settings.shaderManager);
        this._rendererManager = new RendererManager();
    }

    public static clear() {
        this.contextManager.context.viewPort(0, 0, this.canvasManager.width, this.canvasManager.height);
        this.contextManager.context.clearColor(0, 1, 1, 1);
        this.contextManager.context.clear(GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT);
        this.contextManager.context.enable(GL_DEPTH_TEST);
        this.contextManager.context.enable(GL_CULL_FACE);
    }
}
