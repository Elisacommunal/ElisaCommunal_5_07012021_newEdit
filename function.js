//
//
// FONCTIONS PAGE INDEX
//
//


// fonction pour initialiser les cards 
function setGeneral(container, camElement, selector) {
    let element = container.querySelector(selector);
    // si "image" contenu dans le selector ajouter src + alt
    if( selector.includes("image") ){
        element.src = camElement;
        element.alt = camElement;
    // sinon si "image" contenu dans le selector ajouter href
    }else if(selector.includes("link")){
        element.href += camElement;
    //sinon utiliser seulement camElement
    }else{
    element.innerHTML = camElement;
    }
    console.log(element);
}



// fonction pour faire la mise en page des card index.html
function displayProducts(product, id_container) {
    let containerProducts = document.getElementById(id_container);
    let baseContainer = document.querySelector('.container-products');
    // clonage pour réutiliser un template créé dans le HTML
    let container = baseContainer.cloneNode(true);

    // appel des fonctions avec leur bon paramètres
    setGeneral( container, product.imageUrl, '.product-image' ) 
    setGeneral( container, product.name, '.product-title' ) 
    setGeneral( container, product.description, '.product-descript' ) 
    setGeneral( container, product.price / 100, '.product-price' ) 
    setGeneral( container, product._id, '.product-link')
 
    // suppression du display-none
    container.classList.remove('d-none')
    // ajout des données au template de base
    containerProducts.append(container)
}

// fonction pour faire apparaitre les card index.html
function getAlldata(placement) {
    // pour tout les elements present dans l'objet placement
    // application de la fonction getData puis de Display products
    placement.forEach(element => {
        getData(element.id)
            .then(product => {
                displayProducts(product, element.selector)
            })
            .catch(error => console.error(error))
    });
}

//
//
// FONCTIONS PAGE PRODUCT
//
//

// fonction pour afficher les options de lentilles 
function lensesOption(product) {
    let lensesChoice = document.getElementById("choix-lentille")
    for (let i = 0; i < product.lenses.length; i++) {
        let newLensesChoice = document.createElement("option")
        newLensesChoice.innerHTML = product.lenses[i];
        lensesChoice.append(newLensesChoice);
        console.log(newLensesChoice);
    }
};

// fonction pour faire la mise en page de la card product.html
function displayProduct(product) {
    let containerProduct = document.getElementById('container-prod');
    let container = document.querySelector('.container-product');

    // appel des fonctions avec leur bon paramètres
    setGeneral( container, product.imageUrl, '.product-image' ) 
    setGeneral( container, product.name, '.product-title' ) 
    setGeneral( container, product.price / 100, '.product-price' ) 
    setGeneral( container, product.description, '.product-descript' ) 
    lensesOption(product);

    // suppression du display-none
    container.classList.remove('d-none');
    // ajout des données au template de base
    containerProduct.append(container);
}

//fonction compteur
function meter() {
    let qty = parseInt(document.getElementById("qte").value);
    if (qty > 0) {
        return qty;
    } else {
        qty = 1;
        alert("Quantité non valide, 1 ajouté au panier par défault");
    }
    //console.log(qty);
    return qty;
};

//
//
// FONCTIONS PAGE SHOP
//
//

// fonction qui observe si le panier est vide ou non
function listenerCart() {
    // si le panier est vide :
    if (cameraStore.length === 0 || cameraStore === null) {
        // pas d'affichage du bouton validation ni du formulaire d'achat
        validation.style.display = " none";
        formValidation.style.display = " none ";
        let emptyCart = document.getElementById("empty-cart")
        // supression du display-none sur la partie qui indique que le panier est vide
        emptyCart.classList.remove("d-none")

    // s'il y a des produits dans le panier : 
    } else {
        totalPriceCartMeter();
        displayCamera();
    };
}

// pour récuperer les datas dans localStorage
function getBackCamera() {
    // récupération de la variable d'info du produit
    let cameraStore = JSON.parse(localStorage.getItem("camInCart"));
    // si il n'est pas défini on crée un tableau
    if (cameraStore === null || cameraStore === "undefined") {
        cameraStore = [];
    }
    return cameraStore;
}
let cameraStore = getBackCamera();

// Création de l'élément de présentation de produit dans le panier

// fonction pour faire la mise en page des card shop.html
function displayCart(cam, index) {
    let cameraElement = document.querySelector('.container-cart');
    let container = cameraElement.cloneNode(true);
    let clone = document.getElementById("clone-template");

    // appel des fonctions avec leur bon paramètres
    setGeneral(container, cam.camImage, '.camera-image')
    setGeneral(container, cam.camName, '.camera-name')
    setGeneral(container, cam.camLenses, '.camera-lenses')
    setGeneral(container, cam.camQuantity, '.camera-quantity')
    setGeneral(container, cam.camPrice, '.camera-price')
    setGeneral(container, cam.totalPrice, '.camera-totalPrice')
    
    // suppression du display-none
    container.classList.remove('d-none')
    // ajout des données au template de base
    clone.append(container)

    const btnDelete = container.querySelector('.deleteBtn');
    // suppression du produit dans le panier
        btnDelete.addEventListener('click', () => {

    // si on veut supprimer on appel la fonction et on recharge la page
    if (window.confirm(`Voulez-vous vraiment supprimer cet article de votre panier ?`)) {
        deleteCamera(index);
        window.location.href = "shop.html";
    // sinon on recharge la page
    } else {
        window.location.href = "shop.html";
    };   
});
    return container;
}

