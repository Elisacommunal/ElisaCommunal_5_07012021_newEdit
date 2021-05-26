// CONSTANTES
// Récuperation des données dans le localStorage
let confirmCart = JSON.parse(localStorage.getItem("confirm"));
let customerNumberOrder = confirmCart.confirmationId;
let customerFirstName = confirmCart.contact.firstName;
let customerLastName = confirmCart.contact.lastName;
let customerCity = confirmCart.contact.city;
let customertotalPrice = localStorage.getItem("totalPrice");

// Intégration via le HTML



let firstName = document.getElementById("firstName")
firstName.innerHTML += customerFirstName;

let lastName = document.getElementById("lastName")
lastName.innerHTML += customerLastName;

let totalPrice = document.getElementById("total-Price")
totalPrice.innerHTML += customertotalPrice;

let city = document.getElementById("city")
city.innerHTML += customerCity;

let numberOrder = document.getElementById("numberOrder")
numberOrder.innerHTML += customerNumberOrder;

// UTILITIES
cameraNumber();