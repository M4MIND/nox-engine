import { CameraComponent, GameObject, ScriptComponent, Time } from '@nox-engine/engine';
import Input from '@nox-engine/engine/src/core/input/Input';
import { Mathf, Vector3 } from '@nox-engine/mathf';
import InfoScript from './InfoScript';

export default class CameraScript extends ScriptComponent {
    private info: InfoScript = GameObject.createEmpty().addComponent(InfoScript);

    public start() {
        this.gameObject.getComponent<CameraComponent>(CameraComponent).fieldOfView = 90;

        this.gameObject.transform.position = new Vector3(0, 0, -10);
        this.gameObject.transform.rotation.axisAngle(new Vector3(0, -1, 0), Mathf.rad2deg * 180);
    }

    public update() {
        this.info.clear();

        this.info.addInfo(`FPS: ${(1/ Time.deltaTime).toFixed(1)} \n\n`)
        this.info.addInfo(`You can use [w a s d] for move camera by axis [X] [Z]\n\n`)
        this.info.addInfo(`Pressed: [`)

        if (Input.pressUp('w')) {
            this.transform.position.z += Time.deltaTime * 4;

            this.info.addInfo(` w `);
        }

        if (Input.pressUp('s')) {
            this.transform.position.z -= Time.deltaTime * 4;

            this.info.addInfo(` s `);
        }

        if (Input.pressUp('a')) {
            this.transform.position.x += Time.deltaTime * 4;

            this.info.addInfo(` a `);
        }

        if (Input.pressUp('d')) {
            this.transform.position.x -= Time.deltaTime * 4;

            this.info.addInfo(` d `);
        }

        this.info.addInfo(` ]\n`)

        this.info.addInfo(`\nCamera position: \nx: ${this.transform.position.x}\ny: ${this.transform.position.y}\nz:${this.transform.position.z}\n`);
        this.info.addInfo(`\nCursor position: \nx: ${Input.mousePosition.x}\ny:${Input.mousePosition.y}`);
    }
}