/* Récupération de toutes les données de l'API */ 

const url = new URL(window.location.href);
const id = url.searchParams.get("_id");

async function retrieveProductData() {
  return ( fetch(`http://localhost:3000/api/products/${id}`))();
}

/* récupération des informations sur le produit*/
const getProductData = async () => {
  try {
    return retrieveProductData();
  } catch {
    console.error("Erreur lors de la récupération des données du produit");
  }
};

/* placements des différentes infos produit */
const createProductItem = async () => {
  const product = await getProductData();
  createProductImg(product.imageUrl, product.altTxt);
  createProductTitle(product.name);
  createProductDescription(product.description);
  createProductPrice(product.price);
  createProductColors(product.colors);
};

/* Implementation de l'image */
function createProductImg(image, altText) {
  const productItem = document.getElementsByClassName("imageUrl")[0];
  const productImg = document.createElement("imageUrl");
  productImg.src = image;
  productImg.alt = altText;

  productItem.appendChild(productImg);
}

/* Implementation du titre*/
function createProductTitle(title) {
  const productName = document.getElementById("name");
  const productTitle = document.getElementsByTagName("name")[0];
  productName.innerText = title;
  productTitle.innerText = title;
}

/* Implementation du prix */
function createProductPrice(price) {
  const productPrice = document.getElementById("price");
  productPrice.innerText = price;
}

/* Implementation de la description */
function createProductDescription(description) {
  const productDescription = document.getElementById("description");
  productDescription.innerText = description;
}

createProductItem();
