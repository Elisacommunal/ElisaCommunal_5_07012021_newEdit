// CONSTANTE
const urlApi = "http://localhost:3000/api/cameras/";
const searchParams = new URLSearchParams(window.location.search).get("id");
const urlApiId = urlApi + searchParams;
const cameraCard = document.querySelector("#camera-card");
let btn = document.querySelector(".cart") 

// UTILITIES

fetch(urlApiId)
    .then((response) => 
        response.json()
    .then((product) => {
      displayProduct(product);

         btn.addEventListener("click",()=>{
            let cameraChoice = {
              camName : product.name,
              camId   : product._id,
              camImage: product.imageUrl,
              camPrice: product.price/100,
              camLenses: document.getElementById("choix-lentille").value,
              camQuantity : meter(),
              get totalPrice (){
                    return this.camPrice * this.camQuantity;
                } 
            };console.log(cameraChoice);
           
            if(typeof localStorage != "undefined"){
                // on recupère la valeur dans le localStorage
              let cameraStore  = JSON.parse(localStorage.getItem("camInCart"));
                    if (cameraStore === null || cameraStore === "undefined") {
                        cameraStore = []; // on crée le tableau 
                        cameraStore.push(cameraChoice);
                       } 
                     if(cameraStore) {
                        cameraStore.push(cameraChoice); // si le tableau existe on push le choix
                     } 
                    localStorage.setItem("camInCart", JSON.stringify(cameraStore));
                          if (window.confirm(`Vous avez bien ajouté ${cameraChoice.camQuantity} - ${product.name} au panier. Souhaitez-vous continuer vos achat ?`)) {
                            window.location.href = "index.html";
                        } else {
                            window.location.href = "shop.html";
                        };   
                  } else {
                    alert("Une erreur est survenue");
                  }
        });
    })
      .catch((err) => console.log("erreur :" + err)));