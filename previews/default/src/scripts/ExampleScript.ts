import CubeScript from './CubeScripte';
import { Color, GameObject, MeshRendererComponent, PrimitiveType, ScriptComponent, Vector3 } from '@gengine/engine';

export default class ExampleScript extends ScriptComponent {
    public onStart() {
        for (let x = 0; x < 64; x++) {
            for (let z = 0; z < 64; z++) {
                let gm = GameObject.createPrimitive(PrimitiveType.Cube);
                gm.addComponent<CubeScript>(CubeScript);

                let material = gm.getComponent<MeshRendererComponent>(MeshRendererComponent)?.material;

                if (material) {
                    material.color = new Color(x / 64, z / 64, (x + z) / 128);
                }

                gm.transform.position = new Vector3(x - 32, -24, -z - 32);
            }
        }
    }

    public onUpdate() {}
}
