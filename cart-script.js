// Funció per mostrar o amagar el popup
function toggleCartPopup() {
    var popup = document.getElementById("cartPopup");
    if (popup.style.display === "none" || popup.style.display === "") {
        popup.style.display = "block";
    } else {
        popup.style.display = "none";
    }
}


// Afegir producte al carret
function addToCart(product, price) {
    let cart = JSON.parse(sessionStorage.getItem('cart')) || [];
    cart.push({ product, price });
    sessionStorage.setItem('cart', JSON.stringify(cart));
    updateCart();
}

// Eliminar producte del carret
function removeFromCart(index) {
    let cart = JSON.parse(sessionStorage.getItem('cart')) || [];
    cart.splice(index, 1);
    sessionStorage.setItem('cart', JSON.stringify(cart));
    updateCart();
}

// Actualitzar el contingut del carret
function updateCart() {
    const cartContainer = document.getElementById('cartItems');
    cartContainer.innerHTML = '';

    let total = 0;
    let cart = JSON.parse(sessionStorage.getItem('cart')) || [];
    cart.forEach((item, index) => {
        const cartItem = document.createElement('div');
        cartItem.innerHTML = `${item.product} - ${item.price}€ <button style="background-color: black; color: white; cursor: pointer; border-radius: 10px; padding: 5px; cursor: url('cursors/radio_button_checked_16dp_FFFFFF_FILL0_wght400_GRAD0_opsz20.svg'), auto; /* Utilitza la imatge personalitzada */" onclick="removeFromCart(${index})">Eliminar</button>`;
        cartContainer.appendChild(cartItem);
        total += item.price;
    });

    document.getElementById('total').innerText = `Total: ${total.toFixed(2)}€`;
}

updateCart();
