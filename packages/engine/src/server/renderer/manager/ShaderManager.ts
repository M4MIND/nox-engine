import Library from './shader/library/Library';
import Parser from './shader/parser/Parser';

export interface IShaderManagerSettings {
    shaders?: [] | string;
}

export default class ShaderManager {
    public readonly library: Library;
    public readonly parser: Parser;

    constructor(settings: IShaderManagerSettings = {}) {
        this.library = new Library();
        this.parser = new Parser();

        this.add(settings.shaders ?? []);
    }

    add(library: string | []) {
        if (Array.isArray(library)) {
            for (let l of library) {
                this.library.add(l);
            }
        } else {
            this.library.add(library);
        }
    }

    get(name: string): string | null {
        if (this.library.has(name)) {
            return this.library.get(name);
        }

        console.error(`Shader manager: Shader "${name}" -> is not found`);

        return null;
    }
}
