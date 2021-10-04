import Matrix4x4 from '../../../mathf/Matrix4x4';
import EventServer from '../../../server/event/EventServer';
import RendererServer from '../../../server/renderer/RendererServer';
import Material from '../../material/Material';
import GameObject from '../../object/GameObject';
import { BaseComponent } from '../BaseComponent';
import MeshFilterComponent from './MeshFilterComponent';

export default class MeshRendererComponent extends BaseComponent {
    public material: Material | null = null;

    constructor(gameObject: GameObject) {
        super(gameObject);

        EventServer.eventManager.subscribe('onWillRendererObject', this.onWillRendererObject.bind(this));
        EventServer.eventManager.subscribe('onRenderer', this.onRenderer.bind(this));
    }

    public onRenderer() {
        let mesh = this.gameObject.getComponent<MeshFilterComponent>(MeshFilterComponent)?.mesh;

        if (mesh && this.material) {
            this.material.getUniform('_U_Translate')?.set(Matrix4x4.translate(this.gameObject.transform.position));

            this.material.getUniform('_U_Scale')?.set(Matrix4x4.scale(this.gameObject.transform.scale));

            this.material.getUniform('_U_Color')?.set(this.material.color);

            this.material
                .getUniform('_U_Projection')
                ?.set(
                    Matrix4x4.projection(
                        (3.14 / 180) * 90,
                        RendererServer.canvasManager.canvas.width / RendererServer.canvasManager.canvas.height,
                    ),
                );

            RendererServer.rendererManager.drawMesh(mesh, this.material);
        }
    }

    public onWillRendererObject() {}
}
