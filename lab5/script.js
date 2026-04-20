const startBtn = document.getElementById('startBtn');
const difficultySelect = document.getElementById('difficulty');
const colorSelect = document.getElementById('colorSelect');
const gameArea = document.getElementById('gameArea');

function createPixel(color) {
    // Видаляємо старий піксель, якщо він є
    const oldPixel = document.getElementById('pixel');
    if (oldPixel) oldPixel.remove();

    const pixel = document.createElement('div');
    pixel.id = 'pixel';
    pixel.style.backgroundColor = color;

    // Випадкові координати
    const x = Math.floor(Math.random() * (gameArea.clientWidth - 20));
    const y = Math.floor(Math.random() * (gameArea.clientHeight - 20));

    pixel.style.left = x + 'px';
    pixel.style.top = y + 'px';

    // Подія при кліку на піксель
    pixel.addEventListener('click', () => {
        alert('You caught it!');
        pixel.remove();
    });

    gameArea.appendChild(pixel);
}

startBtn.addEventListener('click', () => {
    const timeLimit = parseInt(difficultySelect.value) * 1000; 
    const selectedColor = colorSelect.value;

    createPixel(selectedColor);

    // Таймер завершення гри
    setTimeout(() => {
        const pixel = document.getElementById('pixel');
        if (pixel) {
            pixel.remove();
            alert('Time is up! Game over.');
        }
    }, timeLimit);
});
