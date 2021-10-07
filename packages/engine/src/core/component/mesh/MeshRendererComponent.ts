import Matrix4 from '../../../mathf/Matrix4';
import Vector3 from '../../../mathf/Vector3';
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

            this.material.getUniform('_U_Object')?.set(
                Matrix4.multiplyFromArray([
                    Matrix4.projection(
                        (3.14 / 180) * 60,
                        RendererServer.canvasManager.canvas.width / RendererServer.canvasManager.canvas.height,
                    ),
                    Matrix4.inverse(
                        Matrix4.multiplyFromArray([
                            //Matrix4.lookAt(new Vector3(0, 0, 20), new Vector3(0, 0, 0), new Vector3(0, 1, 0)),
                            Matrix4.translate(new Vector3(0, 0, 20)),
                            Matrix4.zRotation((3.14 / 180) * 0),
                            Matrix4.yRotation((3.14 / 180) * 0),
                            Matrix4.xRotation((3.14 / 180) * 0),
                        ]),
                    ),
                    Matrix4.translate(this.gameObject.transform.position),
                    Matrix4.zRotation((3.14 / 180) * this.gameObject.transform.z),
                    Matrix4.yRotation((3.14 / 180) * this.gameObject.transform.y),
                    Matrix4.xRotation((3.14 / 180) * this.gameObject.transform.x),
                    Matrix4.scale(this.gameObject.transform.scale),
                ]),
            );

            RendererServer.rendererManager.drawMesh(mesh, this.material, mesh.indices.length);
        }
    }

    public onWillRendererObject() {}
}
