import { CameraComponent, Color, Cursor, GameObject, Input, MeshRendererComponent, Physics, SceneManager, ScriptComponent, Time } from '@nox-engine/engine';
import Ray from '@nox-engine/engine/src/core/physics/Ray';
import { Mathf, Vector3 } from '@nox-engine/mathf';
import InfoScript from './InfoScript';

export default class CameraScript extends ScriptComponent {
    private info: InfoScript = GameObject.createEmpty().addComponent(InfoScript);
    private moveX: number = 45;
    private moveY: number = 45;
    private senseX: number = 10;
    private senseY: number = 10;
    private speed: number = 10;

    public start() {
        this.gameObject.getComponent<CameraComponent>(CameraComponent).fieldOfView = 60;
        this.transform.rotation.euler(this.moveY * Mathf.rad2deg, this.moveX * Mathf.rad2deg);
    }

    public update() {
        this.moveX += Input.getAxisX() * this.senseX * Time.deltaTime;
        this.moveY += Input.getAxisY() * this.senseY * Time.deltaTime;


        let speed = Time.deltaTime * this.speed;

        let forward = this.transform.forward();
        let right = this.transform.right();

        let horizontal = Input.pressUpHorizontal();
        let vertical = Input.pressUpVertical();

        let move = Vector3.add(Vector3.multiplyOnLength(forward, vertical), Vector3.multiplyOnLength(right, horizontal));

        // this.transform.position = new Vector3(
        //     this.transform.position.x + move.x * speed,
        //     this.transform.position.y + (Input.pressUp(' ') && Input.pressUp('shift') ? 0 : Input.pressUp('shift') ? -1 : Input.pressUp(' ') ? 1 : 0) * speed,
        //     this.transform.position.z - move.z * speed,
        // );

        this.info.clear();

        this.info.addInfo(`FPS: ${(1 / Time.deltaTime).toFixed(0)} \n\n`);
        this.info.addInfo(`You can use [w a s d space shift] for move camera by axis [X] [Y] [Z]. Also use mouse for rotate\n\n`);
        this.info.addInfo(`Pressed: [ ${Input.pressUpVertical() !== 0 ? Input.pressUpVertical() === 1 ? 'w' : 's' : ''} ${Input.pressUpHorizontal() !== 0 ?
            Input.pressUpHorizontal() === 1 ? 'd' : 'a' : ''} ]`);

        this.info.addInfo(`\nCamera position: (${this.transform.position.x.toFixed(2)}, ${this.transform.position.y.toFixed(2)}, ${this.transform.position.z.toFixed(2)})`);
        this.info.addInfo(`\nCamera rotation: (${this.moveX.toFixed(2)}, ${this.moveY.toFixed(2)})\n`);
        this.info.addInfo(`\nCursor position: \(${Cursor.position.x}, ${Cursor.position.y})\n\n`);
        this.info.addInfo(`Scene Information:\n`);
        this.info.addInfo(`Count: ${SceneManager.activeScene.getObjects().length}\n`);

        this.info.addInfo(`\nForward: (${forward.x.toFixed(2)}, ${forward.y.toFixed(2)}, ${forward.z.toFixed(2)})`);
        this.info.addInfo(`\nRight: (${right.x.toFixed(2)}, ${right.y.toFixed(2)}, ${right.z.toFixed(2)})`);

        this.info.addInfo(`\n\nMove: (${move.x.toFixed(2)}, ${move.y.toFixed(2)}, ${move.z.toFixed(2)})`);

        this.info.addInfo(`\n\nDirection DEBUG: (${new Ray(new Vector3(), new Vector3(this.transform.rotation.forward().x)).direction})`)

        this.info.render();
    }

    public onFixedUpdate() {
    }
}