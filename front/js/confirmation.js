
// obtient la confirmation depuis l'url // 
const url = new URL(window.location.href);
const id = url.searchParams.get("id");

// montre la confirmation sur la page //
function showOrderId() {
  const idContainer = document.getElementById("orderId");
  idContainer.innerText = id;
}

showOrderId();