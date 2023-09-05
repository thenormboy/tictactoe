const Gameboard = (() => {
    const row = 3;
    const column = 3;
    const board = [];
    const container = document.querySelector('.container')

    for (i = 0; i < row; i++) {
        board[i] = [];
        for (j = 0; j < column; j++) {
            board[i].push('');
        }
    }

    const getBoard = () => board;
    const getCell = (rowIndex, columnIndex) => board[rowIndex][columnIndex]

    const placeToken = (player, rowLocation, columnLocation) => {
        board[rowLocation][columnLocation] = player;
    }

    const displayBoard = () => {
        container.textContent = '';

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

    return { getName, getToken }
}

const DisplayController = (() => {
    const game = Gameboard;
    const players = [player("Player One", "X"), player("Player Two", "O")]

    let activePlayer = players[0];

    const switchPlayerTurn = () => {
        if (activePlayer === players[0]) {
            activePlayer = players[1]
        } else {
            activePlayer = players[0]
        }
    }

    const getActivePlayer = () => activePlayer;




    game.displayBoard();

})

DisplayController();