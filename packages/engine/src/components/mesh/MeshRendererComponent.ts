import { Vector3 } from "../../..";
import { Component } from "../../core/component/Component";
import { Renderer } from "../../core/renderer/Renderer";
import { Matrix } from "../../mathf/Matrix";
import { Material } from "./Material";
import { MeshFilterComponent } from "./MeshFilterComponent";

export class MeshRendererComponent extends Component {
    public material: Material = new Material();

    onRenderObject(renderer: Renderer) {
        if (this.gameObject.hashComponent<MeshFilterComponent>(MeshFilterComponent)) {
            let meshFilter = this.gameObject.getComponent<MeshFilterComponent>(MeshFilterComponent) as MeshFilterComponent;

            let vertexes = [];

            for (let v of meshFilter.mesh.vertexes) {
                vertexes.push(v.x);
                vertexes.push(v.y);
                vertexes.push(v.z);
            }

            renderer.webgl.bufferFactory.createArrayBuffer(vertexes);

            renderer.webgl.bufferFactory.createElementArrayBuffer(meshFilter.mesh.triangles);

            renderer.webgl.program.setVertexAttributePointer('position');


            renderer.webgl.program.uniformMatrix4fv("transformMatrix", Matrix.multiples(
                /// Матрица проекции
                Matrix.projection((90 * Math.PI / 180), renderer.webgl.canvas.width / renderer.webgl.canvas.height, 1, 2000),
                /// Матрицы камеры
                Matrix.xRotation(0 * Math.PI / 180),
                Matrix.yRotation(0 * Math.PI / 180),
                Matrix.zRotation(0 * Math.PI / 180),
                Matrix.translate(new Vector3(0.5, 0.5, -12)),
                /// Матрицы объекта
                Matrix.translate(this.gameObject.transform.position),
                Matrix.xRotation(this.gameObject.transform.rotation.x * Math.PI / 180),
                Matrix.yRotation(this.gameObject.transform.rotation.y * Math.PI / 180),
                Matrix.zRotation(this.gameObject.transform.rotation.z * Math.PI / 180),
                Matrix.scale(this.gameObject.transform.scale)
            ));

            //renderer.webgl.canvas.api.clearColor(1, 1, 1, 1);

            // Enable the depth test
            renderer.webgl.canvas.api.enable(renderer.webgl.canvas.api.DEPTH_TEST);

            // Clear the color buffer bit
            //renderer.webgl.canvas.api.clear(renderer.webgl.canvas.api.COLOR_BUFFER_BIT);

            // Set the view port
            renderer.webgl.canvas.api.viewport(0, 0, renderer.webgl.canvas.width, renderer.webgl.canvas.height);

            // Draw the triangle
            renderer.webgl.canvas.api.drawElements(renderer.webgl.canvas.api.TRIANGLES, meshFilter.mesh.triangles.length, renderer.webgl.canvas.api.UNSIGNED_SHORT, 0);
        }
    }
}