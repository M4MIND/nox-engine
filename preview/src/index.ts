import MonkeyScript from './scripts/MonkeyScript';
import { Color, Engine, GameObject, MeshRendererComponent, PrimitiveTypes } from '@nox-engine/engine';
import { WebGL2Context } from '@nox-engine/renderer';

let canvas = document.createElement('canvas');

document.body.appendChild(canvas);

new Engine({
    rendererSettings: {
        canvasManager: {
            canvas: canvas,
            width: window.innerWidth,
            height: window.innerHeight,
        },
        contextManager: {
            context: WebGL2Context,
        },
    },
}).run(() => {
    for (let x = 0; x < 32; x++) {
        for (let z = 0; z < 32; z++) {
            let object = GameObject.createPrimitive(PrimitiveTypes.Cube);

            object.addComponent(MonkeyScript);

            object.transform.position.z = -16 - z * 2;
            object.transform.position.x = x * 2 - 32;
            object.transform.position.y = 0;
            object.getComponent<MeshRendererComponent>(MeshRendererComponent).material.color = Color.yellow;
        }
    }
});
