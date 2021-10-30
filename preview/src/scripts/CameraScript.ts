import { CameraComponent, Cursor, GameObject, ScriptComponent, Time } from '@nox-engine/engine';
import Input from '@nox-engine/engine/src/core/input/Input';
import { Mathf, Vector3 } from '@nox-engine/mathf';
import InfoScript from './InfoScript';

export default class CameraScript extends ScriptComponent {
    private info: InfoScript = GameObject.createEmpty().addComponent(InfoScript);
    private moveX: number = 0;
    private moveY: number = 0;
    private senseX: number = 5;
    private senseY: number = 5;

    public start() {
        this.gameObject.getComponent<CameraComponent>(CameraComponent).fieldOfView = 90;
        this.transform.position.x = 32;
        this.transform.position.y = 0;
        this.transform.position.z = -32;

        this.gameObject.transform.position = new Vector3(0, 0, -10);
        this.gameObject.transform.rotation.axisAngle(new Vector3(0, -1, 0), Mathf.rad2deg * 180);
    }

    public update() {
        this.info.clear();

        this.info.addInfo(`FPS: ${(1 / Time.deltaTime).toFixed(1)} \n\n`);
        this.info.addInfo(`You can use [w a s d space shift] for move camera by axis [X] [Y] [Z]\n\n`);
        this.info.addInfo(`Pressed: [`);

        this.moveX += this.clampAngle(Cursor.position.x * this.senseX * Time.deltaTime, 0, 0);
        this.moveY += this.clampAngle(Cursor.position.y * this.senseY * Time.deltaTime, 0, 0);

        this.transform.rotation.euler(this.moveX * Mathf.rad2deg, this.moveY * Mathf.rad2deg , 0);

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

        if (Input.pressUp(' ')) {
            this.transform.position.y += Time.deltaTime * 4;

            this.info.addInfo(' space ');
        }

        if (Input.pressUp('Shift')) {
            this.transform.position.y -= Time.deltaTime * 4;

            this.info.addInfo(' shift ');
        }

        this.info.addInfo(` ]\n`);

        this.info.addInfo(`\nCamera position: \nx: ${this.transform.position.x}\ny: ${this.transform.position.y}\nz:${this.transform.position.z}\n`);
        this.info.addInfo(`\nCursor position: \nx: ${Cursor.position.x}\ny: ${Cursor.position.y}`);
    }

    private clampAngle(angle: number, min: number, y: number) {
        return angle > 360 || angle < 360 ? angle : 0;
    }
}