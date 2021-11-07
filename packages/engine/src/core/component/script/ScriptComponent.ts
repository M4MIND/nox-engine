import { CoreEvents } from '../../EventManager';
import SceneManager from '../../scene/SceneManager';
import BaseComponent from '../BaseComponent';

export default abstract class ScriptComponent extends BaseComponent {
    public abstract start(): void;

    public abstract update(): void;

    public onFixedUpdate(): void {

    }

    public onRaycastTrigger(): void {

    }

    protected preparation(): void {
        SceneManager.activeScene.subscribe(CoreEvents.START, this.start.bind(this), this.id);
        SceneManager.activeScene.subscribe(CoreEvents.UPDATE, this.update.bind(this), this.id);
        SceneManager.activeScene.subscribe(CoreEvents.FIXED_UPDATE, this.onFixedUpdate.bind(this), this.id);
        SceneManager.activeScene.subscribe(CoreEvents.RAYCAST, this.onRaycastTrigger.bind(this), this.id);
    }
}
