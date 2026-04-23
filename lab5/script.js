const startBtn = document.getElementById('startBtn');
const difficultySelect = document.getElementById('difficulty');
const colorSelect = document.getElementById('colorSelect');
const gameArea = document.getElementById('gameArea');
const scoreDisplay = document.getElementById('scoreBoard');
const timeLeftDisplay = document.getElementById('timeLeft');

let score = 0;
let gameActive = false;
let pixelTimer;        
let countdownInterval; 
let currentSecondsLeft = 0;

function createPixel() {
    if (!gameActive) return;

    const oldPixel = document.getElementById('pixel');
    if (oldPixel) oldPixel.remove();
    clearTimeout(pixelTimer);
    clearInterval(countdownInterval);

    const pixel = document.createElement('div');
    pixel.id = 'pixel';
    pixel.style.backgroundColor = colorSelect.value;

   
    const maxX = gameArea.clientWidth - 35;
    const maxY = gameArea.clientHeight - 35;
    pixel.style.left = Math.floor(Math.random() * maxX) + 'px';
    pixel.style.top = Math.floor(Math.random() * maxY) + 'px';

 
    currentSecondsLeft = parseInt(difficultySelect.value);
    timeLeftDisplay.textContent = currentSecondsLeft;

    countdownInterval = setInterval(() => {
        currentSecondsLeft--;
        if (currentSecondsLeft >= 0) {
            timeLeftDisplay.textContent = currentSecondsLeft;
        } else {
            clearInterval(countdownInterval);
        }
    }, 1000);

   
    pixel.addEventListener('click', (e) => {
        e.stopPropagation();
        if (gameActive) {
            score++;
            scoreDisplay.textContent = score;
            createPixel(); // Перезапуск циклу
        }
    });

    gameArea.appendChild(pixel);

   
    pixelTimer = setTimeout(() => {
        endGame();
    }, parseInt(difficultySelect.value) * 1000);
}

function endGame() {
    gameActive = false;
    clearInterval(countdownInterval);
    const pixel = document.getElementById('pixel');
    if (pixel) pixel.remove();
    alert(`Гру закінчено! Час вийшов.\nВаш фінальний рахунок: ${score}`);
}

startBtn.addEventListener('click', () => {
    score = 0;
    scoreDisplay.textContent = "0";
    gameActive = true;
    
    clearTimeout(pixelTimer);
    clearInterval(countdownInterval);
    
    createPixel();
});
