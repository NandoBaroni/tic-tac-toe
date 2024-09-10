const prompt = require('prompt-sync')();

let board = [
    ['-', '-', '-'],
    ['-', '-', '-'],
    ['-', '-', '-']
];

// Function to print the board
function printBoard() {
    for (let row of board) {
        console.log(row.join(' '));
    }
}

// Function to check if there's a winner
function checkWin(marker) {
    // Check rows
    for (let row of board) {
        if (row.every(cell => cell === marker)) return true;
    }

    // Check columns
    for (let col = 0; col < 3; col++) {
        if (board[0][col] === marker && board[1][col] === marker && board[2][col] === marker) return true;
    }

    // Check diagonals
    if (board[0][0] === marker && board[1][1] === marker && board[2][2] === marker) return true;
    if (board[0][2] === marker && board[1][1] === marker && board[2][0] === marker) return true;

    return false;
}

// Function to check if the game is a draw
function checkDraw() {
    for (let row of board) {
        if (row.includes('-')) return false;
    }
    return true;
}

// Function to play the game
function playGame() {
    let currentPlayer = 'X'; // Player 1 starts
    let gameOver = false;

    while (!gameOver) {
        console.log(`Current Board:`);
        printBoard();

        // Ask the current player for their move
        console.log(`Player ${currentPlayer}, it's your turn.`);
        let move = prompt('Enter your move (row column): ').trim();

        // Split and validate input
        let moveParts = move.split(' ');

        // Validate the input to make sure it's two numbers
        if (moveParts.length !== 2 || isNaN(moveParts[0]) || isNaN(moveParts[1])) {
            console.log('Invalid input. Please enter two numbers separated by a space, e.g., "1 1".');
            continue; // Retry asking for the move
        }

        let row = parseInt(moveParts[0]) - 1;
        let col = parseInt(moveParts[1]) - 1;

        // Validate the move (check if it's within bounds and the cell is empty)
        if (row >= 0 && row < 3 && col >= 0 && col < 3 && board[row][col] === '-') {
            board[row][col] = currentPlayer;

            // Check for a win or draw
            if (checkWin(currentPlayer)) {
                console.log(`Player ${currentPlayer} wins!`);
                printBoard();
                gameOver = true;
            } else if (checkDraw()) {
                console.log("It's a draw!");
                printBoard();
                gameOver = true;
            } else {
                // Switch players
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            }
        } else {
            console.log('Invalid move. Please select an empty cell within the 3x3 grid.');
        }
    }
}

// Function to start the game and offer replay
function startGame() {
    let playAgain = 'yes';

    while (playAgain.toLowerCase() === 'yes') {
        // Reset the board
        board = [
            ['-', '-', '-'],
            ['-', '-', '-'],
            ['-', '-', '-']
        ];

        playGame();
        playAgain = prompt('Do you want to play again? (yes/no): ');
    }

    console.log('Thanks for playing!');
}

// Start the game
startGame();
