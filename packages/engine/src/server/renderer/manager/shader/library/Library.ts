export default class Library {
    private chunks: { [index: string]: string } = {};

    public add(code: string) {
        // Finding @export chunks
        code.replace(new RegExp('@export (.+?);([\\s|\\S|\\n|.]+?)@end;', 'gm'), (substring: string, ...args: string[]): string => {
            let name = args[0].trim();
            if (name) {
                this.remove(name);
            }

            this.chunks[name] = args[1].trim();

            return '';
        });

        console.dir(this.chunks);
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
