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



document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("autos").addEventListener("click", function () {
        localStorage.setItem("catID", 101);
        window.location = "products.html"
    });
    document.getElementById("juguetes").addEventListener("click", function () {
        localStorage.setItem("catID", 102);
        window.location = "products.html"
    });
    document.getElementById("muebles").addEventListener("click", function () {
        localStorage.setItem("catID", 103);
        window.location = "products.html"
    });
});
// 