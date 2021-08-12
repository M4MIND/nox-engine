export class Matrix4 {
    public e: number[][];

    constructor(m: number[][] = [[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]]) {
        this.e = m;
    }

    multiply(M: Matrix4) {
        let A = this.e;
        let B = M.e;
        let m: number[][] = [];

        for (let row = 0; row < A.length; row++) {
            let newRow: number[] = [];
            for (let col = 0; col < B[row].length; col++) {
                let dot = 0;

                for (let i = 0; i < A[row].length; i++) {
                    dot += A[row][i] * B[i][col];
                }

                newRow.push(dot);
            }
            m.push(newRow);
        }

        return new Matrix4(m);
    }
}