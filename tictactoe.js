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

const cell = () => {
    
}

const player = (name, token) => {
    const getName = () => name;
    const getToken = () => token;


}

const GameController = (() => {
    const player1 = player("Player 1", "X");
    const player2 = player("Player Two", "O");
})

console.log(Gameboard.getBoard());