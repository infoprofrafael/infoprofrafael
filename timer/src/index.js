// Pegando elementos
const timeInput = document.getElementById("timeInput");
const startBtn = document.getElementById("startBtn");
const timerDisplay = document.getElementById("timerDisplay");
const alarmSound = document.getElementById("alarmSound");
// Inserindo botão
const toggleSound = document.getElementById("toggleSound");

let soundEnabled = false;


// Alterna estado do som do alarme
toggleSound.addEventListener("click", () => {
    soundEnabled = !soundEnabled;
    toggleSound.textContent = soundEnabled ? "🔔 Som ativado" : "🔕 Som desativado";
});


let interval = null; // evita consumo de RAM
let remainingTime = 0;

function formatTime(seconds) {
    const m = String(Math.floor(seconds / 60)).padStart(2, "0");
    const s = String(seconds % 60).padStart(2, "0");
    return `${m}:${s}`;
}

startBtn.addEventListener("click", () => {
    const inputSeconds = parseInt(timeInput.value);

    if (isNaN(inputSeconds) || inputSeconds <= 0) {
        alert("Insira um tempo válido!");
        return;
    }

    remainingTime = inputSeconds;
    // Se o timer começar menos de 60 segundos
    if (remainingTime <= 60) {
        timerDisplay.classList.add("warning");
    }

    // Atualiza display imediatamente
    timerDisplay.textContent = formatTime(remainingTime);

    // Remove animação caso venha de um timer anterior
    timerDisplay.classList.remove("warning");

    // Cancela qualquer intervalo antigo
    clearInterval(interval);

    interval = setInterval(() => {
        remainingTime--;

        timerDisplay.textContent = formatTime(remainingTime);

        // Quando faltar 60s → ativar animação
        if (remainingTime <= 60) {
            timerDisplay.classList.add("warning");
            // Intensidade progressiva da borda
            const intensidade = Math.max(3, 18 - Math.floor(remainingTime / 3));
            timerDisplay.style.outlineWidth = intensidade + "px";
        }


        if (remainingTime <= 0) {
            clearInterval(interval);
            timerDisplay.classList.remove("warning");

            // Som ativado

            if(soundEnabled){
                alarmSound.play();
            } else{
                alert("Tempo esgotado!");

            }

        }


    }, 1000);
});
