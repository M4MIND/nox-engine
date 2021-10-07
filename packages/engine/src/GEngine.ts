import CameraComponent from './core/component/rendering/CameraComponent';
import GameObject from './core/object/GameObject';
import Time from './core/time/Time';
import CameraServer from './server/camera/CameraServer';
import EventServer from './server/event/EventServer';
import RendererServer, { IRendererServerSettings } from './server/renderer/RendererServer';
import SceneServer from './server/scene/SceneServer';

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
in vec3 Normals;

uniform mat4 _U_Projection;
uniform vec4 _U_Color;

uniform mat4 _U_Object;
 
out vec4 _F_Color; 
out vec3 _F_Normal;

// all shaders have a main function
void main() {
  // gl_Position is a special variable a vertex shader
  // is responsible for setting
  // gl_Position = _PROJECTION * _POSITION *_ROTATION_Z *_ROTATION_Y * _ROTATION_X * Position;
  gl_Position = _U_Object * Position;
  _F_Normal = Normals;
  _F_Color = _U_Color;
}
@end;

@export @gengine.base.fragment;
@import @gengine.header.webgl2;
// fragment shaders don't have a default precision so we need
// to pick one. highp is a good default. It means "high precision"
precision highp float;
 
// we need to declare an output for the fragment shader
in vec4 _F_Color;
in vec3 _F_Normal;
out vec4 outColor;
 
void main() {
  vec3 normal = normalize(_F_Normal);
  
  float light = dot(normal, normalize(vec3(1.0, 1.0, 0)));

  outColor = _F_Color;
  
  outColor.rgb *= light + vec3(0.8,0.8,0.8);
}
@end;
`;

export default class GEngine {
    constructor(settings: IGEngineSettings) {
        EventServer.startUp();
        Time.startUp();
        CameraServer.startUp();
        SceneServer.startUp();
        RendererServer.startUp(Object.assign(settings.rendererServer));
        RendererServer.shaderManager.add(baseShader);
    }

    public run() {
        EventServer.eventManager.dispatch('onStart');

        this.loop();
    }

    public addGameObject(gameObject: GameObject): GameObject {
        return SceneServer.sceneManager.addObjectToActiveScene(gameObject);
    }

    private loop() {
        window.requestAnimationFrame(() => {
            RendererServer.rendererManager.clear();

            EventServer.eventManager.dispatch('onFixedUpdate');
            EventServer.eventManager.dispatch('onUpdate');
            EventServer.eventManager.dispatch('onLateUpdate');
            EventServer.eventManager.dispatch('onCameraPreparation');
            EventServer.eventManager.dispatch('onWillRendererObject');
            EventServer.eventManager.dispatch('onRenderer');
            EventServer.eventManager.dispatch('onFinish');

            this.loop();
        });
    }
}
