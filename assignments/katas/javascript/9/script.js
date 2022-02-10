const row0col0Element = document.getElementById("row-0-col-0");
const row0col1Element = document.getElementById("row-0-col-1");
const row0col2Element = document.getElementById("row-0-col-2");

const row1col0Element = document.getElementById("row-1-col-0");
const row1col1Element = document.getElementById("row-1-col-1");
const row1col2Element = document.getElementById("row-1-col-2");

const row2col0Element = document.getElementById("row-2-col-0");
const row2col1Element = document.getElementById("row-2-col-1");
const row2col2Element = document.getElementById("row-2-col-2");

const winnerElement = document.getElementById("winner");

/*
    Copied from http://stackoverflow.com/questions/17428587/transposing-a-2d-array-in-javascript
    "Rotates" the board by switching columns and rows.
*/
function transposeBoard(board) {
    return board[0].map((col, i) => board.map(row => row[i]));
}

/*
    Convert string piece to number.
*/
function pieceToNum(piece) {
    switch (piece) {
        case "X":
            return 1;
        case "O":
            return -1;
        default:
            return 0;
    }
}

/*
    Convert number to string piece.
*/
function numToPiece(num) {
    switch (num) {
        case 1:
            return "X";
        case -1:
            return "O";
        default:
            return "E";
    }
}

/*
    Sums elements of one-dimensional array.
*/
function sumRow(row) {
    return row.reduce((sum, element) => sum + element);
}

/*
    Converts both diagonals to two one-dimensional arrays,
    and returns the rowSum for each diagonal.
*/
function threeInADiagonal(board) {
    let firstDiagonal = [board[0][0], board[1][1], board[2][2]];
    let secondDiagonal = [board[0][2], board[1][1], board[2][0]];

    return [sumRow(firstDiagonal), sumRow(secondDiagonal)];
}

/*
    1. Convert board elements to numbers
        X => 1 | O => -1 | E => 0

    2. Check every rowSum for both the original and transpose.
        if rowSum ===  3, X won.
        if rowSum === -3, O won.

    3. If no win, check diagonals in the same way.

    4. If still no win, its a draw.
*/
function whoWon(board) {
    // 1. Convert board elements to numbers
    let mathyBoard = board.map((row) => {
        return row.map(pieceToNum);
    });

    // 2. Check every rowSum for both the original and transpose.
    for(let i = 0; i < 2; i++) {
        for(row of mathyBoard) {
            let rowSum = sumRow(row);
            
            if(Math.abs(rowSum) === 3) {
                return numToPiece(rowSum / 3);
            }
        }
        mathyBoard = transposeBoard(mathyBoard);
    }

    // 3. If no win, check diagonals in the same way.
    let diagonals = threeInADiagonal(mathyBoard);
    if(Math.abs(diagonals[0]) === 3) {
        return numToPiece(diagonals[0] / 3);
    }
    if(Math.abs(diagonals[1]) === 3) {
        return numToPiece(diagonals[1] / 3);
    }

    // 4. If still no win, its a draw.
    return "Draw";
}



function checkBoard() {
    let board = [Array(3), Array(3), Array(3)];
    
    board[0][0] = row0col0Element.value;
    board[0][1] = row0col1Element.value;
    board[0][2] = row0col2Element.value;

    board[1][0] = row1col0Element.value;
    board[1][1] = row1col1Element.value;
    board[1][2] = row1col2Element.value;

    board[2][0] = row2col0Element.value;
    board[2][1] = row2col1Element.value;
    board[2][2] = row2col2Element.value;

    let result = whoWon(board);
    winnerElement.innerText = (result === "X" || result == "O") ? `${result} won!` : `It's a ${result}`;
}