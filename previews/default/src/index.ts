import { Camera, Canvas, CubePrimitive, CylinderPrimitive, Engine, GameObject, SceneManager, ScriptComponent, SuzannePrimitive, Vector3 } from "@gengine/engine";

class Cube extends ScriptComponent {
    private angle: number = 0;
    public start(sceneManager: SceneManager): void {
        this.gameObject.transform.position = new Vector3(
            (Math.random() > 0.5 ? 1: -1) * Math.random()  * 10, 
            (Math.random() > 0.5 ? 1: -1) * Math.random()  * 10,
            (Math.random() > 0.5 ? 1: -1) * Math.random()  * 10);
    }
    public update(sceneManager: SceneManager): void {
        this.gameObject.transform.rotation.x = this.angle;
        this.gameObject.transform.rotation.y = this.angle;
        this.gameObject.transform.rotation.z = this.angle;

        this.angle = this.angle + (Math.random() > 0.5 ? 1: 1) * Math.random() % 360;
    }
}

class Main extends ScriptComponent {
    public start(sceneManager: SceneManager): void {
        for (var i = 0; i < 50; i++) {
            sceneManager.getActiveScene().addObject(CubePrimitive).addComponent<Cube>(Cube);
            sceneManager.getActiveScene().addObject(CylinderPrimitive).addComponent<Cube>(Cube);
            sceneManager.getActiveScene().addObject(SuzannePrimitive).addComponent<Cube>(Cube);
        }
    }

    public update(sceneManager: SceneManager): void {
    }
}


let canvas = document.createElement('canvas');

document.body.appendChild(canvas);
document.body.style.padding = "0";
document.body.style.margin = "0";

let core = new Engine(new Canvas(canvas));

core.canvas.setViewport(window.innerWidth, window.innerHeight);

core.sceneManager.getActiveScene().addObject(GameObject).addComponent(Main);

core.start();