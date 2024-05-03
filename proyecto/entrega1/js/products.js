let userlog = localStorage.getItem('user');
let userdef = localStorage.setItem('userdef', null)
//                   muestra usuario logeado em nav-bar
// se crea boton de iniciar sesion
var logsession = document.createElement('button');
logsession.id = "logsession"
logsession.className = "btn btn-success"
var textLoginButton = document.createTextNode('Iniciar Sesion');
logsession.appendChild(textLoginButton);

// crea una imagen en el nav-bar
var userimg = document.createElement('img');
userimg.src = 'img/img_perfil.png';
userimg.id = 'imgperfil'

//se crea nombre de usuario en nav-bar
var username = document.createElement('p');
username.className = 'username'
var textUserLog = document.createTextNode(userlog);
username.appendChild(textUserLog);

// se crea boton de cerrar sesion
var closesession = document.createElement('button');
closesession.id = "closesession"
closesession.className = "btn btn-danger"
var textCloseButton = document.createTextNode('Cerrar Sesion');
closesession.appendChild(textCloseButton);

//                 Control de login en index

function closeS() { //cierra la sesion y redirecciona a login
    localStorage.removeItem('user');
    alert('salio de la sesion');
    location.href = 'login.html';
};

function loginS() {
    location.href = 'login.html';
};

function chkS() {

    if (userlog != userdef) {
        console.log(`hkS:connected user ${userlog}`)
        document.getElementById('sessiondiv').appendChild(userimg);
        document.getElementById('sessiondiv').appendChild(username);
        document.getElementById('sessiondiv').appendChild(closesession);
    }
    else {
        console.log('hkS:unlogged user')
        document.getElementById('sessiondiv').appendChild(logsession);
    }
};
chkS();
document.getElementById('closesession')?.addEventListener('click', () => { closeS(); }); // cierre de sesion manual
document.getElementById('logsession')?.addEventListener('click', () => { loginS(); }); //redireccion manual al login 



let pb5 = document.getElementById('pc101');
pb5.innerHTML += `<div class="text-center p-4">
<h2>Categoría Autos</h2>
<p class="lead">Verás aquí todas los productos de la categoría Autos.</p>
</div>
<div class="list-items" id="itemcat101">
            <div >
                <div id="containerp" >
                    </div>
                </div>
            </div>`;

const URL_CAT101 = 'https://japceibal.github.io/emercado-api/cats_products/101.json';

fetch(URL_CAT101)
    .then(respuesta => respuesta.json())
    .then(datos => {
        console.log(datos);
        console.log(datos.products);
        console.log(datos.products.name);

        for (let product of datos.products) { 
            let contitem = document.getElementById('containerp');
            contitem.innerHTML += `<div class="row">
                <div class="list-group col-3">
                    <img class="img-thumbnail" src="`+product.image+`">
                    </div>
                <div class="col">
                    <div id ="nombre"><p>${product.name}</p></div>

                <div id="descprod"><p>${product.description}</p></div>

                <div id="id"><p>Cod:${product.id}</p></div>
                </div>
                <div class="col mb-1">
                <div id ="cost"><p>${product.currency}:<spam class="currency">${product.cost}</spam></p></div>
                
                </div>
            </div>`;
            };
        });