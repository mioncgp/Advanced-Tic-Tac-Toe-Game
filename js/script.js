const X_CLASS = "x";
const O_CLASS = "o";
const cellElements = document.querySelectorAll('[data-cell]');
const board = document.getElementById("board");
const winningMessageTextElement = document.querySelector("[data-winning-message-text]");
const winningMessageElement = document.getElementById("winningMessage");
let oTurn = false;
const restartButton = document.getElementById("restartButton");
const WINNIG_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

restartButton.addEventListener("click", startGame);

function startGame() {
    cellElements.forEach(cell => {
        cell.classList.remove(X_CLASS);
        cell.classList.remove(O_CLASS);
        cell.addEventListener("click", handleClick, { once: true });
    })
    setHoverClass();
    winningMessageElement.classList.remove("show");
}

function handleClick(e) {
    const cell = e.target;
    const currentClass = oTurn ? O_CLASS: X_CLASS;
    placeMark(cell, currentClass);
    if(checkWin(currentClass)) {
        endGame(false);
    } else if (isDraw()) {
        endGame(true);
    } else {
        swapTurns();
        setHoverClass()
    }
}

function isDraw() {
    return [...cellElements].every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS);
    })
}

function endGame(draw) {
    if(draw) {
        winningMessageTextElement.innerText = "Draw!"
    } else {
        winningMessageTextElement.innerText = `${oTurn ? "O's" : "X's"} Wins!`;
    }
    winningMessageElement.classList.add("show");
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass);
}

function swapTurns() {
    oTurn = !oTurn;
}

function setHoverClass() {
    board.classList.remove(X_CLASS);
    board.classList.remove(O_CLASS);
    if(oTurn) {
        board.classList.add(O_CLASS);
    } else {
        board.classList.add(X_CLASS);
    }
}

function checkWin(currentClass) {
    return  WINNIG_COMBINATIONS.some(combination => {
      return  combination.every(index => {
        return cellElements[index].classList.contains(currentClass);
        })
    })
}

startGame();

