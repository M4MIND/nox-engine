import { CubePrimitive } from './../../../packages/engine/src/object/primitive/CubePrimitive';
import { Canvas, Engine, GameObject, ScriptComponent } from "@gengine/engine";

let canvas = document.createElement('canvas');

class Code extends ScriptComponent {
    public start(): void {
        this.gameObject.scene.addObject(GameObject);
    }
    public update(): void {
    }
}

new Engine(new Canvas(canvas)).sceneManager.getActiveScene().addObject(CubePrimitive).addComponent<Code>(Code);