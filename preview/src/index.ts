import { Engine, GameObject, Shader } from '@nox-engine/engine';
import { Mathf, Matrix4, Quaternion, Vector3 } from '@nox-engine/mathf';
import { UniformMatrix4, WebGL2Context } from '@nox-engine/renderer';
import MainScript from './scripts/MainScript';

let canvas = document.createElement('canvas');

document.body.appendChild(canvas);

new Engine({
    rendererSettings: {
        canvasManager: { canvas: canvas, width: window.innerWidth, height: window.innerHeight },
        contextManager: {
            context: WebGL2Context,
        },
    },
}).run(() => {
    GameObject.createEmpty().addComponent(MainScript);

});