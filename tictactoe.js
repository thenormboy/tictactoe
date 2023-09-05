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


    const placeToken = (player, rowLocation, columnLocation) => {
        board[rowLocation][columnLocation] = player;
    }

    const displayBoard = () => {
        container.textContent = '';
        (Gameboard.getBoard()).forEach((element, rowIndex) => {
            element.forEach((content, columnIndex) => {
                const cell = document.createElement('div');
                cell.textContent = content;
                cell.setAttribute('id', [rowIndex, columnIndex] )
                container.appendChild(cell).className = 'grid-item';
            })
        });
    }

    return {
        getBoard,
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

//    game.forEach(row => {
//        row.forEach((cell, index) => {
            
//        })
//    })

    game.displayBoard();

})

DisplayController();