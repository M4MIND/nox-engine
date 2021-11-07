import {
    Color,
    Cube,
    Cursor,
    GameObject,
    GlobalLightComponent,
    Input,
    MeshFilterComponent,
    MeshRendererComponent,
    Physics,
    PrimitiveTypes,
    ScriptComponent,
    Time,
} from '@nox-engine/engine';
import Debugger from '@nox-engine/engine/src/core/debug/Debugger';
import { Mathf, Vector3 } from '@nox-engine/mathf';
import Ray from '@nox-engine/mathf/src/Ray';

class Raycast extends ScriptComponent {
    private isTriggered: boolean = false;

    public start(): void {
    }

    public update(): void {
        this.gameObject.getComponent<MeshRendererComponent>(MeshRendererComponent).material.color = this.isTriggered ? Color.red : Color.green;

        this.isTriggered = false;
    }

    public onRaycastTrigger() {
        this.isTriggered = true;
    }
}

class Rotate extends ScriptComponent {
    public camera: GameObject = new GameObject();
    private moveX: number = 0;
    private moveY: number = 0;

    public start(): void {
        this.transform.rotation.euler(0, 0, 0);
    }

    public update(): void {
        this.moveX += Input.getAxisX() * 10 * Time.deltaTime * Mathf.rad2deg;
        this.moveY += Input.getAxisY() * 10 * Time.deltaTime * Mathf.rad2deg;

        this.transform.rotation.euler(this.moveY, this.moveX);

        let speed = Time.deltaTime * 10;

        let horizontal = Input.pressUpHorizontal();
        let vertical = Input.pressUpVertical();

        Debugger.drawLine(this.transform.position, Vector3.add(this.transform.position, this.transform.forward()), Color.blue);
        Debugger.drawLine(this.transform.position, Vector3.add(this.transform.position, this.transform.right()), Color.red);
        Debugger.drawLine(this.transform.position, Vector3.add(this.transform.position, this.transform.up()), Color.green);

        this.transform.position = Vector3.add(this.transform.position,
            Vector3.add(Vector3.multiplyOnLength(this.transform.right(), horizontal * speed), Vector3.multiplyOnLength(this.transform.forward(), vertical * speed)));
    }

    public onFixedUpdate() {
        Physics.raycast(new Ray(this.transform.position, this.transform.forward()), 100, (gm) => {
        });
    }
}

export default class MainScript extends ScriptComponent {
    public update(): void {
        Debugger.drawLine(Vector3.zero, new Vector3(100000), Color.red);
        Debugger.drawLine(Vector3.zero, new Vector3(0, 100000), Color.blue);
        Debugger.drawLine(Vector3.zero, new Vector3(0, 0, 100000), Color.green);
    }

    public start() {
        Cursor.enable = false;

        let camera = GameObject.createCamera();

        camera.transform.position = new Vector3(0, 10, -10);
        camera.transform.rotation.euler(45 * Mathf.rad2deg, 180 * Mathf.rad2deg, 0);

        let cube1 = GameObject.createPrimitive(PrimitiveTypes.Cube);

        cube1.transform.position = new Vector3(0, 0, 10);

        for (let i = 0; i < 120; i++) {
            let gm = GameObject.createPrimitive(PrimitiveTypes.Cube);
            gm.transform.position = new Vector3(Math.random() * 20, Math.random() * 20, Math.random() * 20);

            gm.addComponent(Raycast);
        }

        cube1.addComponent(Rotate);
        camera.transform.parent = cube1.transform;
        cube1.getComponent(Rotate).camera = camera;

        let light = GameObject.createGlobalLight();
        light.transform.position = new Vector3(3, 4, 3);
        light.transform.scale = new Vector3(1, 1, 1);

        light.getComponent(GlobalLightComponent).ambient = Color.white;

        light.addComponent(MeshFilterComponent).mesh = new Cube();
        light.addComponent(MeshRendererComponent);
    }
}