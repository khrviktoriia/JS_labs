const startBtn = document.getElementById('startBtn');
const difficultySelect = document.getElementById('difficulty');
const colorSelect = document.getElementById('colorSelect');
const gameArea = document.getElementById('gameArea');
const scoreDisplay = document.getElementById('scoreBoard');

let score = 0;
let gameActive = false;
let gameTimer;

function createPixel() {
    if (!gameActive) return;

    // Видаляємо попередній піксель
    const oldPixel = document.getElementById('pixel');
    if (oldPixel) oldPixel.remove();

    const pixel = document.createElement('div');
    pixel.id = 'pixel';
    pixel.style.backgroundColor = colorSelect.value;

    // Розраховуємо позицію
    const maxX = gameArea.clientWidth - 30;
    const maxY = gameArea.clientHeight - 30;
    
    const x = Math.floor(Math.random() * maxX);
    const y = Math.floor(Math.random() * maxY);

    pixel.style.left = x + 'px';
    pixel.style.top = y + 'px';

    pixel.addEventListener('click', (e) => {
        e.stopPropagation(); // Запобігаємо зайвим спрацюванням
        if (gameActive) {
            score++;
            scoreDisplay.textContent = `Score: ${score}`;
            createPixel();
        }
    });

    gameArea.appendChild(pixel);
}

startBtn.addEventListener('click', () => {
    score = 0;
    scoreDisplay.textContent = `Score: 0`;
    gameActive = true;
    
    const timeLimit = parseInt(difficultySelect.value) * 1000;

    createPixel();

    clearTimeout(gameTimer);
    gameTimer = setTimeout(() => {
        gameActive = false;
        const pixel = document.getElementById('pixel');
        if (pixel) pixel.remove();
        alert(`Час вийшов! Ваш результат: ${score}`);
    }, timeLimit);
});
