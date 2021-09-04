import VertexShader from "./VertexShader";
import FragmentShader from "./FragmentShader";

export default class ShaderWrapper {
    public readonly vertexShader: VertexShader;
    public readonly fragmentShader: FragmentShader;

    constructor(vs: VertexShader, fs: FragmentShader) {
        this.vertexShader = vs;
        this.fragmentShader = fs;
    }
}