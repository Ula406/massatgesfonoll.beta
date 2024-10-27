// home.js

document.getElementById('logoutButton').addEventListener('click', function() {
    localStorage.removeItem('isLoggedIn'); // Esborra el flag de sessió
    window.location.href = 'login.html'; // Torna a la pàgina d'inici de sessió
});
