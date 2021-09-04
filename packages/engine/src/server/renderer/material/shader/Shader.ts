import RendererServer from "../../RendererServer";
import ShaderAttribute from "./attribute/ShaderAttribute";
import ShaderUniform from "./uniform/ShaderUniform";

interface IAttribute {
    [key: string]: ShaderAttribute;
}

interface IUniforms {
    [key: string]: ShaderUniform;
}

export default class Shader {
    public readonly code: string;
    public readonly attributes: IAttribute = {};
    public readonly uniforms: IUniforms = {};
    public readonly type: number;

    constructor(code: string, type: number) {
        this.code = code;
        this.type = type;
    }

    public compileShader(): WebGLShader {
        return RendererServer.contextManager.createShader(this.type, this.code);
    }

    public createAttribute<T extends ShaderAttribute>(name: string, type: number, size: number = 3, attr: new (...args: any) => T): T {
        if (this.hasAttribute(name)) {
            this.removeAttribute(name);
        }

        this.attributes[name] = new attr(name, type, size);

        return this.attributes[name] as T;
    }

    hasAttribute(name: string): boolean {
        return !!this.attributes[name];
    }

    removeAttribute(name: string): Shader {
        if (!this.hasAttribute(name)) {
            delete this.attributes[name];
        }

        return this;
    }

    public createUniform<T extends ShaderUniform>(name: string, uniform: new (...args: any) => T): T {
        if (this.hasUniform(name)) {
            this.removeUniform(name);
        }

        this.uniforms[name] = new uniform(name);

        return this.uniforms[name] as T;
    }

    public hasUniform(name: string): boolean {
        return !!this.uniforms[name];
    }

    removeUniform(name: string): void {
        if (this.hasUniform(name)) {
            delete this.uniforms[name];
        }
    }
}