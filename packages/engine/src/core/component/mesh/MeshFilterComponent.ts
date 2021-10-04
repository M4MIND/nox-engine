import EventServer from '../../../server/event/EventServer';
import Mesh from '../../mesh/Mesh';
import GameObject from '../../object/GameObject';
import { BaseComponent } from '../BaseComponent';

export default class MeshFilterComponent extends BaseComponent {
    public mesh: Mesh | null = null;
    private update = false;

    constructor(gameObject: GameObject) {
        super(gameObject);

        EventServer.eventManager.subscribe('onWillRendererObject', this.onWillRendererObject);
    }

    public onWillRendererObject = () => {
        if (!this.mesh) {
            return;
        }

        if (!this.update) {
            let temp = [];

            for (let v of this.mesh.vertices) {
                temp.push(v.x);
                temp.push(v.y);
                temp.push(v.z);
            }

            this.mesh.getBuffer('Position')?.set(temp);
            this.mesh.getBuffer('Indices')?.set(this.mesh.indices);
        }

        this.update = true;
    };
}
