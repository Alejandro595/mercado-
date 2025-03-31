document.getElementById("card-form").addEventListener("submit", function(event) {
    event.preventDefault();
    alert("Pago con tarjeta realizado con éxito.");
});

function goBack() {
    window.location.href = "index.html";
}
