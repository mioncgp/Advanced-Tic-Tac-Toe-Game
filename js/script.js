const X_CLASS = 'x';
const O_CLASS = 'o';
const cellElements = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const winningMEssageElement = document.getElementById("winningMessage");
const winningMEssageTextElement = document.querySelector('[data-winning-message-text]');
const restartButton = document.getElementById("restartButton");
let circleTurn;
const WINNING_COMBINATIONS = [
    // horizontal
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    // vertical
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    // diagonal
    [0, 4, 8],
    [2, 4, 6] 
]

startGame();

restartButton.addEventListener("click", startGame);

function startGame() {
    circleTurn = false;
    cellElements.forEach(cell => {
        cell.classList.remove(X_CLASS);
        cell.classList.remove(O_CLASS);
        cell.removeEventListener("click", handleClick);
        cell.addEventListener("click", handleClick, { once: true});
    });
    setBoardHoveClass();
    winningMEssageElement.classList.remove("show");
}

function handleClick(e) {
    const cell = e.target;
    const currentClass = circleTurn ? O_CLASS: X_CLASS;
    placeMark(cell, currentClass); //places a mark and thus displays it on a screen
    if(checkWin(currentClass)) {
        endGame(false);
    } else if(isDraw()) {
        endGame(true);
    } else {
        swapTurns();
        setBoardHoveClass();
    }
}

function endGame(draw) {
    if(draw) {
        winningMEssageTextElement.innerText = "Draw!";
    } else { 
        winningMEssageTextElement.innerText = `${circleTurn ? "O's": "X's"} Wins!`;
    }
    winningMEssageElement.classList.add("show");
}

function isDraw() {
    return [...cellElements].every(cell => {
        return cell.classList.contains(X_CLASS) ||
        cell.classList.contains(O_CLASS);
    })
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass);
}
// swaps between O and X
function swapTurns() {
    circleTurn = !circleTurn;
}

function setBoardHoveClass() {
    board.classList.remove(X_CLASS);
    board.classList.remove(O_CLASS);
    if(circleTurn) {
        board.classList.add(O_CLASS);
    } else {
        board.classList.add(X_CLASS);
    }
}

function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some(combination => {
       return combination.every(index => {
            return cellElements[index].classList.contains(currentClass);
        })
    })
}