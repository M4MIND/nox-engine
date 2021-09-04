import Shader from "./Shader";
import RendererServer from "../../RendererServer";

export default class FragmentShader extends Shader {
    constructor(code: string) {
        super(code, RendererServer.contextManager.context.FRAGMENT_SHADER);
    }
}