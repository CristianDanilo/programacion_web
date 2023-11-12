const title = document.getElementById("color-changing-title");
const colors = ["red", "blue", "green", "orange"]; // Lista de colores

let currentIndex = 0;

function changeColor() {
    title.style.color = colors[currentIndex];
    currentIndex = (currentIndex + 1) % colors.length; // Avanzar al siguiente color
}

// Cambia el color del título cada 3 segundos
setInterval(changeColor, 3000);