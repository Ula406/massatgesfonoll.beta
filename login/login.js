// login.js

document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita que el formulari es tanqui

    // Aquí podries fer una validació real (com enviar a un servidor), 
    // però per a aquest exemple simplement suposarem que l'inici de sessió és exitós.
    
    // Estableix un flag a localStorage que indica que l'usuari ha iniciat sessió.
    localStorage.setItem('isLoggedIn', 'true');
    
    // Redirigeix a la pàgina d'inici.
    window.location.href = 'home.html'; // Assegura't de crear aquest fitxer.
});

// Comprovar si l'usuari ja ha iniciat sessió
window.onload = function() {
    if (localStorage.getItem('isLoggedIn') === 'true') {
        window.location.href = 'home.html'; // Redirigeix si la sessió està activa.
    }
};
