import {Engine} from "../Engine";

export class GameLoop {
    constructor(private readonly core: Engine) {}

    start() {
        for (let objects of this.core.sceneManager.getActiveScene().getAllObjects()) {
            for (let component of objects.getComponents()) {
                component.start(this.core.sceneManager);
            }
        }
    }

    loop() {
        window.requestAnimationFrame(() => {
            for (let objects of this.core.sceneManager.getActiveScene().getAllObjects()) {
                for (let component of objects.getComponents()) {
                    component.update(this.core.sceneManager);
                }
            }


            for (let objects of this.core.sceneManager.getActiveScene().getAllObjects()) {
                for (let component of objects.getComponents()) {
                    component.onRenderObject();
                }
            }

            this.core.renderer.webgl.draw();

            this.loop()
        })

    }
}