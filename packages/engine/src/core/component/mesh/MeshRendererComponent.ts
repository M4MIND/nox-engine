import Matrix4 from '../../../mathf/Matrix4';
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

        EventServer.eventManager.subscribe('onRenderer', this.onRenderer.bind(this));
    }

    public onRenderer() {
        let mesh = this.gameObject.getComponent<MeshFilterComponent>(MeshFilterComponent)?.mesh;

        if (mesh && this.material) {
            this.material.getUniform('_U_Color')?.set(this.material.color);

            this.material
                .getUniform('_U_Object')
                ?.set(
                    Matrix4.multiplyFromArray([
                        Matrix4.projection(
                            (3.14 / 180) * 90,
                            RendererServer.canvasManager.canvas.width / RendererServer.canvasManager.canvas.height,
                        ),
                        Matrix4.translate(this.gameObject.transform.position),
                        Matrix4.zRotation((3.14 / 180) * 0),
                        Matrix4.yRotation((3.14 / 180) * 0),
                        Matrix4.xRotation((3.14 / 180) * 0),
                        Matrix4.scale(this.gameObject.transform.scale),
                    ]),
                );

            RendererServer.rendererManager.drawMesh(mesh, this.material);
        }
    }

    public onWillRendererObject() {}
}
