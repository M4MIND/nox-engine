import RendererServer from '../../../RendererServer';

export default class Library {
    private chunks: { [index: string]: string } = {};

    public add(code: string) {
        RendererServer.shaderManager.parser.getExport(code, (name: string, code: string) => {
            if (this.has(name)) {
                this.remove(name);
            }

            this.chunks[name] = code;
        });
    }

    public get(name: string): string | null {
        return this.chunks[name] ?? null;
    }

    public has(name: string): boolean {
        return !!this.chunks[name];
    }

    public remove(name: string): void {
        delete this.chunks[name];
    }
}
