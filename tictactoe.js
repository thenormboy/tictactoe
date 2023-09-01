const Gameboard = (() => {
    const row = 3;
    const column = 3;
    const board = [];

    for (i = 0; i < row; i++) {
        board[i] = [];
        for (j = 0; j < column; j++) {
            board[i].push('x');
        }
    }

    const getBoard = () => board;

    return {
        getBoard
    }

})();

console.log(Gameboard.getBoard());