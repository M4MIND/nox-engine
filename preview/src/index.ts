import { Engine, GameObject } from '@nox-engine/engine';
import { WebGL2Context } from '@nox-engine/renderer';
import Hash from '@nox-engine/renderer/src/utils/Hash';
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
    GameObject.createEmpty('Main script').addComponent(MainScript);
});

console.dir(Hash.uuid());