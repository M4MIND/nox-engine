import { Renderer } from './renderer/Render';
import { Camera } from "./camera/Camera";
import { Scene } from "./scene/Scene";

export class Loop {
    constructor(private scene: Scene, private camera: Camera) {
        
    }

    initialization() {
        for (let o of this.scene.all()) {
            for(let c of o.getComponents()) {
                c.start()
            }
        }
    }

    physics() {

    }

    inputEvent() {

    }

    gameLogic() {
        for (let o of this.scene.all()) {
            for(let c of o.getComponents()) {
                c.update();
            }
        }
    }

    sceneRendering(render: Renderer, camera: Camera) {
        for (let o of this.scene.all()) {
            for(let c of o.getComponents()) {
                c.onRendererObject(render, camera);
            }
        }
    }

    guiRendering() {

    }
}