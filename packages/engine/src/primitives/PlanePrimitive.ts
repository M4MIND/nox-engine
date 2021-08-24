import { GameObject, MeshFilterComponent, MeshRendererComponent, PlaneMesh } from "../..";

export class PlanaPrimitive extends GameObject {
    constructor() {
        super();

        this.addComponent<MeshFilterComponent>(MeshFilterComponent).mesh = new PlaneMesh();
        this.addComponent<MeshRendererComponent>(MeshRendererComponent);
    }
}