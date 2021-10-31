import { CameraComponent, Cursor, GameObject, Input, SceneManager, ScriptComponent, Time } from '@nox-engine/engine';
import { Mathf, Vector3 } from '@nox-engine/mathf';
import InfoScript from './InfoScript';

export default class CameraScript extends ScriptComponent {
    private info: InfoScript = GameObject.createEmpty().addComponent(InfoScript);
    private moveX: number = 180;
    private moveY: number = 20;
    private senseX: number = 10;
    private senseY: number = 10;

    public start() {
        this.gameObject.getComponent<CameraComponent>(CameraComponent).fieldOfView = 60;

        this.gameObject.transform.position = new Vector3(8 * 8, 10, -16);
        this.gameObject.transform.rotation.euler(this.moveX, this.moveY, 0);
    }

    public update() {
        this.moveX += this.clampAngle(Cursor.position.x * this.senseX * Time.deltaTime, 0, 0);
        this.moveY += this.clampAngle(Cursor.position.y * this.senseY * Time.deltaTime, 0, 0);

        if (this.moveY > 45) {
            this.moveY = 45;
        } else if (this.moveY < -45) {
            this.moveY = -45;
        }

        if (this.moveX > 360) {
            this.moveX = 0;
        }
        else if (this.moveX < -360) {
            this.moveX = 0;
        }

        this.transform.rotation.euler(this.moveX * Mathf.rad2deg, this.moveY * Mathf.rad2deg, 0);

        this.info.clear();

        this.info.addInfo(`FPS: ${(1 / Time.deltaTime).toFixed(0)} \n\n`);
        this.info.addInfo(`You can use [w a s d space shift] for move camera by axis [X] [Y] [Z]. Also use mouse for rotate\n\n`);
        this.info.addInfo(`Pressed: [`);

        if (Input.pressUp('w')) {
            this.transform.position.z += Time.deltaTime * 15;

            this.info.addInfo(` w `);
        }

        if (Input.pressUp('s')) {
            this.transform.position.z -= Time.deltaTime * 15;

            this.info.addInfo(` s `);
        }

        if (Input.pressUp('a')) {
            this.transform.position.x += Time.deltaTime * 15;

            this.info.addInfo(` a `);
        }

        if (Input.pressUp('d')) {
            this.transform.position.x -= Time.deltaTime * 15;

            this.info.addInfo(` d `);
        }

        if (Input.pressUp(' ')) {
            this.transform.position.y += Time.deltaTime * 15;

            this.info.addInfo(' space ');
        }

        if (Input.pressUp('Shift')) {
            this.transform.position.y -= Time.deltaTime * 15;

            this.info.addInfo(' shift ');
        }

        this.info.addInfo(` ]\n`);

        this.info.addInfo(
            `\nCamera position: \nx: ${this.transform.position.x.toFixed(2)}\ny: ${this.transform.position.y.toFixed(2)}\nz: ${this.transform.position.z.toFixed(2)}\n`);
        this.info.addInfo(`\n Camera rotation: \n`);
        this.info.addInfo(`x: ${this.moveX.toFixed(1)} \n`);
        this.info.addInfo(`y: ${this.moveY.toFixed(1)} \n`);
        this.info.addInfo(`\nCursor position: \nx: ${Cursor.position.x}\ny: ${Cursor.position.y}\n\n`);
        this.info.addInfo(`Scene Information:\n\n`);

        this.info.addInfo(`Count: ${SceneManager.activeScene.getObjects().length}`);

        this.info.render();
    }

    private clampAngle(angle: number, min: number, max: number) {
        return angle > min || angle < max ? angle : 0;
    }
}