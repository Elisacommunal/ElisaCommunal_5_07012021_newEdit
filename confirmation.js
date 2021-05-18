let confirmCart = JSON.parse(localStorage.getItem("confirm"));
console.log(confirmCart);


let customerNumberOrder = confirmCart.confirmationId;
let customerFirstName = confirmCart.contact.firstName;
let customerLastName = confirmCart.contact.lastName;
let customerCity = confirmCart.contact.city;
let totalPrice = localStorage.getItem("totalPrice");
console.log(totalPrice);

let firstName = document.getElementById("firstName")
firstName.innerHTML += customerFirstName;

let lastName = document.getElementById("lastName")
lastName.innerHTML += customerLastName;

let numberOrder = document.getElementById("numberOrder")
numberOrder.innerHTML += customerNumberOrder;