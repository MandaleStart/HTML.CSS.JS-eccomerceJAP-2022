const UserID = localStorage.setItem('userID', 25801)//en desarrollo
const userID = localStorage.getItem('userID')
const URL_USER_CART = `https://japceibal.github.io/emercado-api/user_cart/${userID}.json`
const prod_add_list = localStorage.getItem('productadd')
const item_add_table = document.getElementById('tbcart')
let item_agregado = document.getElementsByClassName('item_tr')
let card_expire_date = document.getElementById('card_expiration')
let pay_user_ci = document.getElementById("pay_user_ci")
let pay_user_name = document.getElementById("pay_user_name")
let pay_cvc = document.getElementById("card_cvc")
let street = document.getElementById("calle")
let numdoor = document.getElementById("numpuerta")
let corner_street = document.getElementById("calleEsquina")
let city = document.getElementById("ciudad")
let dep = document.getElementById("departamento")

let small_street_number = document.getElementById("small_street_number")
let small_street = document.getElementById("small_street")
let small_street_corner = document.getElementById("small_street_corner")
let small_city = document.getElementById("small_city")
let small_dep = document.getElementById("small_dep")

let valid_Street
let valid_DoorNumber
let valid_CornerStreet
let valid_City
let valid_Dep
let valid_sendmode
let valid_pay_form

let valid_purchase = document.getElementById('total_of_cart')
let confirm_purchase = document.getElementById('btnconfirm')
let prodls = localStorage.getItem('productadd')
let prodls_parse = JSON.parse(prodls)
let spam_currency = document.getElementsByClassName('spam_currency')
let spam_subtotal = document.getElementsByClassName('spam_subtotal')
let credit_card = document.getElementById('payforms_credit_card').checked
let bank_account = document.getElementById('payforms_bank_trans').checked
let bank_options = document.getElementsByClassName('pay_by_bank')
let card_options = document.getElementsByClassName('pay_by_card')