// fonction présentation du produit
function displayCamera() {
    // création d'un tableau avec deux parametres
    const camerasStore = cameraStore.map((cam, index) => {
        return displayCart(cam, index);
    });
    displayStore.innerHTML = " ";
    displayStore.append(...camerasStore);
    // création de tout les articles 
};

// fonction deleteCamera qui sera appelé à l'interieur de l'évenement btnDelete pour suppr l'élément
function deleteCamera(index) {
    // suppression du produit
    cameraStore.splice(index, 1);
    // redefinition du localStorage
    localStorage.setItem("camInCart", JSON.stringify(cameraStore))
    // récupération du localStorage
    JSON.parse(localStorage.getItem("camInCart"));
    // appel des fonctions
    displayCamera();
    totalPriceCartMeter();
}

// incrementation du calcul du prix total de la commande:
function totalPriceCartMeter() {
    // création du tableau
    let arrayTotalPrice = [];
    for (const camInStore of cameraStore) {
        let priceProduct = camInStore.totalPrice;
        // envoi du prix total dans le tableau
        arrayTotalPrice.push(priceProduct);
    }
    console.log(arrayTotalPrice);
    // si le tableau est vide on renvoit à la page du panier vide
    if (arrayTotalPrice.length === 0) {
        location.assign('shop.html');
    // sinon on ajoute le prix des produits, on affichage le montant total et on redéfini le prix total dans le localStorage
    } else {
        let totalPriceCart = arrayTotalPrice.reduce((accumulator, currentValue) => accumulator + currentValue);
        totalPriceOrder.innerHTML = totalPriceCart;
        priceDNone.classList.remove('d-none')
        localStorage.setItem("totalPrice", totalPriceCart);
        console.log(localStorage);
    }
}

function formManagement(){

    let check = document.getElementById('gridCheck').value;
    let formChecked = document.getElementById('formChecked').checkValidity();

    // Si le formulaire est faux on envoi une alerte
    if (formChecked == false) {
        alert('Merci de bien vouloir remplir tout les champs requis afin de valider votre commande');

    // sinon on crée un objet de récuperation des données de l'utilisateur
    }else{
        let contact = {
            firstName: document.getElementById('inputFirstName').value,
            lastName: document.getElementById('inputLastName').value,
            address: document.getElementById('inputAddress').value,
            city: document.getElementById('inputCity').value,
            email: document.getElementById('inputEmail').value,
        };
        //console.log(contact);

        let products = [];
        //console.log(cameraStore);
        // pour chaque produits de cameraStore on récupere son id et on l'envoi dans la tableau products
        for (let camreraInstore of cameraStore){
            let productsId = camreraInstore.camId;
            products.push(productsId);
            console.log(products);
        }

        let order = { contact, products };
        console.log(order);

        // fetch Order POST
        let sendData = fetch("http://localhost:3000/api/cameras/order", {
            method: 'POST',
            body: JSON.stringify(order),
            headers:{
                'Content-Type' : 'application/json',
            }
        })
        sendData.then( async response =>{

            try{// traitement de la reponse, récupération de l'id de confirmation du serveur
                console.log(response);
                let confirmation = await response.json();
                console.log(confirmation);
                let confirmationId = confirmation.orderId;
                console.log(confirmationId);
                // création de variable avec contact et l'id récupéré
                let result = {
                    contact: contact,
                    confirmationId: confirmationId,
                }
                console.log(result);
                // si localStorage est défini on envoi result dans localStorage et on vide la selection en créant un tableau vide 
                //qu'on envoi dans localStorage et redirection page confirmation
                if(typeof localStorage != "undefined"){
                    localStorage.setItem("confirm", JSON.stringify(result));
                    localStorage.setItem("camInCart", JSON.stringify([]));
                
                    window.location.href = "confirmation.html";

                }else{
                    alert("LocalStorage n'est pas définit")
                }
            } catch(error) {
                console.log(error);
                alert("Une erreur est survenue, veuillez retenter plus tard")
            }
        })
    }
}

//
//
// PAGE CONFIRMATION
//
//

// Fonction qui ajoute un compte dans le panier
function cameraNumber(){
    //recuperation article dans localstorage
    const cameraStore = JSON.parse(localStorage.getItem("camInCart"));
    //récupération de l'id où va être injecté counter
    const cartCamera = document.getElementById("cart_camera");

    if (cameraStore){
        // fonction qui compte le nombre d'articles du panier
        let count = cameraStore.reduce((sum, item) => sum += item.camQuantity, 0);
        //injection du texte dans l'id
        cartCamera.innerHTML += count;
    }
};

