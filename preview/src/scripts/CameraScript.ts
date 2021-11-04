import { CameraComponent, Cursor, GameObject, Input, SceneManager, ScriptComponent, Time } from '@nox-engine/engine';
import { Mathf, Vector3 } from '@nox-engine/mathf';
import InfoScript from './InfoScript';

export default class CameraScript extends ScriptComponent {
    private info: InfoScript = GameObject.createEmpty().addComponent(InfoScript);
    private moveX: number = 0;
    private moveY: number = 0;
    private senseX: number = 10;
    private senseY: number = 10;
    private speed: number = 25;

    public start() {
        this.gameObject.getComponent<CameraComponent>(CameraComponent).fieldOfView = 60;
        this.gameObject.transform.position = new Vector3(8 * 8, 10, -16);
        this.gameObject.transform.rotation.euler(this.moveX, this.moveY, 0);
    }

    public update() {
        this.moveX += this.clampAngle(Input.getAxisX() * this.senseX * Time.deltaTime, 0, 0);
        this.moveY += this.clampAngle(Input.getAxisY() * this.senseY * Time.deltaTime, 0, 0);

        if (this.moveY > 90) {
            this.moveY = 45;
        } else if (this.moveY < -45) {
            this.moveY = -45;
        }

        if (this.moveX > 360) {
            this.moveX = 0;
        } else if (this.moveX < -360) {
            this.moveX = 0;
        }

        this.transform.rotation.euler(this.moveY * Mathf.rad2deg, this.moveX * Mathf.rad2deg, 0);

        this.info.clear();

        this.info.addInfo(`FPS: ${(1 / Time.deltaTime).toFixed(0)} \n\n`);
        this.info.addInfo(`You can use [w a s d space shift] for move camera by axis [X] [Y] [Z]. Also use mouse for rotate\n\n`);
        this.info.addInfo(`Pressed: [ ${Input.pressUpVertical() !== 0 ? Input.pressUpVertical() === 1 ? 'w' : 's' : ''} ${Input.pressUpHorizontal() !== 0 ?
            Input.pressUpHorizontal() === 1 ? 'd' : 'a' : ''} ]`);

        let speed = Time.deltaTime * this.speed;

        let forward = this.transform.forward();
        let left = this.transform.left();
        let right = this.transform.right();

        let horizontal = Input.pressUpHorizontal();
        let vertical = Input.pressUpVertical();

        let move = Vector3.sum(Vector3.multiple(forward, vertical), Vector3.multiple(left, horizontal));

        this.transform.position = new Vector3(
            this.transform.position.x + move.x * speed,
            this.transform.position.y + (Input.pressUp(' ') ? 1 : Input.pressUp('shift') ? -1 : 0) * speed,
            this.transform.position.z - move.z * speed,
        );

        this.info.addInfo(
            `\nCamera position: \nx: ${this.transform.position.x.toFixed(2)}\ny: ${this.transform.position.y.toFixed(2)}\nz: ${this.transform.position.z.toFixed(2)}\n`);
        this.info.addInfo(`\n Camera rotation: \n`);
        this.info.addInfo(`y: ${this.moveX.toFixed(1)} \n`);
        this.info.addInfo(`x: ${this.moveY.toFixed(1)} \n`);
        this.info.addInfo(`\nCursor position: \nx: ${Cursor.position.x}\ny: ${Cursor.position.y}\n\n`);
        this.info.addInfo(`Scene Information:\n\n`);

        this.info.addInfo(`Count: ${SceneManager.activeScene.getObjects().length}`);

        this.info.addInfo(`\nForward: (${forward.x}, ${forward.y}, ${forward.z})`);
        this.info.addInfo(`\nLeft: (${left.x}, ${left.y}, ${left.z})`);
        this.info.addInfo(`\nRight: (${right.x}, ${right.y}, ${right.z})`);
        this.info.addInfo(`\n\nMove: (${move.x}, ${move.y}, ${move.z})`);

        this.info.addInfo(`\nHorizontal:  ${horizontal}`);
        this.info.addInfo(`\nVertical:  ${vertical}`);

        this.info.render();
    }

    private clampAngle(angle: number, min: number, max: number) {
        return angle > min || angle < max ? angle : 0;
    }
}