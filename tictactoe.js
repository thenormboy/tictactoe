const Gameboard = (() => {
    const row = 3;
    const column = 3;
    const board = [];
    const container = document.querySelector('.container')
    const display = document.querySelector('.display')

    for (i = 0; i < row; i++) {
        board[i] = [];
        for (j = 0; j < column; j++) {
            board[i].push('');
        }
    }

    const getBoard = () => board;

    const resetBoard = (gameBoard) => {
        for (i = 0; i < row; i++) {
            gameBoard[i] = [];
            for (j = 0; j < column; j++) {
                gameBoard[i].push('');
            }
        }
    }

    const placeToken = (player, rowLocation, columnLocation) => {
        board[rowLocation][columnLocation] = player.getToken();
        player.getRowArray().push(rowLocation);
        player.getColumnArray().push(columnLocation);
        player.getCellArray().push([rowLocation, columnLocation])
    }

    const createCell = (content, rowIndex, columnIndex) => {
        const cell = document.createElement('div');

                function cellClick() {

                    if (cell.textContent) {
                        return;
                    }

                    Gameboard.placeToken(DisplayController.getActivePlayer(), cell.getAttribute('id')[0], cell.getAttribute('id')[2]);
                    Gameboard.displayBoard();
                    
                    if ((DisplayController.checkWinConditionOne(DisplayController.getActivePlayer().getRowArray()) == true) || 
                        (DisplayController.checkWinConditionOne(DisplayController.getActivePlayer().getColumnArray()) == true)) {

                            DisplayController.getActivePlayer().getIsWinner = true;
                        
                        if (DisplayController.getActivePlayer().getIsWinner) {
                            displayWinningBoard();
                            return;
                        }
                        
                    } else if (DisplayController.checkWinConditionTwo(DisplayController.getActivePlayer().getCellArray()) == true) {
                        DisplayController.getActivePlayer().getIsWinner = true;
                        
                        if (DisplayController.getActivePlayer().getIsWinner) {
                            displayWinningBoard();
                            return;
                        }

                    }  else if (DisplayController.checkTieCondition()) {
                        display.textContent = 'Tie';
                        return;
                    }
                    
                    DisplayController.switchPlayerTurn();
                    display.textContent = DisplayController.getActivePlayer().getName() + "'s Turn";
                    cell.removeEventListener('click', cellClick)
                }
                cell.addEventListener('click', cellClick)
                cell.textContent = content;
                cell.setAttribute('id', [rowIndex, columnIndex] )
                container.appendChild(cell).className = 'cell';
    }

    const displayBoard = () => {
        container.textContent = '';
        
        (Gameboard.getBoard()).forEach((element, rowIndex) => {
            element.forEach((content, columnIndex) => {
                createCell(content, rowIndex, columnIndex)
            })
        });
    }

    const displayWinningBoard = () => {
        display.textContent = DisplayController.getActivePlayer().getName() + " Wins";
        container.textContent = '';
        (Gameboard.getBoard()).forEach((element, rowIndex) => {
            element.forEach((content, columnIndex) => {
                
                const cell = document.createElement('div');
                cell.textContent = content;
                cell.setAttribute('id', [rowIndex, columnIndex] )
                
                container.appendChild(cell).className = 'cell';

            })
        });
    }

    return {
        getBoard,
        placeToken,
        createCell,
        displayBoard,
        displayWinningBoard,
        resetBoard
    }

})();

const player = (name, token, rowArray, columnArray, cellArray, isWinner) => {
    const getName = () => name;
    const getToken = () => token;
    const getRowArray = () => rowArray;
    const getColumnArray = () => columnArray;
    const getCellArray = () => cellArray;
    const getIsWinner = () => isWinner;
    

    return { getName, getToken, getRowArray, getColumnArray, getCellArray, getIsWinner }
}

const DisplayController = (() => {
    const game = Gameboard;
    const display = document.querySelector('.display')
    const restart = document.querySelector('.restart')
    let players = [player("Player One", "X", [], [], [], false), player("Player Two", "O", [], [], [], false)]

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
        display.textContent = DisplayController.getActivePlayer().getName() + "'s Turn";
        game;
    }

    const checkWinConditionOne = (playerArray) => {

        let checkZeroes = []
        let checkOnes = []
        let checkTwos = []

        checkZeroes = playerArray.filter((value) => value == '0')
        checkOnes = playerArray.filter((value) => value == '1')
        checkTwos = playerArray.filter((value) => value == '2')

        if (checkZeroes.includes('0')) {
            if (checkZeroes.length == 3) {
                return true;
            } 
        }
        if (checkOnes.includes('1')) {
            if (checkOnes.length == 3) {
                return true;
            } 
        }
        if (checkTwos.includes('2')) {
            if (checkTwos.length == 3) {
                return true;
            }
        }
        return false;
    }

    const checkWinConditionTwo = (playerArray) => {

        let playerArrayString = [];

        playerArray.forEach(turnToString);

        function turnToString(value) {
            playerArrayString.push(value.toString())
        }

        if (playerArrayString.includes('0,0') && playerArrayString.includes('1,1') && playerArrayString.includes('2,2')) {
            return true;
        } else if (playerArrayString.includes('0,2') && playerArrayString.includes('1,1') && playerArrayString.includes('2,0')) {
            return true;
        } else {
            return false;
        }
    }

    const checkTieCondition = () => {

        let filledSpaces = 0;

        game.getBoard().forEach((element) => {
            element.forEach((content) => {
                if (!(content == '')) {
                    filledSpaces += 1;
                }
            })
        })

        if (filledSpaces == 9) {
            return true;
        } else {
            return false;
        }
    }


    restart.addEventListener('click', restartGame)

    function restartGame() {
        
        players = [player("Player One", "X", [], [], [], false), player("Player Two", "O", [], [], [], false)]

        activePlayer = players[0]
        game.resetBoard(game.getBoard());

        game.displayBoard();
        DisplayController.playRound();
    }
    

    return {
        getActivePlayer,
        playRound,
        switchPlayerTurn,
        checkWinConditionOne,
        checkWinConditionTwo,
        checkTieCondition
    }
})();

DisplayController.playRound();