// CONSTANTES
const displayStore = document.getElementById("displayCameraStore");
const validation = document.getElementById("validate");
const formValidation = document.getElementById("form-validate")
const totalPriceOrder = document.getElementById("totalPrice")
const priceDNone = document.getElementById("title-price")


// UTILITIES

// fonction qui affiche le nombre d'articles dans le panier
cameraNumber();

listenerCart()


validation.addEventListener('click', (e)=>{
    e.preventDefault;
    formManagement()
})
