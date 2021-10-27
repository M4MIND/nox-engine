import { Mathf, Matrix4, Vector3 } from '@nox-engine/mathf';
import { RendererServer, Uniform3fv, UniformMatrix4 } from '@nox-engine/renderer';
import { IRendererServerSettings } from '@nox-engine/renderer/src/RendererServer';
import EventManager, { CoreEvents } from './core/EventManager';
import Graphics from './core/graphics/Graphics';
import Shader from './core/graphics/shader/Shader';
import SceneManager from './core/scene/SceneManager';
import Time from './core/time/Time';

interface IEngineSettings {
    rendererSettings: IRendererServerSettings;
}

export default class Engine {
    constructor(settings: IEngineSettings) {
        SceneManager.startUp();
        RendererServer.startUp(settings.rendererSettings);
        Time.startUp();

        Shader.addGlobalUniform(new UniformMatrix4('_U_View')).set(new Matrix4());
        Shader.addGlobalUniform(new Uniform3fv('_U_LightAmbient')).set([0, 0, 0]);
        Shader.addGlobalUniform(new Uniform3fv('_U_LightDirectionColor')).set([0, 0, 0]);
        Shader.addGlobalUniform(new Uniform3fv('_U_LightDirection')).set(Vector3.normalize(new Vector3(0, 0, 0)));
        Shader.addGlobalUniform(new UniformMatrix4('_U_Projection')).set(Matrix4.projection(
            Mathf.rad2deg * 120,
            RendererServer.canvasManager.canvas.width / RendererServer.canvasManager.canvas.height,
        ));
    }

    public run(preparation: () => void = () => {}) {
        preparation();

        EventManager.dispatch(CoreEvents.START);

        this.tick();
    }

    private tick() {
        window.requestAnimationFrame(() => {
            EventManager.dispatch(CoreEvents.FIXED_UPDATE);
            EventManager.dispatch(CoreEvents.UPDATE);

            Graphics.clear();
            EventManager.dispatch(CoreEvents.CAMERA);
            EventManager.dispatch(CoreEvents.PRE_RENDER);
            EventManager.dispatch(CoreEvents.RENDERER_OBJECT);

            this.tick();
        });
    }
}
