export const TETROMINOS = {
    0: { shape: [[0]], color: '0, 0, 0'},
    I: {
        shape: [
                [0, 'I', 0, 0],
                [0, 'I', 0, 0],
                [0, 'I', 0, 0],
                [0, 'I', 0, 0]
               ],
        color: '245, 165, 159',
    },

    J: {
        shape: [
                [0, 'J', 0],
                [0, 'J', 0],
                ['J', 'J', 0]
               ],
        color: '133, 244, 243',
    },

    L: {
        shape: [
                [0, 'L', 0],
                [0, 'L', 0],
                [0, 'L', 'L']
               ],
        color: '245, 195, 110',
    },

    O: {
        shape: [
              ['O', 'O'],
              ['O', 'O']
               ],
        color: '147, 195, 245',
    },
    S: {
        shape: [
                [0, 'S', 'S'],
                ['S', 'S', 0],
                [0, 0, 0]
               ],
        color: '122, 245, 173',
    },

    T: {
        shape: [
                [0, 0, 0],
                ['T', 'T', 'T'],
                [0, 'T', 0]
               ],
        color: '213, 159, 245',
    },

    Z: {
        shape: [
                ['Z', 'Z', 0],
                [0, 'Z','Z'],
                [0, 0, 0]
               ],
        color: '227, 78, 78',
    },

}

export const randomTetromino =() => {
    const tetrominos = 'IJLOSTZ';
    const randTetromino = 
        tetrominos[Math.floor(Math.random() * tetrominos.length)];
    return TETROMINOS[randTetromino]
}