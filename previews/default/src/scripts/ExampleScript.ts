import { MeshRendererComponent, ScriptComponent, UniformType, Vector3 } from '@gengine/engine';

export default class ExampleScript extends ScriptComponent {
    public onStart() {
        this.gameObject.transform.position.x = Math.random() > 0.5 ? Math.random() * -30 : Math.random() * 30;
        this.gameObject.transform.position.y = Math.random() > 0.5 ? Math.random() * -20 : Math.random() * 20;
        this.gameObject.transform.position.z = -60;

        this.gameObject
            .getComponent<MeshRendererComponent>(MeshRendererComponent)
            ?.material?.createUniform('_U_Color', UniformType.Fv4)
            .set([Math.random(), Math.random(), Math.random(), 1]);
    }

    public onUpdate() {
        this.gameObject.transform.position.x += Math.random() > 0.5 ? Math.random() : -Math.random();
        this.gameObject.transform.position.y += Math.random() > 0.5 ? Math.random() : -Math.random();
    }
}
