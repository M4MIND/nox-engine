import EventServer from '../../../server/event/EventServer';
import Mesh from '../../mesh/Mesh';
import GameObject from '../../object/GameObject';
import { BaseComponent } from '../BaseComponent';

export default class MeshFilterComponent extends BaseComponent {
    public mesh: Mesh | null = null;
    private update = false;

    constructor(gameObject: GameObject) {
        super(gameObject);

        EventServer.eventManager.subscribe('onWillRendererObject', this.onWillRendererObject.bind(this));
    }

    public onWillRendererObject() {
        if (!this.mesh) {
            return;
        }

        if (!this.update) {
            this.mesh.getBuffer('Position')?.set(this.mesh.vertices.flat());
            this.mesh.getBuffer('Normals')?.set(this.mesh.normals.flat());
            this.mesh.getBuffer('Indices')?.set(this.mesh.indices);
        }

        this.update = true;
    }
}
