import RendererServer from '../../../RendererServer';

export default class Parser {
    public getExport(code: string, callback: (name: string, code: string) => void) {
        let matches = [...code.matchAll(new RegExp('@export (.+?);([\\s|\\S|\\n|.]+?)@end;', 'gm'))];

        for (let m of matches) {
            if (m[1] && m[2]) {
                callback(m[1].trim(), m[2].trim());
            }
        }
    }

    public compile(code: string | null): string | null {
        if (!code) {
            return null;
        }

        code = code.replace(new RegExp('@import (.+?);', 'gm'), (substring: string, ...args: string[]) => {
            if (!RendererServer.shaderManager.library.has(args[0])) {
                console.error(`Compile shader error: Import '${args[0]}' -> is not found`);

                return '';
            }

            return RendererServer.shaderManager.library.get(args[0]) ?? '';
        });

        return code;
    }
}
