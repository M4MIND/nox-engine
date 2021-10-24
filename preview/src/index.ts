import { Color, Engine, GameObject, MeshRendererComponent, PrimitiveTypes, Shader } from '@nox-engine/engine';
import { RendererServer, Uniform3fv, UniformMatrix4, WebGL2Context } from '@nox-engine/renderer';
import AnimateEmoji from './scripts/AnimateEmoji';
import Information from './scripts/Information';
import { Angle, Matrix4, Vector3 } from '@nox-engine/mathf';

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
    let image = new Image();
    image.src = '/imgonline-com-ua-Resize-3GODL1IOwX.png';

    GameObject.createEmpty().addComponent(Information);

    Shader.addUniform(new UniformMatrix4('_U_View')).set(
        Matrix4.multiplyFromArray([
            Matrix4.translate(new Vector3(0, 0, 0)),
            Matrix4.zRotation(0),
            Matrix4.yRotation(0),
            Matrix4.xRotation(0),
        ]),
    );

    Shader.addUniform(new UniformMatrix4('_U_Projection')).set(Matrix4.projection(
        Angle.degreesToRadians(90),
        RendererServer.canvasManager.canvas.width / RendererServer.canvasManager.canvas.height,
    ));
    Shader.addUniform(new Uniform3fv('_U_LightAmbient')).set([1, 0.4, 0.4]);
    Shader.addUniform(new Uniform3fv('_U_LightDirectionColor')).set([1, 1, 1]);
    Shader.addUniform(new Uniform3fv('_U_LightDirection')).set(Vector3.normalize(new Vector3(0, 0, 1)));

    image.onload = () => {
        createImageBitmap(image).then(data => {
            let canvas = document.createElement('canvas');

            canvas.width = data.width;
            canvas.height = data.height;

            let context = canvas.getContext('2d');

            if (!context) {
                return;
            }

            context.drawImage(image, 0, 0);

            let bitmap = context.getImageData(0, 0, data.width, data.height);

            for (let _y = 0; _y < data.height; _y++) {
                for (let _x = 0; _x < data.width; _x++) {
                    let object = GameObject.createPrimitive(PrimitiveTypes.Cube);
                    object.addComponent<AnimateEmoji>(AnimateEmoji);

                    object.transform.position.z = -36;
                    object.transform.position.x = data.width - _x - data.width / 2;
                    object.transform.position.y = data.height - _y - data.height / 2;

                    let i = (_x + _y * data.width) * 4;

                    object.getComponent<MeshRendererComponent>(MeshRendererComponent).material.color = new Color(
                        bitmap.data[i] / 255,
                        bitmap.data[i + 1] / 255,
                        bitmap.data[i + 2] / 255,
                        bitmap.data[i + 3] / 255,
                    );
                }
            }
        });
    };
});