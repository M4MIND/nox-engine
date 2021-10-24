import Mesh from '../../graphics/mesh/Mesh';
import GameObject from '../../object/GameObject';
import BaseComponent from '../BaseComponent';

export default class MeshFilterComponent extends BaseComponent {
    public mesh: Mesh = new Mesh();

    constructor(gameObject: GameObject) {
        super(gameObject);
    }

    protected preparation(): void {}
}
