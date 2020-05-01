const X_CLASS = "x";
const CIRCLE_CLASS = "o";

const cellElements = document.querySelectorAll('[data-cell]');
let circleTurn;


cellElements.forEach(cell => {
    cell.addEventListener('click', handleClick, { once: true})
})

function handleClick(e) {
    const cell = e.target;
    console.log(cell)
    const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;
    placeMark(cell, currentClass)
    switchTruns(cell)
    checkWin();
    checkDraw();
}

function placeMark(cell , currentClass) {
    cell.classList.add(currentClass)
}

function switchTruns(cell) {
    if(cell.classList[1] === 'x') {
        circleTurn = true;
    } else if (cell.classList[1] === 'o') {
        circleTurn = false;
    }
}

function checkWin() {
    
}