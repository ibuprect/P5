/* récupération de localStorage */
const dataStorage = JSON.parse(localStorage.getItem("panier"));

/* récupération de  productdata depuis l'api */
async function retrieveProductData(id) {
  return (await fetch(`http://localhost:3000/api/products/${id}`)).json();
}

/* appel une fonction pour recupérer les informations produit
   Erreur dans la console quand la récupération est impossible*/
const getProductData = async (id) => {
  try {
    return retrieveProductData(id);
  } catch {
    console.error("Erreur lors de la récupération des données du produit");
  }
};

/* Création de l'article qui contien le produit choisi */
const createCardProduct = async (data) => {
  const product = await retrieveProductData(data.id);
  const cardItem = document.getElementById("cart__items");
  const articleItem = document.createElement("article");
  articleItem.setAttribute("class", "cart__item");
  articleItem.setAttribute("data-id", `${data.id}`);
  articleItem.setAttribute("data-color", `${data.color}`);
  cardItem.appendChild(articleItem);
  showImageProduct(articleItem, product.altTxt, product.imageUrl);
  showInfosItem(articleItem, product.name, data.color, product.price);
  showSettingsItem(articleItem, data.quantity);
};

/* créé les modifications sur le produit */
function showSettingsItem(container, quantity) {
  const settingsItem = document.createElement("div");
  settingsItem.setAttribute("class", "cart__item__settings");
  container.appendChild(settingsItem);
  showQuantityProduct(settingsItem, quantity);
  showDeletedProduct(settingsItem);
}

/* Montre l'image du produit choisi */
function showImageProduct(container, altTxt, image) {
  const itemImg = document.createElement("div");
  itemImg.setAttribute("class", "cart__item__img");
  container.appendChild(itemImg);

  const img = document.createElement("img");
  img.setAttribute("src", image);
  img.setAttribute("alt", altTxt);
  itemImg.appendChild(img);
}

/* Donne le nom du produit */
function showTitleProduct(div, title) {
  const titleItem = document.createElement("h2");
  titleItem.innerText = title;

  div.appendChild(titleItem);
}

/*
 * Display the chosen colour for the selected product
 */
function showColorProduct(div, color) {
  const colorItem = document.createElement("p");
  colorItem.innerText = color;

  div.appendChild(colorItem);
}

/* Donne le prix du produit selectionné */
function showPriceProduct(div, price) {
  const priceItem = document.createElement("p");
  priceItem.innerText = price + "€";

  div.appendChild(priceItem);
}

/* Choix de la quantité produit */
function showQuantityProduct(div, quantity) {
  const settingsQuantity = document.createElement("div");
  settingsQuantity.setAttribute(
    "class",
    "cart__item__content__settings__quantity"
  );
  div.appendChild(settingsQuantity);

  const quantityItem = document.createElement("p");
  quantityItem.innerText = "Qté :";
  settingsQuantity.appendChild(quantityItem);

  const quantityInput = document.createElement("input");
  quantityInput.setAttribute("type", "number");
  quantityInput.setAttribute("class", "itemQuantity");
  quantityInput.setAttribute("name", "itemQuantity");
  quantityInput.setAttribute("min", "1");
  quantityInput.setAttribute("max", "100");
  quantityInput.setAttribute("value", `${quantity}`);
  settingsQuantity.appendChild(quantityInput);
}

/* Bouton de suppresssion du produit */
function showDeletedProduct(div) {
  const settingsDeleted = document.createElement("div");
  settingsDeleted.setAttribute(
    "class",
    "cart__item__content__settings__delete"
  );
  div.appendChild(settingsDeleted);

  const deletedProduct = document.createElement("p");
  deletedProduct.setAttribute("class", "deleteItem");
  deletedProduct.innerText = "Supprimer";
  settingsDeleted.appendChild(deletedProduct);
}

addEventListener("input", function () {
  let quantitySelector = document.getElementsByClassName("itemQuantity");
  for (let i = 0; i < quantitySelector.length; i++) {
    quantitySelector[i].addEventListener("change", (e) => {
      let productQuantity = e.target.value;
      if (productQuantity == 0 || productQuantity >= 100) {
        console.error("La quantité doit être comprise entre 1 et 100");
        productQuantity = `${dataStorage[i].quantity}`;
      } else {
        dataStorage.map((obj) => {
          if (
            (obj.id == dataStorage[i].id, obj.color == dataStorage[i].color)
          ) {
            obj.quantity = parseInt(productQuantity);
          }
        });
        localStorage.setItem("panier", JSON.stringify(dataStorage));
        totalRefresh();
        console.log("Quantité mise à jour");
      }
    });
  }
});


/* Des que l'on clique sur le bouton supprimer le produit est enlevé */
window.onload = () => {
  let productDeleted = document.getElementsByClassName("deleteItem");
  for (let i = 0; i < productDeleted.length; i++) {
    productDeleted[i].addEventListener("click", (e) => {
      let articleDOM = productDeleted[i].closest("article");
      const productToClear = dataStorage.indexOf(dataStorage[i]);
      dataStorage.splice(productToClear, 1);
      articleDOM.remove();
      if (localStorage != undefined) {
        localStorage.setItem("panier", JSON.stringify(dataStorage));
      } else {
        localStorage.clear();
      }
      totalRefresh();
      console.log("Produit supprimé du panier");
      location.reload()
    });
  }
};

/* Montre le total d'article et le prix */
const totalRefresh = async () => {
  let totalCartPrice = 0;
  let totalCartQty = 0;
  if (localStorage.length != 0) {
    for (let i = 0; i < dataStorage.length; i++) {
      let itemStorage = dataStorage[i];
      const product = await getProductData(itemStorage.id);
      totalCartPrice +=
        parseInt(itemStorage.quantity) * parseInt(product.price);
      totalCartQty += parseInt(itemStorage.quantity);
    }
  }
  const totalQuantity = document.getElementById("totalQuantity");
  totalQuantity.innerText = totalCartQty;
  const totalPrice = document.getElementById("totalPrice");
  totalPrice.innerText = totalCartPrice;
};

/* Affiche un message d'erreur si il y a une erreyr dans le for */
function showErrorMsg(errorId, nameField) {
  let errorContainer = document.getElementById(`${errorId}`);
  errorContainer.innerHTML = `${nameField} est invalide`;
}

const globalRegex = new RegExp("^[A-Za-zéèêëàâîïôöûü-]+$");

/* Checks that the form field "first name" matches the defined regex */
function verifyFirstName(prenom) {
  let fieldIsCorrect = false;
  if (globalRegex.test(prenom)) {
    fieldIsCorrect = true;
  } else {
    showErrorMsg("firstNameErrorMsg", "Prénom");
  }
  return fieldIsCorrect;
}