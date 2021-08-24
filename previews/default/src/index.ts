import {Camera, Canvas, Engine, GameObject, SceneManager, ScriptComponent, Vector3} from "@gengine/engine";
import {CubePrimitive} from "@gengine/engine/src/primitives/CubePrimitive";


class World extends ScriptComponent {
    public start(sceneManager: SceneManager): void {
        this.gameObject.name = "World";
        this.gameObject.transform.position = new Vector3(0, 0, 0);
    }

    public update(sceneManager: SceneManager): void {
    }
}

class Main extends ScriptComponent {
    public start(sceneManager: SceneManager): void {
        this.gameObject.name = "Root";
        sceneManager.getActiveScene().addObject(Camera).name = "Main Camera";
        sceneManager.getActiveScene().addObject(GameObject).addComponent(World)
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
core.sceneManager.getActiveScene().addObject(CubePrimitive);

core.start();