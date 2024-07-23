// Total de horas para a barra de progresso
const totalHours = 120;
// Total de milissegundos para 120 horas
const totalMilliseconds = totalHours * 60 * 60 * 1000;

// Referência para a barra de progresso e o texto de progresso
const progressBar = document.getElementById('progress-bar');
const progressTime = document.getElementById('progress-time');
const movingImage = document.getElementById('moving-image');

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
        progressBar.style.width = percentage + '%';
        progressTime.textContent = formatTime(remainingMilliseconds);
        movingImage.style.left = `calc(${percentage}% - 25px)`;
        requestAnimationFrame(updateProgressBar);
    } else {
        progressBar.style.width = '100%';
        progressTime.textContent = '00:00:00';
        movingImage.style.left = 'calc(100% - 200px)';
    }
}

// Iniciar a atualização da barra de progresso
requestAnimationFrame(updateProgressBar);
