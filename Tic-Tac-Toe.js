const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const resetBtn = document.getElementById('resetBtn');

const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], 
    [0, 3, 6], [1, 4, 7], [2, 5, 8], 
    [0, 4, 8], [2, 4, 6]             
];

let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let isGameActive = true;

function initGame() {
    cells.forEach(cell => cell.addEventListener('click', cellClicked));
    resetBtn.addEventListener('click', restartGame);
}

function cellClicked() {
    const index = this.getAttribute('data-index');

    if (options[index] !== "" || !isGameActive) {
        return;
    }

    updateCell(this, index);
    checkWinner();
}

function updateCell(cell, index) {
    options[index] = currentPlayer;
    cell.textContent = currentPlayer;
}

function changePlayer() {
    currentPlayer = (currentPlayer === "X") ? "O" : "X";
}

function checkWinner() {
    let roundWon = false;

    for (let i = 0; i < winPatterns.length; i++) {
        const [a, b, c] = winPatterns[i];
        if (options[a] === "" || options[b] === "" || options[c] === "") {
            continue;
        }
        if (options[a] === options[b] && options[b] === options[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {;
        isGameActive = false;
    } else if (!options.includes("")) {
        isGameActive = false;
    } else {
        changePlayer();
    }
}

function restartGame() {
    currentPlayer = "X";
    options = ["", "", "", "", "", "", "", "", ""];
    cells.forEach(cell => cell.textContent = "");
    isGameActive = true;
}

initGame();