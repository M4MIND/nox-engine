import {Renderer} from "./renderer/Renderer";
import {SceneManager} from "./sceneManagment/SceneManager";
import {Canvas} from "./renderer/Canvas";
import {WebGl} from "./renderer/WebGl";
import {Camera} from "./camera/Camera";
import {CubePrimitive} from "./primitives/CubePrimitive";

export class Engine {
    public readonly renderer: Renderer;
    public readonly sceneManager: SceneManager;

    constructor(readonly canvas: Canvas) {
        this.renderer = new Renderer(new WebGl(canvas));
        this.sceneManager = new SceneManager();

        this.sceneManager.getActiveScene().addObject(Camera).name = "Main camera";
        this.sceneManager.getActiveScene().addObject(CubePrimitive).name = "Cube";

        console.dir(this);
    }
}