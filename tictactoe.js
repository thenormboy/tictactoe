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
        board[rowLocation][columnLocation] = player.getToken();
        player.getRowArray().push(rowLocation);
        player.getColumnArray().push(columnLocation);
        player.getCellArray(rowLocation, columnLocation)
    }

    const displayBoard = () => {
        container.textContent = '';
        (Gameboard.getBoard()).forEach((element, rowIndex) => {
            element.forEach((content, columnIndex) => {
                const cell = document.createElement('div');

                cell.addEventListener('click', () => {
                    Gameboard.placeToken(DisplayController.getActivePlayer(), cell.getAttribute('id')[0], cell.getAttribute('id')[2]);
                    Gameboard.displayBoard();

                    console.log(DisplayController.getActivePlayer().getCellArray())

                    if ((DisplayController.checkWinCondition(DisplayController.getActivePlayer().getRowArray()) == true) && (DisplayController.checkWinCondition(DisplayController.getActivePlayer().getColumnArray()) == true)) {
                        console.log(DisplayController.getActivePlayer().getName())
                    }

                    DisplayController.switchPlayerTurn();
                })
                
                cell.textContent = content;
                cell.setAttribute('id', [rowIndex, columnIndex] )
                container.appendChild(cell).className = 'cell';
            })
        });
    }

    return {
        getBoard,
        placeToken,
        displayBoard
    }

})();

const player = (name, token, rowArray, columnArray, cellArray) => {
    const getName = () => name;
    const getToken = () => token;
    const getRowArray = () => rowArray;
    const getColumnArray = () => columnArray;
    const getCellArray = (row, column) => cellArray.push([row, column])

    return { getName, getToken, getRowArray, getColumnArray, getCellArray }
}

const DisplayController = (() => {
    const game = Gameboard;
    const players = [player("Player One", "X", [], [], []), player("Player Two", "O", [], [], [])]

    game.displayBoard();

    let activePlayer = players[0];

    const switchPlayerTurn = () => {
        if (activePlayer === players[0]) {
            activePlayer = players[1]
        } else {
            activePlayer = players[0]
        }
    }

    const getActivePlayer = () => activePlayer;

    const playRound = () => {
        game;
    }

    const checkWinCondition = (playerArray) => {

        let checkZeroes = []
        let checkOnes = []
        let checkTwos = []

        if (playerArray.includes('0')) {
            checkZeroes = playerArray.filter((value) => value == '0');
            if (checkZeroes.length == 3) {
                return true;
            } else if (playerArray.includes('2') && playerArray.includes('1')) {
                return true;
            } 
        } else if (playerArray.includes('1')) {
            checkOnes = playerArray.filter((value) => value == '1')
            if (checkOnes.length == 3) {
                return true;
            } else if (playerArray.includes('0') && playerArray.includes('2')) {
                return true;
            } 
        } else if (playerArray.includes('2')) {
            checkTwos = playerArray.filter((value) => value == '2')
            if (checkTwos.length == 3) {
                return true;
            } else if (playerArray.includes('0') && playerArray.includes('1')) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    return {
        getActivePlayer,
        playRound,
        switchPlayerTurn,
        checkWinCondition
    }
})();

DisplayController.playRound();