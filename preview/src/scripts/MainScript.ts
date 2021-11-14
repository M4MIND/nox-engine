import { Color, Cursor, GameObject, GlobalLightComponent, Input, MeshRendererComponent, PrimitiveTypes, ScriptComponent, Time } from '@nox-engine/engine';
import Debugger from '@nox-engine/engine/src/core/debug/Debugger';
import { Vector3 } from '@nox-engine/mathf';

class Info extends ScriptComponent {
    public start(): void {
    }

    public update(): void {
    }

}

class Planet extends ScriptComponent {
    private angleY: number = 0;
    private angleX: number = 0;
    private angleZ: number = 0;

    private speedX: number = 0;
    private speedY: number = 0;
    private speedZ: number = 0;

    private count = 0;

    private color: Color = Color.white;

    public start(): void {
        this.getComponent<MeshRendererComponent>(MeshRendererComponent).material.color = this.color;
    }

    public update(): void {
        this.angleX += Time.deltaTime * this.speedX;
        this.angleY += Time.deltaTime * this.speedY;
        this.angleZ += Time.deltaTime * this.speedZ;

        this.transform.rotation.euler(this.angleX, this.angleY, this.angleZ);

        Debugger.drawLine(this.transform.getGlobalPosition(), this.transform.parent!.getGlobalPosition(), this.color);
    }

    public setParams(x: number, y: number, z: number, color: Color = Color.white): this {
        this.speedX = x;
        this.speedY = y;
        this.speedZ = z;
        this.color = color;

        return this;
    }

    public onFixedUpdate() {
    }
}

class Player extends ScriptComponent {
    private moveX: number = 0;
    private moveY: number = 0;

    public start(): void {
        this.transform.rotation.euler(0, 0, 0);
    }

    public update(): void {
        this.moveX += Input.getAxisX() * 10 * Time.deltaTime;
        this.moveY += Input.getAxisY() * 10 * Time.deltaTime;

        if (this.moveY > 90) {
            this.moveY = 90;
        } else if (this.moveY < -90) {
            this.moveY = -90;
        }

        this.transform.rotation.euler(-this.moveY, this.moveX);

        let speed = Time.deltaTime * 10;

        let horizontal = Input.pressUpHorizontal();
        let vertical = Input.pressUpVertical();

        Debugger.drawLine(this.transform.position, this.transform.position.add(this.transform.forward()), Color.blue);
        Debugger.drawLine(this.transform.position, this.transform.position.add(this.transform.right()), Color.red);
        Debugger.drawLine(this.transform.position, this.transform.position.add(this.transform.up()), Color.green);

        this.transform.position = Vector3.add(this.transform.position,
            Vector3.add(Vector3.multiplyOnLength(this.transform.right(), horizontal * speed), Vector3.multiplyOnLength(this.transform.forward(), vertical * speed)));
    }
}

export default class MainScript extends ScriptComponent {
    private Html: HTMLDivElement = document.createElement('div')
    public update(): void {
        Debugger.drawLine(new Vector3(-100000), new Vector3(100000), Color.red);
        Debugger.drawLine(new Vector3(0, -100000), new Vector3(0, 100000), Color.blue);
        Debugger.drawLine(new Vector3(0, 0, -100000), new Vector3(0, 0, 100000), Color.green);
        this.Html.innerText = `${(1 / Time.deltaTime).toFixed(1)}`;
    }

    public start() {
        document.body.appendChild(this.Html);

        this.Html.style.position = 'fixed';
        this.Html.style.left = '1em';
        this.Html.style.top = '1em';

        Cursor.enable = false;

        let camera = GameObject.createCamera();
        let player = GameObject.createPrimitive(PrimitiveTypes.Cube);
        let light = GameObject.createGlobalLight();

        camera.transform.position = new Vector3(0, 10, -10);
        camera.transform.rotation.euler(45, 180, 0);
        camera.transform.parent = player.transform;

        player.transform.rotation.euler(90);
        player.transform.position = new Vector3(-10, 0, -10);
        player.addComponent(Player);

        light.transform.position = new Vector3(3, 4, 3);
        light.transform.scale = new Vector3(1, 1, 1);
        light.getComponent(GlobalLightComponent).ambient = Color.white;

        let solarSystem = GameObject.createEmpty('Solar System');
        let sun = GameObject.createPrimitive(PrimitiveTypes.Cube, 'Sun').addComponent(Planet).setParams(Math.random() * 10, Math.random() * 10, 0, Color.yellow).gameObject;
        let earth = GameObject.createPrimitive(PrimitiveTypes.Cube, 'Earth').addComponent(Planet).setParams(Math.random() * 10, 32, 0, Color.green).gameObject;
        let moon = GameObject.createPrimitive(PrimitiveTypes.Cube, 'Moon').addComponent(Planet).setParams(Math.random() * 10, 12, 0, Color.gray).gameObject;
        let venus = GameObject.createPrimitive(PrimitiveTypes.Cube, 'Venus').addComponent(Planet).setParams(Math.random() * 10, 12, 32, Color.red).gameObject;
        let up = GameObject.createPrimitive(PrimitiveTypes.Cube, 'Up').addComponent(Planet).setParams(Math.random() * 10, 0,0, Color.black).gameObject;

        sun.transform.scale = new Vector3(2, 2, 2);
        earth.transform.scale = new Vector3(0.8, 0.8, 0.8);
        venus.transform.scale = new Vector3(0.5, 0.5, 0.5);
        moon.transform.scale = new Vector3(0.4, 0.4, 0.4);

        up.transform.position = new Vector3(25, Math.random() * 2, 12);
        earth.transform.position = new Vector3(10, Math.random() * 2, 10);
        moon.transform.position = new Vector3(2, Math.random() * 2, 2);
        venus.transform.position = new Vector3(4, Math.random() * 2, 10);
        venus.transform.parent = sun.transform;

        earth.transform.parent = sun.transform;
        moon.transform.parent = earth.transform;

        up.transform.parent = sun.transform;

        sun.transform.parent = solarSystem.transform;


        for (let x = 0; x < 64; x ++) {
            for (let z = 0; z < 64; z ++) {
                GameObject.createPrimitive(PrimitiveTypes.Cube).transform.position = new Vector3(x, 0 , z);
            }
        }

    }
}