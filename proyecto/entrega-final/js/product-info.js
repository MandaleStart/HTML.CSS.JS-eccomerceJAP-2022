let catid = localStorage.getItem('productID')
let ItemID = localStorage.getItem('itemID')
let productlist = document.getElementById('containerprod')
let productimg = document.getElementById('containerimg')
let Commentsp = document.getElementById('commentsbox')
let divcomments = document.getElementById('commentsmaker')
let div = document.createElement('div')
const URL_PROD = `https://japceibal.github.io/emercado-api/products/${ItemID}.json`

fetch(URL_PROD)
  .then(res => res.json())
  .then(datos => {
    productlist.innerHTML += ` 
                    <div class="row" >
                <div class="col order-1">
                    <h2 class="prodname">${datos.name}</h2>
                    <p id="description">${datos.description}</p>
                </div>
                <div class="col order-2 " id="price">
                    <div class="row">
                    <p id="cat" class="col order-1">Categoria: ${datos.category}</p><p class="col order-2">Total ventas: ${datos.soldCount}</p>
                    </div>
                    <button type="button" id="btnaddcart" class="btn btn-success">
                    ${datos.currency} ${datos.cost}
                    </button>
                    <br> 
                </div>
            </div>
        <hr>
        
        </div>`
// plantilla json
    let arttocart = {
      "user": 25801,
      "articles": []
    }
    let artadd = {
      "id": datos.id,
      "name": datos.name,
      "count": 1,
      "unitCost": datos.cost,
      "currency": datos.currency,
      "image": datos.images[0]
    }

    function addprodtocartfn() {
      let prodls = localStorage.getItem('productadd')
      if (prodls === null) {
        console.log('prodls is null')
        arttocart.articles.push(artadd)
        localStorage.setItem('productadd', JSON.stringify(arttocart))
      } else {
        console.log('items in cart')
        arttocart = JSON.parse(prodls)
        arttocart.articles.push(artadd)
        localStorage.setItem('productadd', JSON.stringify(arttocart))
        console.log(arttocart)
      }
    }
// funcion que muestra alerta de agregado al carrito y dispara funcion de cargar producto en el local.storage
    function addcartbtn() {
      addprodtocartfn()
      let showalert = document.getElementById('showalert')
      showalert.innerHTML = `<p class=" col-12 btn btn-success">Se ha agregado el producto ${datos.name} al carrito, <a class="a_to_cart" href="cart.html">Si quiere ir al carrito haga click aqui</a><p>`
      setTimeout(function() {
        showalert.innerHTML = ''
      }, 5000)
    }
    document.getElementById('btnaddcart')?.addEventListener('click', () => { addcartbtn() })

    // carga imagenes
    productimg.innerHTML += `
        <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
        <div class="carousel-indicators">
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="3" aria-label="Slide 4"></button>
        </div>
        <div class="carousel-inner">
          <div class="carousel-item active">
            <img src="${datos.images[0]}" class="d-block w-100">
          </div>
          <div class="carousel-item">
            <img src="${datos.images[1]}" class="d-block w-100">
          </div>
          <div class="carousel-item">
            <img src="${datos.images[2]}" class="d-block w-100">
          </div>
          <div class="carousel-item">
            <img src="${datos.images[3]}" class="d-block w-100">
          </div>
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
    </div>
</div>`

    //productos relacionado
    let rProducts = document.getElementById('relatedProducts')
    for (let relatedProduct of datos.relatedProducts) {
      rProducts.innerHTML += `
                <div class="rprodcards col order-3 card" onclick="localStorage.setItem('itemID',${relatedProduct.id}); window.location='product-info.html';">
                <div class="card-body">
                <p>${relatedProduct.name}</p>
                <div  class="card-img-top">
                <img src="${relatedProduct.image}">
                <p class="price">
                
                <spam class="price1">${datos.currency} ${datos.cost}</spam> 
                <div/>
                </div>
                `
    }
  })
//comentarios
const URL_COMMENTS = `https://japceibal.github.io/emercado-api/products_comments/${ItemID}.json`
fetch(URL_COMMENTS)
  .then(res => res.json())
  .then(comments => {
    function comentar() {
      div.innerHTML = ''

      for (let comentarios of comments) {
        div.innerHTML += `<b>${comentarios.user}</b> - ${comentarios.dateTime} - `
        Commentsp.appendChild(div)
        // estrellas
        for (let i = 0; i < comentarios.score; i++) {
          let starsON = document.createElement('span')
          starsON.classList.add('fa')
          starsON.classList.add('fa-star')
          starsON.classList.add('checked')
          div.appendChild(starsON)
        }
        if (comentarios.score < 5) {
          let repetir = 5 - comentarios.score
          for (let i = 0; i < repetir; i++) {
            let starsOFF = document.createElement('span')
            starsOFF.classList.add('fa')
            starsOFF.classList.add('fa-star')
            div.appendChild(starsOFF)
          }
        }
        div.innerHTML += `<br>${comentarios.description}<br></br>`
      };
    }
    comentar()
    divcomments.innerHTML = `
        <h4>Comenta</h4>
        <p>Tu opinion nos importa:</p><br>
        <textarea name="Comentario" id="Comentario" cols="50" rows="2"></textarea><br>
        <p>Tu puntuacion:</p>
        <select name="stars" id="stars">
        <option>1 Estrella</option>
        <option>2 Estrellas</option>
        <option>3 Estrellas</option>
        <option>4 Estrellas</option>
        <option>5 Estrellas</option>
        </select>
        <input type="button" class="btn btn-primary" id="commentbtn" value="Enviar">
        `
    let Comentario = document.getElementById('Comentario')
    let stars = document.getElementById('stars')
    let btnComments = document.getElementById('commentbtn')

    //funcion para nuevo comentario
    function newcomment() {
      let dateTime = new Date()
      let year = dateTime.getFullYear()
      let month = dateTime.getMonth()
      let day = dateTime.getDate()
      let hours = dateTime.getHours()
      let min = dateTime.getMinutes()
      let sec = dateTime.getSeconds()
      let array = {
        product: parseInt(catid),
        score: parseInt(stars.value),
        description: Comentario.value,
        user: userlog,
        dateTime: day + '/' + month + '/' + year + ' ' + hours + ':' + min + ':' + sec
      }
      comments.push(array)
      Commentsp.removeChild(div)
      if (userlog !== userdef) {
        comentar()
      } else {
        alert('Necesita estar logeado para comentar')
        location.reload()
      };
    };
    btnComments.addEventListener('click', newcomment)
  })
