const Gameboard = (() => {
    const row = 3;
    const column = 3;
    const board = [];
    const container = document.querySelector('.container')

    for (i = 0; i < row; i++) {
        board[i] = [];
        for (j = 0; j < column; j++) {
            board[i].push('x');
        }
    }

    const getBoard = () => board;
    const getCell = (rowIndex, columnIndex) => board[rowIndex][columnIndex]

    const placeToken = (player, rowLocation, columnLocation) => {
        board[rowLocation][columnLocation] = player;
    }

    const displayBoard = () => {
        (Gameboard.getBoard()).forEach(element => {
            element.forEach(content => {
                const cell = document.createElement('div');
                cell.textContent = content;
                container.appendChild(cell).className = 'grid-item';
            })
        });
    }

    return {
        getBoard,
        getCell,
        placeToken,
        displayBoard
    }

})();

const player = (name, token) => {
    const getName = () => name;
    const getToken = () => token;

    return { getName, getToken}
}

const GameController = (() => {
    const player1 = player("Player One", "X");
    const player2 = player("Player Two", "O");

    Gameboard.displayBoard();
    Gameboard.placeToken(player2.getToken(), 0, 0);
    console.log(Gameboard.getBoard());

})

GameController();