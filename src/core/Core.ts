import { Canvas } from './renderer/Canvas';
import { Renderer } from './renderer/Render';
import { Loop } from './Loop';
import { Camera } from "./camera/Camera";
import { Scene } from "./scene/Scene";

export class Core {
    private _scene: Scene;
    private _camera: Camera;
    private loop: Loop;
    private renderer: Renderer;

    public get camera(): Camera {
        return this._camera;
    }
    public set camera(value: Camera) {
        this._camera = value;
    }

    public get scene(): Scene {
        return this._scene;
    }
    public set scene(value: Scene) {
        this._scene = value;
        this.loop = new Loop(this.scene, this.camera);
    }

    constructor(canvas: Canvas) {
        this.scene = new Scene();
        this.camera = new Camera();
        this.renderer = new Renderer(canvas);
    }
    
    private gameLoop() {
        window.requestAnimationFrame(() => {
            this.loop.physics();
            this.loop.gameLogic();
            this.loop.sceneRendering(this.renderer, this.camera)

            this.gameLoop();
        })
    }

    run() {
        this.loop.initialization();

        this.gameLoop();
    }
}