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
    SceneManager,
    ScriptComponent,
    Time,
} from '@nox-engine/engine';
import Ray from '@nox-engine/engine/src/core/physics/Ray';
import { Mathf, Vector3 } from '@nox-engine/mathf';
import CameraScript from './CameraScript';

class Rotate extends ScriptComponent {
    public camera: GameObject = new GameObject();
    private moveX: number = 0;
    private moveY: number = 0;
    private senseX: number = 0;

    private axisX = GameObject.createPrimitive(PrimitiveTypes.Cube);
    private axisY = GameObject.createPrimitive(PrimitiveTypes.Cube);
    private axisZ = GameObject.createPrimitive(PrimitiveTypes.Cube);

    public start(): void {
        this.gameObject.name = 'DEBUGGER';
        this.transform.rotation.euler(0, 0, 0);

        this.axisX.transform.position = this.transform.right();
        this.axisX.transform.scale = new Vector3(1, 0.1, 0.1);
        this.axisY.transform.position = this.transform.up();
        this.axisY.transform.scale = new Vector3(0.1, 1, 0.1);
        this.axisZ.transform.position = this.transform.forward();
        this.axisZ.transform.scale = new Vector3(0.1, 0.1, 1);


        this.gameObject.addChildren(this.axisX);
        this.gameObject.addChildren(this.axisY);
        this.gameObject.addChildren(this.axisZ);
    }

    public update(): void {
        this.moveX += Input.getAxisX() * 10 * Time.deltaTime * Mathf.rad2deg;
        this.moveY += Input.getAxisY() * 10 * Time.deltaTime * Mathf.rad2deg;

        this.transform.rotation.euler(0, this.moveX);

        let speed = Time.deltaTime * 10;

        let horizontal = Input.pressUpHorizontal();
        let vertical = Input.pressUpVertical();

        this.axisX.transform.position = Vector3.right;
        this.axisY.transform.position = Vector3.up;
        this.axisZ.transform.position = Vector3.forward;

        this.transform.position = Vector3.add(this.transform.position, Vector3.add(Vector3.multiplyOnLength(this.transform.right(), horizontal * speed), Vector3.multiplyOnLength(this.transform.forward(), vertical * speed)));
    }

    public onFixedUpdate() {
        Physics.raycast(new Ray(this.transform.position, this.transform.forward()), 100, (gm) => {
            if (gm.name !== 'Main script' && gm.name !== 'Empty' && gm.name !== 'DEBUGGER') {
                gm.getComponent(MeshRendererComponent).material.color = Color.red;
            }
        });
    }
}

export default class MainScript extends ScriptComponent {
    public update(): void {
    }

    public start() {
        Cursor.enable = false;

        let camera = GameObject.createCamera();

        camera.transform.position = new Vector3(0, 10, -10);
        camera.transform.rotation.euler(45 * Mathf.rad2deg, 180 * Mathf.rad2deg, 0);

        let cube1 = GameObject.createPrimitive(PrimitiveTypes.Cube);
        let cube2 = GameObject.createPrimitive(PrimitiveTypes.Cube);
        let cube3 = GameObject.createPrimitive(PrimitiveTypes.Cube);

        cube1.transform.position = new Vector3(0, 0, 10);
        cube2.transform.position = new Vector3(4, 0, 4);
        cube3.transform.position = new Vector3(-4, 0, -4);

        cube1.addComponent(Rotate);
        cube1.addChildren(camera);
        cube1.getComponent(Rotate).camera = camera;

        let light = GameObject.createGlobalLight();
        light.transform.position = new Vector3(3, 4, 3);
        light.transform.scale = new Vector3(0.4, 0.4, 0.4);

        light.getComponent(GlobalLightComponent).ambient = Color.white;

        light.addComponent(MeshFilterComponent).mesh = new Cube();
        light.addComponent(MeshRendererComponent);

        console.log(SceneManager.activeScene.getObjects());
    }
}