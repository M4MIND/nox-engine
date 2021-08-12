import { Camera } from './../../camera/Camera';
import { Renderer } from './../../renderer/Render';
import { Component } from "../Component";
import { Mesh } from "./Mesh";

export class MeshFilter extends Component {
    private mesh: Mesh;

    /**
     * Getter $mesh
     * @return {Mesh}
     */
	public get $mesh(): Mesh {
		return this.mesh;
	}

    /**
     * Setter $mesh
     * @param {Mesh} value
     */
	public set $mesh(value: Mesh) {
		this.mesh = value;
	}

    public onRendererObject(renderer: Renderer, camera: Camera) {
        renderer.drawMesh(this.$mesh, this.object.$transform.position);
    }
}