import { Vector2 } from '@nox-engine/mathf';
import { RendererServer } from '@nox-engine/renderer';
import EventManager, { CoreEvents } from '../EventManager';

export default class Cursor {
    public static enable = true;
    public static position: Vector2 = new Vector2(0, 0);

    public static startUp() {
        document.addEventListener('pointerlockchange', e => {
            console.log(e);
        });

        document.addEventListener('mousemove', e => {
            this.position.x = this.enable ? e.clientX : e.movementX;
            this.position.y = this.enable ? e.clientY : e.movementY;
        });

        RendererServer.canvasManager.canvas.addEventListener('click', e => {
            if (this.enable) {
                return;
            }

            RendererServer.canvasManager.canvas.requestPointerLock();
        });

        EventManager.subscribe(CoreEvents.FIXED_UPDATE, () => {
            this.position.x = this.enable ? this.position.x : 0;
            this.position.y = this.enable ? this.position.y : 0;
        });
    }
}