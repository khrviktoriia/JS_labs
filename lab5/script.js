const startBtn = document.getElementById('startBtn');
const difficultySelect = document.getElementById('difficulty');
const colorSelect = document.getElementById('colorSelect');
const gameArea = document.getElementById('gameArea');
const scoreDisplay = document.getElementById('scoreBoard');

let score = 0;
let gameActive = false;
let pixelTimer; // Це таймер, який ми будемо скидати

function createPixel() {
    if (!gameActive) return;

    // 1. ОЧИЩЕННЯ: Видаляємо старий піксель та СКИДАЄМО таймер
    const oldPixel = document.getElementById('pixel');
    if (oldPixel) oldPixel.remove();
    clearTimeout(pixelTimer); 

    // 2. СТВОРЕННЯ: Новий піксель
    const pixel = document.createElement('div');
    pixel.id = 'pixel';
    pixel.style.backgroundColor = colorSelect.value;

    // Позиціонування
    const maxX = gameArea.clientWidth - 30;
    const maxY = gameArea.clientHeight - 30;
    pixel.style.left = Math.floor(Math.random() * maxX) + 'px';
    pixel.style.top = Math.floor(Math.random() * maxY) + 'px';

    // 3. КЛІК: Якщо встигла — додаємо бал і запускаємо процес заново
    pixel.addEventListener('click', (e) => {
        e.stopPropagation();
        score++;
        scoreDisplay.textContent = `Score: ${score}`;
        createPixel(); // Створюємо новий піксель і скидаємо час
    });

    gameArea.appendChild(pixel);

    // 4. ТАЙМЕР: Якщо цей код спрацює раніше за клік — гра закінчена
    const timeLimit = parseInt(difficultySelect.value) * 1000;
    pixelTimer = setTimeout(() => {
        endGame();
    }, timeLimit);
}

function endGame() {
    gameActive = false;
    const pixel = document.getElementById('pixel');
    if (pixel) pixel.remove();
    alert(`Гру закінчено! Ви не встигли натиснути на піксель. Ваш рахунок: ${score}`);
}

startBtn.addEventListener('click', () => {
    // Початок нової гри
    score = 0;
    scoreDisplay.textContent = `Score: 0`;
    gameActive = true;
    
    // Очищуємо будь-які старі таймери перед стартом
    clearTimeout(pixelTimer);
    
    createPixel(); 
});
