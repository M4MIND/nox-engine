import { Material, MeshRendererComponent, ScriptComponent } from '@gengine/engine';

export default class CubeScript extends ScriptComponent {
    private dateStart: number = Date.now();
    private material: Material | undefined;

    public onUpdate() {
        this.gameObject.transform.scale.y =
            Math.sin(this.gameObject.transform.position.x / 4 + (Date.now() - this.dateStart) / 1000) +
            Math.cos(this.gameObject.transform.position.z / 4 + (Date.now() - this.dateStart) / 1000) +
            4;

        if (!this.material) {
            this.material = this.gameObject.getComponent<MeshRendererComponent>(MeshRendererComponent)
                ?.material as Material;
        }
    }
}
