import RendererServer from "./server/renderer/RendererServer";
import Canvas from "./server/renderer/canvas/Canvas";
import SceneServer from "./server/scene/SceneServer";
import Scene from "./server/scene/Scene";

export default class Engine {
    public readonly canvas: Canvas;
    public readonly scene: Scene;

    constructor(canvas: HTMLCanvasElement) {
        RendererServer.startUp(canvas);
        SceneServer.startUp();

        this.canvas = RendererServer.canvasManager.canvas;
        this.scene = SceneServer.sceneManager.activeScene;
    }
}