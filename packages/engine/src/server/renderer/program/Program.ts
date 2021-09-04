import Shader from "../material/shader/Shader";
import RendererServer from "../RendererServer";
import ShaderAttribute from "../material/shader/attribute/ShaderAttribute";
import ShaderUniform from "../material/shader/uniform/ShaderUniform";

interface IAttributeCache {
    [index: string]: number
}

interface IUniformCache {
    [index: string]: WebGLUniformLocation
}

export default class Program {
    private readonly program: WebGLProgram;
    private attributeCache: IAttributeCache = {};
    private uniformCache: IUniformCache = {};
    public readonly uid: string;

    constructor(program: WebGLProgram, uid: string) {
        this.program = program;
        this.uid = uid;
    }

    attachShader(shader: Shader) {
        RendererServer.contextManager.context.attachShader(this.program, shader.compileShader());
    }

    getAttributeLocation(attribute: ShaderAttribute): GLenum {
        if (!this.attributeCache[attribute.name]) {
            let attr = RendererServer.contextManager.context.getAttribLocation(this.program, attribute.name);
            this.attributeCache[attribute.name] = attr;

            return attr;
        }

        return this.attributeCache[attribute.name];
    }

    getUniformLocation(uniform: ShaderUniform): WebGLUniformLocation {
        if (!this.uniformCache[uniform.name]) {
            let un = RendererServer.contextManager.context.getUniformLocation(this.program, uniform.name) as WebGLUniformLocation;

            this.uniformCache[uniform.name] = un;

            return un;
        }

        return this.uniformCache[uniform.name];
    }

    link(): void {
        RendererServer.contextManager.context.linkProgram(this.program);

        if (!RendererServer.contextManager.context.getProgramParameter(this.program, RendererServer.contextManager.context.LINK_STATUS)) {
            console.error(RendererServer.contextManager.context.getProgramInfoLog(this.program));
        }
    }

    use(): void {
        RendererServer.contextManager.context.useProgram(this.program);
    }
}