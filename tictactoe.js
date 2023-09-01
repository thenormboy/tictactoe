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
    const getCell = (rowIndex, columnIndex) => board[rowIndex][columnIndex]

    const placeToken = (player, rowLocation, columnLocation) => {
        board[rowLocation][columnLocation] = player;
    }

    return {
        getBoard,
        getCell,
        placeToken
    }

})();

//const cell = () => {
//    let value = '';

//    const changeCell = (player) => {
//        value = player.getToken();
//    }

//    return value;
    
//}

const player = (name, token) => {
    const getName = () => name;
    const getToken = () => token;

    return { getName, getToken}
}

const GameController = (() => {
    const player1 = player("Player One", "X");
    const player2 = player("Player Two", "O");


    Gameboard.placeToken(player2.getToken(), 0, 0);
    console.log(Gameboard.getBoard());

})

GameController();