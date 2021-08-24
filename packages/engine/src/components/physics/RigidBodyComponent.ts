import {Component} from "../../core/component/Component";

export class RigidBodyComponent extends Component {
    public mass: number = 5;
    
    onPhysics() {
        this.gameObject.transform.position.y -= 0.1;
    }
}