/* récupération de localStorage */
const dataStorage = JSON.parse(localStorage.getItem("panier"));

/* récupération de  productdata depuis l'api */
async function retrieveProductData(id) {
  return (await fetch(`http://localhost:3000/api/products/${id}`)).json();
}

/*
 * Calls the function to retrieve product information
 * Returns an error console if retrieval is not possible
 */
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