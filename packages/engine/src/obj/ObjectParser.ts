export default class ObjectParser {
    public static parse(data: string): {
        vertices: [number, number, number][];
        normals: [number, number, number][];
        faces: FlatArray<[number, number, number][], 1>[];
    } {
        return {
            vertices: [...data.matchAll(new RegExp('^v (-?\\d+\\.?\\d+) (-?\\d+\\.?\\d+) (-?\\d+\\.?\\d+)', 'gm'))].map(
                (v) => {
                    return [parseFloat(v[1]), parseFloat(v[2]), parseFloat(v[3])];
                },
            ),
            normals: [...data.matchAll(new RegExp('^vn (-?\\d+\\.?\\d+) (-?\\d+\\.?\\d+) (-?\\d+\\.?\\d+)', 'gm'))].map(
                (v) => {
                    return [parseFloat(v[1]), parseFloat(v[2]), parseFloat(v[3])];
                },
            ),
            faces: [
                ...data.matchAll(
                    new RegExp(
                        '^f ([0-9]+)?\\/([0-9]+)?\\/([0-9]+) ([0-9]+)?\\/([0-9]+)?\\/([0-9]+) ([0-9]+)?\\/([0-9]+)?\\/([0-9]+)',
                        'gm',
                    ),
                ),
            ]
                .map((v) => {
                    return [parseInt(v[1]) - 1, parseInt(v[4]) - 1, parseInt(v[7]) - 1];
                })
                .flat(),
        };
    }
}
