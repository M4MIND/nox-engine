import { Hash } from '../../../../index';
import RendererServer from '../RendererServer';
import Program from './program/Program';

export default class ProgramManager {
    private programs: { [index: string | number]: Program } = {};

    public get(vertex: string | null, fragment: string | null): Program | null {
        if (!vertex || !fragment) {
            return null;
        }

        let key = Hash.generate(vertex) + Hash.generate(fragment);

        if (this.has(key)) {
            return this.programs[key];
        }

        let program = RendererServer.contextManager.createProgram(key, vertex, fragment);

        if (!program) {
            return null;
        }

        this.programs[key] = program;
        return program;
    }

    public has(key: string | number) {
        return !!this.programs[key];
    }
}
