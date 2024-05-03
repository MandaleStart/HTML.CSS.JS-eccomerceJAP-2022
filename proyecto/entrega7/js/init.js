const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";
const PUBLISH_PRODUCT_URL = "https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/";
const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/";
const PRODUCT_INFO_COMMENTS_URL = "https://japceibal.github.io/emercado-api/products_comments/";
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
const EXT_TYPE = ".json";

let showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

let hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

let getJSONData = function(url){
    let result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}
// control del login en navbar
let userlog = localStorage.getItem('user');
let userdef = localStorage.setItem('userdef', null)
//                  muestra usuario logeado em nav-bar
// se crea boton de iniciar sesion
function nologed() {
    document.getElementById('sessionli').innerHTML = `<button class="btn btn-success" id = "logsession">Iniciar Sesion</button>`
};
//                 Control de login en index (adaptado a 4.2)
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
//cierra la sesion y redirecciona a login
function closeS() {
    alert('salio de la sesion');
    localStorage.removeItem('user');
    location.href = 'login.html';
};
function loginS() {
    location.href = 'login.html';
};
// cheqeo de login
function chkS() {
    if (userlog != userdef) {
        console.log(`hkS:connected user ${userlog}`)
        usermenu();
    }
    else {
        console.log('hkS:unlogged user')
        nologed();
    }
};
chkS();
document.getElementById('closesession')?.addEventListener('click', () => { closeS(); }); // cierre de sesion manual
document.getElementById('logsession')?.addEventListener('click', () => { loginS(); }); //redireccion manual al login 

function clog(data){
  console.log(data)
}