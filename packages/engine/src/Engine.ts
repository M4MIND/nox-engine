import { CubePrimitive } from './object/primitive/CubePrimitive';
import { SceneManager } from './sceneManagment/SceneManager';
import { Canvas } from "./renderer/Canvas";
import { Renderer } from "./renderer/Renderer";
import { WebGl } from "./renderer/WebGl";
import { Camera } from './camera/Camera';

export class Engine {
    public readonly renderer: Renderer;
    public readonly sceneManager: SceneManager;

    constructor(readonly canvas: Canvas) {
        this.renderer = new Renderer(new WebGl(canvas));
        this.sceneManager = new SceneManager();

        this.sceneManager.getActiveScene().addObject<Camera>(Camera);
        this.sceneManager.getActiveScene().addObject<CubePrimitive>(CubePrimitive);

        console.dir(this);
    }
}