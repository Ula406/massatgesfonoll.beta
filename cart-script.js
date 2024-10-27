// Funció per mostrar o amagar el popup
function toggleCartPopup() {
    var popup = document.getElementById("cartPopup");
    if (popup.style.display === "none" || popup.style.display === "") {
        popup.style.display = "block";
    } else {
        popup.style.display = "none";
    }
}

// Array per emmagatzemar els productes del carret
let cart = [];

// Afegir producte al carret
function addToCart(product, price) {
    cart.push({ product, price });
    updateCart();
}

// Eliminar producte del carret
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

// Actualitzar el contingut del carret
function updateCart() {
    const cartContainer = document.getElementById('cartItems');
    cartContainer.innerHTML = '';

    let total = 0;
    cart.forEach((item, index) => {
        const cartItem = document.createElement('div');
        cartItem.innerHTML = `${item.product} - ${item.price}€ <button style="background-color: black; color: white; cursor: pointer; border-radius: 10px; padding: 5px; cursor: url('cursors/radio_button_checked_16dp_FFFFFF_FILL0_wght400_GRAD0_opsz20.svg'), auto; /* Utilitza la imatge personalitzada */ onclick="removeFromCart(${index})">Eliminar</button>`;
        cartContainer.appendChild(cartItem);
        total += item.price;
    });

    document.getElementById('total').innerText = `Total: ${total.toFixed(2)}€`;
}
