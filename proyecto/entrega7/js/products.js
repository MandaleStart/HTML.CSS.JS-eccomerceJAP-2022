let catID = localStorage.getItem('catID');
let inputMin = document.getElementById("rangeFilterCountMin");
let inputMax = document.getElementById("rangeFilterCountMax");
let sortAsc = document.getElementById("sortAsc");
let sortDesc = document.getElementById("sortDesc");
let ventaDesc = document.getElementById("sortByCount");
let inputsearch = document.getElementById("search");
let listprice = [];
let list2 = [];
//llamada a api
const URL_CAT = `https://japceibal.github.io/emercado-api/cats_products/${catID}.json`;
fetch(URL_CAT)
    .then(res => res.json())
    .then(datos => {
        listprice = datos.products;
        document.getElementById('catTitle').innerHTML += `<h2>${datos.catName}</h2>`
        //mostrar producto
        function loaditems() {
            let contitem = document.getElementById('containerp');
            contitem.innerHTML = '';
            for (let product of listprice) {

                contitem.innerHTML += `
                <div class="row"  onclick="localStorage.setItem('itemID','${product.id}'); window.location='product-info.html';">
                    <div id="nombre" class="row order-1">
                    </div>
                <div name="divsetid" class="row ">
                    <div class="list-group col order-1">
                        <img class="img-thumbnail" src="`+ product.image + `">
                    </div>
                <div class="col order-2">
                    <div id="nombre">
                        <h3>${product.name}</h3>
                    </div>
                    <div id="descprod">
                        <p>${product.description}</p>
                    </div>
            
                    <div >
                        <p id="prodid">Cod:${product.id}</p></div>
            
                    <div class="col">
                        <div id="cost"><p>${product.currency}:<spam class="currency">${product.cost}</spam></p></div>
                        <div id="soldcount"><p>${product.soldCount}</p></div>
                    </div>
                </div>
            </div>
            <>`;
            };
        };
        //funcion  para realizar busqueda
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
        inputsearch.addEventListener("input", event => { Search});

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
        loaditems();
        function filtrado() {
            let maximo;
            let minimo;
            if (inputMin.value) { minimo = inputMin.value }
            else { minimo = 0; }
            if (inputMax.value) { maximo = inputMax.value }
            else { maximo = Infinity; }

            list2 = listprice.filter(product => minimo <= product.cost && maximo >= product.cost);
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
        document.getElementById("clearRangeFilter").addEventListener('click', () => { clearfilter; }); // Borra el filtrado
        document.getElementById("rangeFilterCount").addEventListener('click', () => { filtrado }); // filtra segun valor min y max 
    });
