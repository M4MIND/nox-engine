import {
    Color,
    Cube,
    Cursor,
    GameObject,
    GlobalLightComponent,
    MeshFilterComponent,
    MeshRendererComponent,
    PrimitiveTypes,
    ScriptComponent,
    Time
} from '@nox-engine/engine';
import { Mathf, Vector3 } from '@nox-engine/mathf';
import CameraScript from './CameraScript';


class Rotate extends ScriptComponent {
    private angle: number = 0;
    private rotate: number = Math.random() > 0.5 ? Math.random() : -Math.random();

    public start(): void {
    }

    
    public update(): void {
        this.angle += this.rotate * 24 * Time.deltaTime;

        if (this.angle > 360 || this.angle < -360) {
            this.angle = 0;
        }

        this.transform.rotation.euler(
            0,//this.angle * Mathf.rad2deg,
            0,// this.angle * Mathf.rad2deg,
            this.angle * Mathf.rad2deg
        );
    }
}

export default class MainScript extends ScriptComponent {
    public update(): void {
    }

    public start() {
        Cursor.enable = false;

        for (let x = 0; x < 16; x++) {
            for (let z = 0; z < 16; z++) {
                let obj = GameObject.createPrimitive(PrimitiveTypes.Cube).addComponent(Rotate).gameObject;

                obj.transform.position = new Vector3(x * 8, 0, z * 8);

                let axisX = GameObject.createPrimitive(PrimitiveTypes.Cube);
                let axisY = GameObject.createPrimitive(PrimitiveTypes.Cube);
                let axisZ = GameObject.createPrimitive(PrimitiveTypes.Cube);

                axisX.transform.scale = new Vector3(6, 0.025, 0.025);
                axisY.transform.scale = new Vector3(0.025, 6, 0.025);
                axisZ.transform.scale = new Vector3(0.025, 0.025, 6);

                axisX.getComponent(MeshRendererComponent).material.color = Color.yellow;
                axisY.getComponent(MeshRendererComponent).material.color = Color.green;
                axisZ.getComponent(MeshRendererComponent).material.color = Color.red;

                let cube = GameObject.createPrimitive(PrimitiveTypes.Cube);
                let cube1 = GameObject.createPrimitive(PrimitiveTypes.Cube);
                let cube2 = GameObject.createPrimitive(PrimitiveTypes.Cube);

                cube.transform.position.x = -0.5;
                cube1.transform.position.y = -0.5;
                cube2.transform.position.z = -0.5;

                cube.transform.scale = new Vector3(0.025, 6, 6);
                cube1.transform.scale = new Vector3(6, 0.025, 6);
                cube2.transform.scale = new Vector3(6, 6, 0.025);

                axisX.addChildren(cube);
                axisY.addChildren(cube1);
                axisZ.addChildren(cube2);

                obj.addChildren(axisX).addChildren(axisY).addChildren(axisZ);
            }
        }

        GameObject.createCamera().addComponent(CameraScript);

        let light = GameObject.createGlobalLight();
        light.transform.position = new Vector3(3, 10, 3);
        light.transform.scale = new Vector3(0.4, 0.4, 0.4);

        light.getComponent(GlobalLightComponent).ambient = Color.white;

        light.addComponent(MeshFilterComponent).mesh = new Cube();
        light.addComponent(MeshRendererComponent);
    }
}