// recoleccion de datos desde api
fetch(URL_USER_CART)
	.then(res => res.json())
	.then(datos => {
		for (let article of datos.articles) { itemaddtable(article) }
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
    <input type="number" class="inputofcart" id="input_of${article.id}" step="1" min="0" value="${article.count}" onchange="calcsubtotal(${article.id}, ${article.unitCost})">
    </td>
    <td class="sub_total col-3" value=""> 
	<spam class="spam_currency" id="currency_of_${article.id}">${article.currency}</spam>: <spam class="spam_subtotal" id="sub_of_${article.id}">${article.unitCost * article.count}</spam></td>
    </tr>`
}
// calculo del subtotal por cada producto
function calcsubtotal(article, cost) {
	let input = document.getElementById(`input_of${article}`).value
	let subTotal = document.getElementById(`sub_of_${article}`)
	let sub_total = cost * input
	subTotal.innerHTML = `${sub_total}`
}

function delProduct(id_deleted) {
	DeletProds(id_deleted)
	AlertShow()
}
function DeletProds(id_deleted) { // Eliminar productos de la lista)
	for (let i = 0; i < prodls_parse.articles.length; i++) {
		if (prodls_parse.articles[i].id === id_deleted) {
			console.log(prodls_parse.articles[i].id, i)
			let prodls_fix = prodls_parse.articles[i].splice(i, 1)
			localStorage.setItem("productadd", JSON.stringify(prodls_fix))
		}
		location.reload()
	}
}
// alerta  de borrado de item
function AlertShow() {
	let showAlert = document.getElementById('showalert')
	showAlert.innerHTML = `<p class="btn btn-danger">Se ha eliminado el producto del carrito<p>`
	setTimeout(function () {
		showAlert.innerHTML = ''
	}, 5000)
}

function payFormOff() { //anula la opcion no chequeada
	let credit_card = document.getElementById('payforms_credit_card').checked
let bank_account = document.getElementById('payforms_bank_trans').checked
	if (credit_card) {
		bank_options[0].toggleAttribute('disabled', true)
		for (let i = 0; i < card_options.length; i++)
			card_options[i].toggleAttribute('disabled', false)
	} else if (bank_account) {
		bank_options[0].toggleAttribute('disabled', false)
		for (let i = 0; i < card_options.length; i++)
			card_options[i].toggleAttribute('disabled', true)
	}
}

let s_e_t = document.getElementById('S-E-T')
//calcula total al cargar pagina
document.addEventListener('DOMContentLoaded', () => {
	s_e_t.innerHTML = ''
	fn_sub_total_G()
	sendType()
	totalG()
});
//calcula total al modificar pagina
document.addEventListener('change', () => {
	s_e_t.innerHTML = ''
	fn_sub_total_G()
	sendType()
	totalG()
});



//calcula subtotal y lo envia al DOM
function fn_sub_total_G() {
	let sub_total_G = 0
	for (let i = 0; i < spam_subtotal.length; i++) {

		if (spam_currency[i].textContent === "UYU") {
			sub_total_G = parseInt(spam_subtotal[i].textContent) / 40
		} else {
			sub_total_G += parseInt(spam_subtotal[i].textContent)
		}
	}
	s_e_t.innerHTML = `<div class="row-1 order-1 " id="div_subtotalG">Subtotal General: USD<spam id="STG">${sub_total_G}</spam></div>`
}

let sub = document.getElementById('div_subtotalG')
let sendcost_val
function sendType() {//calcula envio y lo envia al DOM

	let selected_send = document.getElementsByName('envio')
	let purchasemessage = document.getElementsByClassName('purchasemessage')
	let sub_total_G = parseInt(document.getElementById('STG').textContent)
	if (selected_send[0].checked) {
		sendcost_val = true
		sendcost = (sub_total_G / 100) * 5
		purchasemessage.innerHTML += `<p>Tu compra llegara entre 12 y 15 dias </p>`
		s_e_t.innerHTML += `<div class="row-1 order-2 " id="div_sendcost">Envio:<spam id='s_sendcost'>${sendcost}</spam></div>`
	} else if (selected_send[1].checked) {
		sendcost_val = true

		sendcost = (sub_total_G / 100) * 7
		purchasemessage.innerHTML += `<p>Tu compra llegara entre 5 y 8 dias </p>`
		s_e_t.innerHTML += `<div class="row-1 order-2 " id="div_sendcost">Envio:<spam id='s_sendcost'>${sendcost}</spam></div>`
	} else if (selected_send[2].checked) {
		sendcost_val = true

		sendcost = (sub_total_G/100) * 15
		purchasemessage.innerHTML += `<p>Tu compra llegara entre 2 y 5 dias </p>`
		s_e_t.innerHTML += `<div class="row-1 order-2 " id="div_sendcost">Envio:<spam id='s_sendcost'>${sendcost}</spam></div>`
	} else {
		sendcost_val = false

		sendcost = 'seleccionar envio'
		s_e_t.innerHTML += `<div class="row-1 order-2 " id="div_sendcost">Envio:Seleccionar tipo de envio</div>`
	}
}

function totalG() { //calcula total y lo envia al DOM
	let sub_total_G = parseInt(document.getElementById('STG').textContent)
	let sendcost
	if (sendcost_val){sendcost = parseInt(document.getElementById('s_sendcost').textContent)}
	else {sendcost = 0}
	let total = sub_total_G + sendcost
	s_e_t.innerHTML += `<div class="row-1 order-3 "  id="div_total">Total:USD ${total}</div>`

}
// validaciones de cuenta de banco
let bank_acc = document.getElementById('bank_account_number')
function validBankAcc() {

	if (!isNaN(bank_acc.value)) {
		bank_acc.className = "pay_by_card is-valid"
	} else {
		bank_acc.className = "pay_by_card is-invalid"
	}

}
bank_acc.addEventListener('change', () => { validBankAcc() })

// validaciones de tarjeta de credito

function validExpirateDate() {
	let card_expire = card_expire_date.value.split('-')
	var today = new Date();
	var day = today.getDate();
	var month = today.getMonth() + 1;
	var year = today.getFullYear();

	if ((card_expire[0] < year)) {
		card_expire.className = "pay_by_card is-invalid";
		console.log('invalid year')

	} else if ((card_expire[1] < month) && (card_expire[0] < year)) {
		card_expire.className = "pay_by_card is-invalid";
		console.log('invalid moth')
	} else {
		card_expire.className = "pay_by_card is-valid"
		console.log('valid')
	}
}

function validCardNumber() {
	if ((!isNaN(card_number.value)) && (card_number.value !== "")) {
		card_number.className = "pay_by_card is-valid"
	} else {
		card_number.className = "pay_by_card is-invalid"
	}
}
function validCVC() {
	let cvc = pay_cvc.value
	console.log(cvc.length)
	// cvc.length = 3  o cvc.length = 4  y isNaN(cvc)
	if (isNaN(cvc)) {
		pay_cvc.className = "pay_by_card is-invalid"
		let small_cvc = document.getElementById("small_cvc")
		small_cvc.setAttribute('style', 'display:block')
	} else { pay_cvc.className = "pay_by_card is-valid" }
}
function validName() {
	if ((pay_user_name != '') && (isNaN(pay_user_name.value))) {
		pay_user_name.className = "pay_by_card is-valid"
	} else {
		pay_user_name.className = "pay_by_card is-invalid";
		let small_name = document.getElementById("small_name")
		small_name.setAttribute('style', 'display:block')
	}
}
function validCI() {
	let ci = pay_user_ci.value
	if (!isNaN(ci)) {
		pay_user_ci.className = "pay_by_card is-valid"
		return true
	} else {
		return false
		pay_user_ci.className = "pay_by_card is-invalid";
		let small_ci = document.getElementById("small_ci")
		small_ci.setAttribute('style', 'display:block')
	}
}

//validar datos de envio
function validDep() {
	if (dep.value !== 'default') {
		dep.className = "is-valid"
		small_dep.setAttribute('style', 'display:none')
		valid_Dep = true

	} else {
		dep.className = "is-invalid";
		small_dep.setAttribute('style', 'display:block')
		valid_Dep = false

	}
}
function validSendMode() {
	sendmode = document.getElementsByClassName('sendtype')

	if (sendmode[0].checked || sendmode[1].checked || sendmode[2].checked) {
		sendmode.className = "is-valid"
		small_sendmode.setAttribute('style', 'display:none')
		valid_sendmode = true
	} else {
		valid_sendmode = false
		sendmode.className = "is-invalid";
		small_sendmode.setAttribute('style', 'display:block')

	}
}
function fn_validator(data_evaluate, smalltag_data_evaluate, validated_variable) {

	if (data_evaluate.value !== '') {
		data_evaluate.className = "is-valid"
		smalltag_data_evaluate.setAttribute('style', 'display:none')
		validated_variable = true
	} else {
		data_evaluate.className = "is-invalid";
		smalltag_data_evaluate.setAttribute('style', 'display:block')
		validated_variable = false
	}
}
//si estan todos los campos completos se activa el boton de compra sino al pasar serca del boton se desactiva
valid_purchase.addEventListener('mouseover', () => {
	validSendMode()
	validDep()
	fn_validator(street, small_street, valid_Street)// comprueba si campo calle esta completo
	fn_validator(city, small_city, valid_City)// comprueba si campo ciudad esta completo
	fn_validator(numdoor, small_street_number, valid_DoorNumber)// comprueba si campo numero de puertaesta completo
	fn_validator(corner_street, small_street_corner, valid_CornerStreet)// comprueba si campo esquina esta completo 

	if (!valid_pay_form || !valid_sendmode || !valid_CornerStreet || !valid_Street || !valid_DoorNumber || !valid_City || !valid_Dep) {
		confirm_purchase.setAttribute('disabled', '')
	} else {
		confirm_purchase.removeAttribute('disabled')
	}
})

function fn_PayFormValidator() {

 if ( bank_account){
	validateBank()
} else {
	validateCard()}
}

function validateBank(){
clog(bank_account)
clog(bank_acc.value.length >= 10)
clog((!isNaN(bank_acc.value)))
}

function validateCard(){
	
}