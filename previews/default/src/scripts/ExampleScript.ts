import CubeScript from './CubeScript';
import {
    Color,
    GameObject,
    MeshRendererComponent,
    PrimitiveType,
    ScriptComponent,
    Time,
    Vector3,
} from '@gengine/engine';

export default class ExampleScript extends ScriptComponent {
    private info: HTMLDivElement = document.createElement('div');

    public onStart() {
        for (let x = 0; x < 64; x++) {
            for (let z = 0; z < 64; z++) {
                let gm = GameObject.createPrimitive(PrimitiveType.Cube);
                gm.addComponent<CubeScript>(CubeScript);

                let material = gm.getComponent<MeshRendererComponent>(MeshRendererComponent)?.material;

                if (material) {
                    material.color = new Color(1 - x / 64, 1 - z / 64, (x + z) / 128);
                }

                gm.transform.position = new Vector3(x, 0, z);
            }
        }

        this.info.style.position = 'fixed';
        this.info.style.top = '1em';
        this.info.style.left = '1em';

        this.info.innerText = '0 fps';

        document.body.appendChild(this.info);
    }

    public onUpdate() {
        this.info.innerText = `${(1 / Time.deltaTime).toFixed()} fps`;
    }
}
