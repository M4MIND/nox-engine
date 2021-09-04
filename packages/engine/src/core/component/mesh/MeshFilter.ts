import {Component} from "../Component";
import Mesh from "../../../server/renderer/Mesh";

export default class MeshFilter extends Component {
    public mesh: Mesh = new Mesh;
}