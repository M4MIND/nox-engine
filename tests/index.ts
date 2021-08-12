import { MeshRenderer } from './../src/core/component/mesh/MeshRenderer';
import { Cube } from './../src/core/primitive/Cube';
import { MeshFilter } from './../src/core/component/mesh/MeshFilter';
import { ScriptBehavior } from '../src/core/component/script/ScriptBehavior';
import { Object3D } from '../src/core/object/Object3D';
import { Core } from './../src/core/Core';
import { Vector3 } from '../src/math/Vector3';
import { Canvas } from '../src/core/renderer/Canvas';

let canvas = document.createElement('canvas');

document.body.appendChild(canvas);

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class ExampleScript extends ScriptBehavior {
    public start(): void {
        this.object.addComponent<MeshFilter>(MeshFilter).$mesh = new Cube;
        this.object.addComponent<MeshRenderer>(MeshRenderer);

        this.object.$transform.position = new Vector3(0, 0, 0);
        this.object.$transform.scale = new Vector3(0.5, 0.5, 0.5)
    }
    public update(): void {
    }

    public onRendererObject() {

    }
}

let core = new Core(new Canvas(canvas));
let object = new Object3D();

object.addComponent<ExampleScript>(ExampleScript);

core.scene.add(object);

core.run();


