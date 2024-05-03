let userlog = localStorage.getItem('user');
let catID = localStorage.getItem('catID');
let userdef = localStorage.setItem('userdef', null);
let inputMin = document.getElementById("FilterMin");
let inputMax = document.getElementById("FilterMax");
let sortAsc = document.getElementById("sortAsc");
let sortDesc = document.getElementById("sortDesc");
let ventaDesc = document.getElementById("sortByCount");
let inputsearch = document.getElementById("search");
let listprice = [];
let list2 = [];
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

//                 Control de login
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

//fin de control de sesion

const URL_CAT = `https://japceibal.github.io/emercado-api/cats_products/${catID}.json`;
fetch(URL_CAT)
    .then(res => res.json())
    .then(datos => {

        listprice = datos.products;
        document.getElementById('catTitle').innerHTML += `<h2>${datos.catName}</h2>`

        function loaditems() {
            let contitem = document.getElementById('containerp');
            contitem.innerHTML = '';
            for (let product of listprice) {
                contitem.innerHTML += `<div class="row">
                <div class="list-group col-3">
                    <img class="img-thumbnail" src="`+ product.image + `">
                    </div>
                <div class="col">
                    <div id ="nombre"><p>${product.name}</p></div>

                <div id="descprod"><p>${product.description}</p></div>

                <div id="id"><p>Cod:${product.id}</p></div>
                </div>
                <div class="col mb-1">
                <div id ="cost"><p>${product.currency}:<spam class="currency">${product.cost}</spam></p></div>
                <div id="soldcount"><p>${product.soldCount}</p></div>
                
                </div>
            </div>`;
            };
        };
        function filtrado() {
            let maximo;
            let minimo;
            if (inputMin.value) { minimo = inputMin.value }
            else { minimo = 0; }
            if (inputMax.value) { maximo = inputMax.value }
            else { maximo = Infinity; }

            list2 = listprice.filter(product => (minimo <= product.cost) && (maximo >= product.cost));
            listprice = list2;
            loaditems();
        };
        //limpiar filtro
        function clearfilter() {
            listprice = datos.products
            inputMin.value = '';
            inputMax.value = '';
            inputsearch.value = '';
            loaditems();
        };
        //desafiate
        function Search(e) {
            if (document.getElementById("search").value) {
                list2 = listprice.filter(item => {
                    let itemUpperCase = item.name.toUpperCase()
                    return itemUpperCase.includes(inputsearch.value.toUpperCase());
                });
                listprice = list2;
                loaditems();
            } else {
                listprice = datos.products;
                loaditems();
            };

        };
        inputsearch.addEventListener("input", event => { Search(); });
        //ORDEN
        // orden asc por defecto
        function loaditemonDOm() { 
            listprice.sort(function (a, b) {
                if (a.cost < b.cost) return -1;
                if (a.cost > b.cost) return 1;
                return 0;
            });
            loaditems();
        };
        loaditemonDOm();


        //Agregar las funcionalidades de orden ascendente y descendente en función del precio 
        sortAsc.addEventListener("click", event => {
            listprice.sort(function (a, b) {
                if (a.cost < b.cost) return -1;
                if (a.cost > b.cost) return 1;
                return 0;
            });
            loaditems();
        });
        sortDesc.addEventListener("click", event => {
            listprice.sort(function (a, b) {
                if (a.cost > b.cost) return -1;
                if (a.cost < b.cost) return 1;
                return 0;
            });
            loaditems();
        });
        // descendente en función de la relevancia (tomaremos para ello la cantidad de artículos vendidos)
        ventaDesc.addEventListener("click", event => {
            listprice.sort(function (a, b) {
                if (a.soldCount < b.soldCount) return -1;
                if (a.soldCount > b.soldCount) return 1;
                return 0;
            });
            loaditems();
        });
        document.getElementById("clearRangeFilter").addEventListener('click', () => { clearfilter(); }); // Borra el filtrado
        document.getElementById("rangeFilterCount").addEventListener('click', () => { filtrado(); }); // filtra segun valor min y max 
    });
