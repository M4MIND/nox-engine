import CameraScript from './scripts/CameraScript';
import ExampleScript from './scripts/ExampleScript';
import { GameObject, GEngine, RendererServer, ScriptComponent, WebGL2Context } from '@gengine/engine';
import CameraComponent from '@gengine/engine/src/core/component/rendering/CameraComponent';

let canvas = document.createElement('canvas');
document.body.appendChild(canvas);

let app = new GEngine({
    rendererServer: {
        canvasManager: {
            canvas: canvas,
            width: window.innerWidth,
            height: window.innerHeight,
        },
        contextManager: {
            context: WebGL2Context,
        },
    },
});

window.addEventListener('resize', () => {
    RendererServer.canvasManager.setViewport(window.innerWidth, window.innerHeight);
});

app.addGameObject(new GameObject())
    .addComponent<CameraComponent>(CameraComponent)
    .gameObject.addComponent<CameraScript>(CameraScript);
app.addGameObject(new GameObject().addComponent<ExampleScript>(ExampleScript).gameObject);

app.run();
