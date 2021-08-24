import {GameLoop} from './core/GameLoop';
import {Renderer} from "./core/renderer/Renderer";
import {SceneManager} from "./core/sceneManagment/SceneManager";
import {Canvas} from "./core/renderer/Canvas";
import {WebGl} from "./core/renderer/WebGl";

export class Engine {
    public readonly renderer: Renderer;
    public readonly sceneManager: SceneManager;
    public readonly gameLoop: GameLoop;

    constructor(readonly canvas: Canvas) {
        this.renderer = new Renderer(new WebGl(canvas));
        this.sceneManager = new SceneManager();
        this.gameLoop = new GameLoop(this);
    }

    start(): void {

        this.gameLoop.start();

        this.gameLoop.loop();
    }
}