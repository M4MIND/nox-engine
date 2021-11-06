export default class Hash {
    public static generate(s: string) {
        let hash = 0,
            i,
            chr;

        if (s.length === 0) {
            return hash;
        }
        for (i = 0; i < s.length; i++) {
            chr = s.charCodeAt(i);
            hash = (hash << 5) - hash + chr;
            hash |= 0;
        }
        return hash;
    }

    public static uuid(): string {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (substring, args) => {
            return (substring === 'x' ? Math.random() * 16 | 0 : Math.random() & 0x3 | 0x8).toString(16);
        });
    }
}