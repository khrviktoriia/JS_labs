let currentGrid = [];
let steps = 0;

async function loadLevel(index) {
    const response = await fetch('./data/levels.json');
    const data = await response.json();
    const level = data.levels[index];
    
    currentGrid = level.grid;
    steps = 0;
    document.getElementById('steps').innerText = steps;
    renderBoard();
}

function renderBoard() {
    const board = document.getElementById('game-board');
    board.innerHTML = ''; // Очищуємо поле

    for (let r = 0; r < 5; r++) {
        for (let c = 0; c < 5; c++) {
            const cell = document.createElement('div');
            cell.className = `cell ${currentGrid[r][c] === 1 ? 'is-on' : 'is-off'}`;
            cell.onclick = () => handleMove(r, c);
            board.appendChild(cell);
        }
    }
}

function handleMove(r, c) {
    toggle(r, c);       // Сама клітинка
    toggle(r-1, c);     // Сусіди
    toggle(r+1, c);
    toggle(r, c-1);
    toggle(r, c+1);
    
    steps++;
    document.getElementById('steps').innerText = steps;
    renderBoard();
    checkWin();
}

function toggle(r, c) {
    if (r >= 0 && r < 5 && c >= 0 && c < 5) {
        currentGrid[r][c] = currentGrid[r][c] === 1 ? 0 : 1;
    }
}

function checkWin() {
    const isWon = currentGrid.every(row => row.every(cell => cell === 0));
    if (isWon) alert('Перемога!');
}

// Завантажити перший рівень при старті
loadLevel(0);
