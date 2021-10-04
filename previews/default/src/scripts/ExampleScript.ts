import CubeScript from './CubeScripte';
import {
    Color,
    GameObject,
    Material,
    MeshRendererComponent,
    PrimitiveType,
    ScriptComponent,
    Vector3,
} from '@gengine/engine';

export default class ExampleScript extends ScriptComponent {
    private material: Material | undefined;
    private startTime: number = Date.now();

    public onStart() {
        for (let x = -48; x < 48; x++) {
            for (let z = -32; z > -96; z--) {
                let gm = GameObject.createPrimitive(PrimitiveType.Cube);
                gm.addComponent<CubeScript>(CubeScript);

                let material = gm.getComponent<MeshRendererComponent>(MeshRendererComponent)?.material;

                if (material) {
                    material.color = new Color((x + 48) / 96, (64 - (96 - z)) / 64, 0.5);
                }

                gm.transform.position = new Vector3(x, -24, z);
            }
        }
    }

    public onUpdate() {}
}
