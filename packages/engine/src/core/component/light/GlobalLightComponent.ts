import EventManager, { CoreEvents } from '../../EventManager';
import Color from '../../graphics/material/color/Color';
import Shader from '../../graphics/shader/Shader';
import SceneManager from '../../scene/SceneManager';
import BaseComponent from '../BaseComponent';
import { Vector3 } from '@nox-engine/mathf';

export default class GlobalLightComponent extends BaseComponent {
    private _color: Color = Color.white;
    private _ambient: Color = Color.white;

    get color(): Color {
        return this._color;
    }

    set color(value: Color) {
        this._color = value;
    }

    get ambient(): Color {
        return this._ambient;
    }

    set ambient(value: Color) {
        this._ambient = value;
    }

    public onPreRender() {
        Shader.getGlobalUniform('_U_LightAmbient')?.set([this._ambient[0], this._ambient[1], this._ambient[2]]);
        Shader.getGlobalUniform('_U_LightDirectionColor')?.set([this._color[0], this._color[1], this._color[2]]);
        Shader.getGlobalUniform('_U_LightDirection')?.set(Vector3.normalize(this.transform.position));
    }

    protected preparation(): void {
        SceneManager.activeScene.subscribe(CoreEvents.PRE_RENDER, this.onPreRender.bind(this), this.id);
    }
}