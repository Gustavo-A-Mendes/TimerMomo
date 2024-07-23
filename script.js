// Total de horas para a barra de progresso
const totalHours = 36;
// Total de milissegundos para 120 horas
const totalMilliseconds = totalHours * 60 * 60 * 1000;

// Referência para a barra de progresso e o texto de progresso
const leftBar = document.getElementById('left-bar');
const rightBar = document.getElementById('right-bar');
const progressTime = document.getElementById('progress-time');
const leftImage = document.querySelector('.left-image');
const rightImage = document.querySelector('.right-image');

// Data de referência: 00h00 de Segunda-feira, 22 de Julho de 2024
const referenceDate = new Date('2024-07-22T00:00:00');

// Função para formatar o tempo em hh:mm:ss
function formatTime(milliseconds) {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

// Função para atualizar a barra de progresso
function updateProgressBar() {
    const now = Date.now();
    const elapsedMilliseconds = now - referenceDate.getTime();
    const remainingMilliseconds = totalMilliseconds - elapsedMilliseconds;
    const percentage = (elapsedMilliseconds / totalMilliseconds) * 100;

    if (remainingMilliseconds >= 0) {
        const movePercentage = Math.min(percentage, 100); // Limita o valor para não exceder 100%

        leftBar.style.width = movePercentage / 2 + '%';
        rightBar.style.width = movePercentage / 2 + '%';
        progressTime.textContent = formatTime(remainingMilliseconds);
        
        // Mover as imagens em direção ao centro
        leftImage.style.left = `calc(${percentage/2}% - 150px)`;
        rightImage.style.right = `calc(${percentage/2}% - 150px)`;
        // leftImage.style.transform = `translateX(${movePercentage}%)`;
        // rightImage.style.transform = `translateX(-${movePercentage}%)`;

        requestAnimationFrame(updateProgressBar);
    } else {
        leftBar.style.width = '50%';
        rightBar.style.width = '50%';
        progressTime.textContent = '00:00:00';
        leftImage.style.left = `calc(${50}% - 160px)`;
        rightImage.style.right = `calc(${50}% - 160px)`;
        // leftImage.style.transform = 'translateX(50%)';
        // rightImage.style.transform = 'translateX(-50%)';
    }
}

// Iniciar a atualização da barra de progresso
requestAnimationFrame(updateProgressBar);
