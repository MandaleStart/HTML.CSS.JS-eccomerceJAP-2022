/* eslint-disable quote-props */
/* eslint-disable quotes */
/* eslint-disable space-before-function-paren */
/* eslint-disable prefer-const */
const userlog = localStorage.getItem('user')
const userdef = localStorage.setItem('userdef', null)
const UserID = localStorage.setItem('userID', 25801)//en desarrollo
//                  muestra usuario logeado em nav-bar
// se crea boton de iniciar sesion
function nologed() {
  document.getElementById('sessionli').innerHTML = '<button class="btn btn-success" id = "logsession">Iniciar Sesion</button>'
};
//                 Control de login (adaptado a 4.2)
function usermenu() {
  document.getElementById('sessionli').innerHTML =
    `<div class="dropdown">
  <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
  ${userlog}
  </button>
  <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
    <li><a class="dropdown-item" href="my-profile.html">Perfil</a></li>
    <li><a class="dropdown-item" href="cart.html">Carrito</a></li>
    <li><a class="dropdown-item" onclick="closeS();">Cerrar Sesion</a></li>
  </ul>
</div>`
};
// cierra la sesion y redirecciona a login
function closeS() {
  alert('salio de la sesion')
  localStorage.removeItem('user')
  location.href = 'login.html'
};
function loginS() {
  location.href = 'login.html'
};
// cheqeo de login
function chkS() {
  if (userlog !== userdef) {
    console.log(`hkS:connected user ${userlog}`)
    usermenu()
  } else {
    console.log('hkS:unlogged user')
    nologed()
  }
};
chkS()
document.getElementById('closesession')?.addEventListener('click', () => { closeS() }) // cierre de sesion manual
document.getElementById('logsession')?.addEventListener('click', () => { loginS() }) // redireccion manual al login
// ============carrito============

const userID = localStorage.getItem('userID')
const URL_USER_CART = `https://japceibal.github.io/emercado-api/user_cart/${userID}.json`
const prod_add_list = localStorage.getItem('productadd')
const item_add_table = document.getElementById('tbcart')
let item_agregado = document.getElementsByClassName('item_tr')
let costo_usd
let costo_uyu

// recoleccion de datos desde api
fetch(URL_USER_CART)
  .then(res => res.json())
  .then(datos => {
    for (let article of datos.articles) { itemaddtable(article) }
    calctotal()
  })
// recoleccion de datos desde localstorage
function addtocart() {
  let article_list = JSON.parse(prod_add_list)
  if (item_agregado !== null) {
    for (let article of article_list.articles) {
      itemaddtable(article)
    }
  } else { // si prodaddlist es null muestra que no hay productos en el carrito
    item_add_table.innerHTML += `<tr class="item_tr table-striped">No hay productos en su carrito</tr>`
  }
}
addtocart()
// plantilla para cada item
function itemaddtable(article) {
  item_add_table.innerHTML += `
    <tr class="item_tr table-striped " id="${article.id}">
    <td class="itemdeleter col-1">
    <button class="delettocart btn btn-danger" id="delettocart${article.id}" onclick="delProduct(${article.id})">X</button>
    </td>
    <td class="product-thumbnail col-2">
    <img width="150" height="100" src="${article.image}">
    </td>
    <td class="product-name col-3" data-title="Producto">${article.name}
    </td>
    <td class="product-price col-2" data-title="Precio">${article.currency}${article.unitCost}
    </td>
    <td class="product-quantity col-1" data-title="Cantidad" align-items-center>
    <input type="number" class="inputofcart" id="input_of${article.id}" step="1" min="1" value="${article.count}" onchange="calcsubtotal(${article.id}, ${article.unitCost})">
    </td>
    <td class="sub_total col-3" id="sub_of_${article.id}" value="">${article.currency} : ${article.unitCost * article.count}</td>
    </tr>`
}
// calculo del subtotal por cada producto
function calcsubtotal(article, cost) {
  let input = document.getElementById(`input_of${article}`).value
  let subTotal = document.getElementById(`sub_of_${article}`)
  console.log('logear' + article + ':' + cost)
  let subtotal = cost * input
  subTotal.innerHTML = `${subtotal}`
}

// ============ opciones en desarrollo ============
function calctotal() { //se omite para entrega 5
  let subtotalall = document.querySelectorAll('.sub_total')
  for (subtotal of subtotalall) {
    //if (currency === 'USD') {
    //} else {
    //}
  }
}
function delProduct(id_deleted) { //en desarrollo
  let prodls = localStorage.getItem('productadd')
  let art_to_cart = JSON.parse(prodls)
    // Eliminar productos de la lista
    for (let i = 0; i < art_to_cart.length; i++) {
      console.log(art_to_cart.articles)
        if (art_to_cart.articles[i].id === id_deleted) {
          art_to_cart.articles[i].splice(i, 1)
          localStorage.setItem("productadd", JSON.stringify(art_to_cart))
          location.reload()
        }
    }
    // alerta 
    let showalert = document.getElementById('showalert')
    showalert.innerHTML = `<p class="btn btn-danger">Se ha eliminado el producto del carrito (Funcion en desarrollo)<p>`
    setTimeout(function() {
      showalert.innerHTML = ''
    }, 5000)
  }

calctotal()

