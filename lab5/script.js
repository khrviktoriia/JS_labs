const startBtn = document.getElementById('startBtn');
const difficultySelect = document.getElementById('difficulty');
const colorSelect = document.getElementById('colorSelect');
const gameArea = document.getElementById('gameArea');
const scoreDisplay = document.getElementById('scoreBoard');

let score = 0;          // Поточний рахунок
let gameActive = false; // Статус гри (чи триває вона зараз)
let gameTimer;          // Змінна для керування таймером

/**
 * Функція для створення та розміщення "пікселя" на полі
 */
function createPixel() {
    if (!gameActive) return;

    const oldPixel = document.getElementById('pixel');
    if (oldPixel) oldPixel.remove();

    const pixel = document.createElement('div');
    pixel.id = 'pixel';
    
    // Встановлюємо колір, який вибрав користувач
    pixel.style.backgroundColor = colorSelect.value;

    // Розраховуємо випадкові координати в межах ігрового поля
    // Віднімаємо 30 пікселів, щоб квадрат не виходив за межі поля
    const maxX = gameArea.clientWidth - 30;
    const maxY = gameArea.clientHeight - 30;
    
    const x = Math.floor(Math.random() * maxX);
    const y = Math.floor(Math.random() * maxY);

    pixel.style.left = x + 'px';
    pixel.style.top = y + 'px';

    // Обробка натискання на піксель
    pixel.addEventListener('click', () => {
        if (gameActive) {
            score++; // Збільшуємо рахунок
            scoreDisplay.textContent = `Score: ${score}`; // Оновлюємо текст на екрані
            createPixel(); // Відразу створюємо наступний піксель
        }
    });

    gameArea.appendChild(pixel);
}

/**
 * Обробник натискання кнопки Start
 */
startBtn.addEventListener('click', () => {
    // Скидаємо гру до початкового стану
    score = 0;
    scoreDisplay.textContent = `Score: 0`;
    gameActive = true;
    
    // Отримуємо час гри зі списку (переводимо секунди у мілісекунди)
    const seconds = parseInt(difficultySelect.value);
    const timeLimit = seconds * 1000;

    // Запускаємо перший піксель
    createPixel();

    // Очищуємо старий таймер, якщо користувач натиснув "Start" повторно
    clearTimeout(gameTimer);

    // Встановлюємо таймер завершення гри
    gameTimer = setTimeout(() => {
        gameActive = false; // Зупиняємо логіку гри
        
        const pixel = document.getElementById('pixel');
        if (pixel) pixel.remove(); // Видаляємо останній піксель з екрана
        
        // Виводимо результат
        alert(`Гру закінчено! Ваш результат: ${score} очок.`);
    }, timeLimit);
});
