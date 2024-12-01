let timer;
let isRunning = false;
let startTime;
let elapsedTime = 0;

const content = document.getElementById('content');

document.getElementById('cronometro').addEventListener('click', showCronometro);
document.getElementById('temporizador').addEventListener('click', showTemporizador);
document.getElementById('horaActual').addEventListener('click', showHoraActual);

function showCronometro() {
    content.innerHTML = `
        <h1>Cronómetro</h1>
        <div class="circle">
            <div id="display">00:00:00</div>
        </div>
        <button id="startStop">Iniciar</button>
        <button id="reset">Reiniciar</button>
    `;
    setupCronometro();
}

function showTemporizador() {
    content.innerHTML = `
        <h1>Temporizador</h1>
        <div class="circle">
            <div id="display">00:00:00</div>
        </div>
        <input type="number" id="minutes" placeholder="Minutos">
        <button id="startStop">Iniciar</button>
        <button id="reset">Reiniciar</button>
    `;
    setupTemporizador();
}

function showHoraActual() {
    content.innerHTML = `
        <h1>Hora Actual (ES)</h1>
        <div class="circle">
            <div id="display">${new Date().toLocaleTimeString('es-ES')}</div>
        </div>
    `;
    setInterval(() => {
        document.getElementById('display').textContent = new Date().toLocaleTimeString('es-ES');
    }, 1000);
}

function setupCronometro() {
    let display = document.getElementById('display');
    let startStopButton = document.getElementById('startStop');
    let resetButton = document.getElementById('reset');

    startStopButton.addEventListener('click', () => {
        if (isRunning) {
            clearInterval(timer);
            startStopButton.textContent = 'Iniciar';
        } else {
            startTime = Date.now() - elapsedTime;
            timer = setInterval(updateDisplay, 1000);
            startStopButton.textContent = 'Detener';
        }
        isRunning = !isRunning;
    });

    resetButton.addEventListener('click', () => {
        clearInterval(timer);
        isRunning = false;
        elapsedTime = 0;
        display.textContent = '00:00:00';
        startStopButton.textContent = 'Iniciar';
    });

    function updateDisplay() {
        elapsedTime = Date.now() - startTime;
        const totalSeconds = Math.floor(elapsedTime / 1000);
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        display.textContent = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
    }

    function pad(number) {
        return number.toString().padStart(2, '0');
    }
}

function setupTemporizador() {
    let display = document.getElementById('display');
    let startStopButton = document.getElementById('startStop');
    let resetButton = document.getElementById('reset');
    let minutesInput = document.getElementById('minutes');

    startStopButton.addEventListener('click', () => {
        if (isRunning) {
            clearInterval(timer);
            startStopButton.textContent = 'Iniciar';
        } else {
            startTime = Date.now();
            timer = setInterval(() => {
                let remainingTime = minutesInput.value * 60 * 1000 - (Date.now() - startTime);
                if (remainingTime <= 0) {
                    clearInterval(timer);
                    display.textContent = '00:00:00';
                    startStopButton.textContent = 'Iniciar';
                    isRunning = false;
                } else {
                    const totalSeconds = Math.floor(remainingTime / 1000);
                    const minutes = Math.floor(totalSeconds / 60);
                    const seconds = totalSeconds % 60;
                    display.textContent = `${pad(minutes)}:${pad(seconds)}`;
                }
            }, 1000);
            startStopButton.textContent = 'Detener';
        }
        isRunning = !isRunning;
    });

    resetButton.addEventListener('click', () => {
        clearInterval(timer);
        isRunning = false;
        display.textContent = '00:00:00';
        startStopButton.textContent = 'Iniciar';
    });

    function pad(number) {
        return number.toString().padStart(2, '0');
    }
}

// Inicializar la vista del cronómetro al cargar la página
showHoraActual();
