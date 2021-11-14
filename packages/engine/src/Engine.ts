import { Matrix4, Vector3 } from '@nox-engine/mathf';
import { RendererServer, Uniform3fv, UniformMatrix4 } from '@nox-engine/renderer';
import { IRendererServerSettings } from '@nox-engine/renderer/src/RendererServer';
import { BasicUniforms, Cursor } from '..';
import Debugger from './core/debug/Debugger';

import EventManager, { CoreEvents } from './core/EventManager';
import Graphics from './core/graphics/Graphics';
import Shader from './core/graphics/shader/Shader';
import Input from './core/input/Input';
import SceneManager from './core/scene/SceneManager';
import Time from './core/time/Time';

interface IEngineSettings {
    rendererSettings: IRendererServerSettings;
}

export default class Engine {
    constructor(settings: IEngineSettings) {
        SceneManager.startUp();
        RendererServer.startUp(settings.rendererSettings);
        Input.startUp();
        Cursor.startUp();
        Time.startUp();

        Shader.addGlobalUniform(new UniformMatrix4(BasicUniforms.VIEW)).set(new Matrix4());
        Shader.addGlobalUniform(new UniformMatrix4(BasicUniforms.PROJECTION)).set(new Matrix4());
        Shader.addGlobalUniform(new Uniform3fv(BasicUniforms.LIGHT_AMBIENT_COLOR)).set([0, 0, 0]);
        Shader.addGlobalUniform(new Uniform3fv(BasicUniforms.LIGHT_DIRECTION_COLOR)).set([0, 0, 0]);
        Shader.addGlobalUniform(new Uniform3fv(BasicUniforms.LIGHT_DIRECTION_POSITION)).set(Vector3.normalize(new Vector3(0, 0, 0)));
    }

    public run(preparation: () => void = () => {}) {
        preparation();

        SceneManager.activeScene.dispatch(CoreEvents.START);

        this.tick();
    }

    private tick() {
        window.requestAnimationFrame(() => {
            Graphics.clear();
            SceneManager.activeScene.dispatch(CoreEvents.UPDATE);
            SceneManager.activeScene.dispatch(CoreEvents.PRE_RENDER);
            SceneManager.activeScene.dispatch(CoreEvents.CAMERA);
            SceneManager.activeScene.dispatch(CoreEvents.RENDERER_OBJECT);
            SceneManager.activeScene.dispatch(CoreEvents.FIXED_UPDATE);
            this.tick();
        });
    }
}
