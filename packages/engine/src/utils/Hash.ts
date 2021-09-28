export default class Hash {
    public static generate(string: string) {
        var hash = 0;
        let char;
        for (let i = 0; i < string.length; i++) {
            char = string.charCodeAt(i);
            hash = (hash << 5) - hash + char;
            hash = hash & hash; // Convert to 32bit integer
        }
        return hash;
    }
}
