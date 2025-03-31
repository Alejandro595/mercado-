const products = [
    { name: "Arroz (1 lb)", price: 10500, category: "granos", img: "https://supermercadolaestacion.com/35562-thickbox_default/arroz-bulto-x-10-libras.jpg" },
    { name: "Frijoles (500 g)", price: 9200, category: "granos", img: "https://supermercadolaestacion.com/48149-thickbox_default/frijol-zaragoza-el-trece-bolsa-x-500-gramos-.jpg" },
    { name: "Aceite (1 L)", price: 18000, category: "condimentos", img: "https://www.artepan.com.co/wp-content/uploads/2021/06/ACEITE-1000.png" },
    { name: "Huevos (30 unid)", price: 15500, category: "acompañamientos", img: "https://png.pngtree.com/png-vector/20240822/ourmid/pngtree-freshness-packed-in-every-egg-carton-on-transparent-background-png-image_13591613.png" },
    { name: "Leche (1 L)", price: 6000, category: "lacteos", img: "https://png.pngtree.com/png-clipart/20231105/original/pngtree-bottle-of-half-fat-milk-top-picture-image_13234339.png" },
    { name: "Pan Tajado (500 g)", price: 8500, category: "acompañamientos", img: "https://supermercadolaestacion.com/47907-thickbox_default/pan-natipan-x500gr-tajado.jpg" }
];

const productList = document.getElementById("product-list");
const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const payButton = document.getElementById("pay-button");
const storePage = document.getElementById("store-page");
const paymentPage = document.getElementById("payment-page");
const searchInput = document.getElementById("search");

let cart = [];

// Mostrar productos filtrados
function displayProducts(filter = "all") {
    productList.innerHTML = "";
    const filteredProducts = products.filter(p => filter === "all" || p.category === filter);
    if (filteredProducts.length === 0) {
        productList.innerHTML = "<p>No hay existencias o coincidencias</p>";
        return;
    }
    filteredProducts.forEach(product => {
        const productDiv = document.createElement("div");
        productDiv.classList.add("product");
        productDiv.innerHTML = `
            <img src="${product.img}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p><strong>$${product.price.toLocaleString()} COP</strong></p>
            <button onclick="addToCart('${product.name}', ${product.price})">Añadir</button>
        `;
        productList.appendChild(productDiv);
    });
}

// Agregar productos al carrito
function addToCart(name, price) {
    let item = cart.find(p => p.name === name);
    if (item) {
        item.quantity++;
    } else {
        cart.push({ name, price, quantity: 1 });
    }
    updateCart();
}

// Actualizar carrito
function updateCart() {
    cartItems.innerHTML = "";
    let total = 0;
    cart.forEach((item, index) => {
        total += item.price * item.quantity;
        const li = document.createElement("li");
        li.innerHTML = `${item.name} x${item.quantity} - $${(item.price * item.quantity).toLocaleString()} 
            <button onclick="removeFromCart(${index})">❌</button>`;
        cartItems.appendChild(li);
    });
    cartTotal.textContent = total.toLocaleString();
    payButton.disabled = cart.length === 0;
}

// Eliminar producto del carrito
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

// Filtrar productos con botones
document.querySelectorAll(".filter-button").forEach(button => {
    button.addEventListener("click", () => displayProducts(button.dataset.category));
});

// Búsqueda de productos en tiempo real
searchInput.addEventListener("input", function () {
    const searchTerm = this.value.toLowerCase();
    productList.innerHTML = "";
    const filtered = products.filter(p => p.name.toLowerCase().includes(searchTerm));
    if (filtered.length === 0) {
        productList.innerHTML = "<p>No hay existencias o coincidencias</p>";
        return;
    }
    filtered.forEach(product => {
        const productDiv = document.createElement("div");
        productDiv.classList.add("product");
        productDiv.innerHTML = `
            <img src="${product.img}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p><strong>$${product.price.toLocaleString()} COP</strong></p>
            <button onclick="addToCart('${product.name}', ${product.price})">Añadir</button>
        `;
        productList.appendChild(productDiv);
    });
});

// Mostrar la página de pago
function showPaymentPage() {
    storePage.classList.add("hidden");
    paymentPage.classList.remove("hidden");
    startCamera();
}

// Volver a la tienda
function showStorePage() {
    paymentPage.classList.add("hidden");
    storePage.classList.remove("hidden");
}

// Activar la cámara para el pago
function startCamera() {
    const cameraStream = document.getElementById("camera-stream");
    const cameraError = document.getElementById("camera-error");
    const qrPayment = document.querySelector(".qr-payment");

    navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
            cameraStream.srcObject = stream;
            cameraError.classList.add("hidden");
            qrPayment.classList.add("hidden");
        })
        .catch(() => {
            cameraError.classList.remove("hidden");
            qrPayment.classList.remove("hidden");
        });
}

displayProducts();
