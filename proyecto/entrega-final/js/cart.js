const userID = localStorage.getItem('userID')

if (userID === undefined) { localStorage.setItem('userID', 25801) } else { }

//
// carga de productos
const URL_USER_CART = `https://japceibal.github.io/emercado-api/user_cart/${userID}.json`
const prod_add_list = localStorage.getItem('productadd')
let item_agregado = document.getElementsByClassName('item_tr')

// plantilla de producto
const item_add_table = document.getElementById('tbcart')
function itemAddTable(article) {
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
// cargar datos de la API al carrrito
fetch(URL_USER_CART)
	.then(res => res.json())
	.then(datos => {
		for (let article of datos.articles) { itemAddTable(article) }
	})
// carga de datos de localstorage
function addToCart() {
	let article_list = JSON.parse(prod_add_list)
	if (item_agregado !== null) {
		for (let article of article_list.articles) {
			itemAddTable(article)
		}
	} else { // si prodaddlist es null muestra que no hay productos en el carrito
		item_add_table.innerHTML += `<tr class="item_tr table-striped">No hay productos en su carrito</tr>`
	}
}
addToCart()
//
// borrar item de carrito
function delProduct(id_deleted) {
	deletProds(id_deleted)
	alertShow()
}

// Eliminar productos de la lista
function deletProds(id_deleted) {
	for (let i = 0; i < prodls_parse.articles.length; i++) {
		if (prodls_parse.articles[i].id === id_deleted) {
			let prodls_fix = prodls_parse.articles[i].splice(i, 1)
			localStorage.setItem("productadd", JSON.stringify(prodls_fix))
		}
		location.reload()
	}
}
// alerta  de borrado de item
function alertShow() {
	let showAlert = document.getElementById('showalert')
	showAlert.innerHTML = `<p class="btn btn-danger">Se ha eliminado el producto del carrito<p>`
	setTimeout(function () {
		showAlert.innerHTML = ''
	}, 5000)
}

//
//modal con forma de pago
let credit_card = document.getElementById('payforms_credit_card').checked
let bank_account = document.getElementById('payforms_bank_trans').checked
let bank_options = document.getElementsByClassName('pay_by_bank')
let card_options = document.getElementsByClassName('pay_by_card')

// deshabilitar  tarjeta o banco
function payFormOff() {
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
//validar tarjeta o banco

let payformselected = document.getElementById('pay_form_selected')
let pay_no_selected = document.getElementById('pay_noselected')
function fn_PayFormValidator() {
	if (bank_account) {
		validBankAcc()
		bank_label.classList.remove('is-Invalid')
	  	pay_no_selected.setAttribute("style","display:none;")
	   	payformselected.innerHTML = `<div>${bank_acc.value}</div>`
		payformselected.setAttribute("style","display:block;")
		return true
	} else if (credit_card){
		validateCard()
		pay_no_selected.setAttribute("style","display:none;")
		payformselected.innerHTML = `<div>Tarjeta:${card_number.value} </div>`
	   payformselected.setAttribute("style","display:block;")
	   return true
	} else {
		
		return false
	}
}


// validar tarjeta
function validateCard() {
	validExpirateDate()
	validCardNumber()
	validCVC()
}
// -> valirdar  Fecha de vencimiento
let card_expire_date = document.getElementById('card_expiration')

function validExpirateDate() {
	let card_expire = card_expire_date.value.split('-')
	var today = new Date();
	var day = today.getDate();
	var month = today.getMonth() + 1;
	var year = today.getFullYear();

	if ((card_expire[0] < year)) {
		card_expire.className = "pay_by_card is-invalid";

	} else if ((card_expire[1] < month) && (card_expire[0] < year)) {
		card_expire.className = "pay_by_card is-invalid";
	} else {
		card_expire.className = "pay_by_card is-valid"
	}
}
// -> valirdar numero de tarjeta
function validCardNumber() {
	if ((!isNaN(card_number.value)) && (card_number.value.length >= 10)) {
		card_number.className = "pay_by_card is-valid"
	} else {
		card_number.className = "pay_by_card is-invalid"
	}
}
// -> valirdar cvc
let pay_cvc = document.getElementById("card_cvc")
function validCVC() {
	let cvc = pay_cvc.value
	if ((!isNaN(cvc)) && (pay_cvc.value.length >= 3) && (pay_cvc.value.length <= 6)) {
		pay_cvc.className = "pay_by_card is-valid"
	} else { pay_cvc.className = "pay_by_card is-invalid" }
}

// validar banco
let bank_acc = document.getElementById('bank_account_number')
function validBankAcc() {

	if (isNaN(bank_acc.value) && (bank_acc.value.length >= 6)) {
		bank_acc.className = "pay_by_bank is-valid"
	} else {
		bank_acc.className = "pay_by_bank is-invalid"
	}

}
bank_acc.addEventListener('change', () => { validBankAcc() })

//
// total subtotal y costo de envio
// -> calcular subtotal
function fn_sub_total_G() {
	let spam_currency = document.getElementsByClassName('spam_currency')
	let spam_subtotal = document.getElementsByClassName('spam_subtotal')
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
// -> calcular envio
let sub = document.getElementById('div_subtotalG')
let sendcost_val
function sendType() {//calcula envio y lo envia al DOM
	let selected_send = document.getElementsByName('envio')
	let purchasemessage = document.getElementsByClassName('purchasemessage')
	let sub_total_G = parseInt(document.getElementById('STG').textContent)

	if (selected_send[0].checked) {//standar
		sendcost_val = true
		sendcost = (sub_total_G / 100) * 5
		purchasemessage.innerHTML += `<p>Tu compra llegara entre 12 y 15 dias </p>`
		s_e_t.innerHTML += `<div class="row-1 order-2 " id="div_sendcost">Envio:<spam id='s_sendcost'>${sendcost}</spam></div>`
	} else if (selected_send[1].checked) {//express
		sendcost_val = true
		sendcost = (sub_total_G / 100) * 7
		purchasemessage.innerHTML += `<p>Tu compra llegara entre 5 y 8 dias </p>`
		s_e_t.innerHTML += `<div class="row-1 order-2 " id="div_sendcost">Envio:<spam id='s_sendcost'>${sendcost}</spam></div>`
	} else if (selected_send[2].checked) {//premium
		sendcost_val = true
		sendcost = (sub_total_G / 100) * 15
		purchasemessage.innerHTML += `<p>Tu compra llegara entre 2 y 5 dias </p>`
		s_e_t.innerHTML += `<div class="row-1 order-2 " id="div_sendcost">Envio:<spam id='s_sendcost'>${sendcost}</spam></div>`
	} else {//fallo
		sendcost_val = false
		sendcost = 'seleccionar envio'
		s_e_t.innerHTML += `<div class="row-1 order-2 " id="div_sendcost">Envio:Seleccionar tipo de envio</div>`
	}
}
// -> calcular total
function totalG() {
	let sub_total_G = parseInt(document.getElementById('STG').textContent)
	let sendcost
	if (sendcost_val) { sendcost = parseInt(document.getElementById('s_sendcost').textContent) }
	else { sendcost = 0 }
	let total = sub_total_G + sendcost
	s_e_t.innerHTML += `<div class="row-1 order-3 "  id="div_total">Total:USD ${total}</div>`
}
//
// validar seccion envio
function validSendMode() {
	sendmode = document.getElementsByClassName('sendtype')
	if (sendmode[0].checked || sendmode[1].checked || sendmode[2].checked) {
		sendmode.className = "is-valid"
		small_sendmode.setAttribute('style', 'display:none')
		return true
	} else {
		
		sendmode.className = "is-invalid";
		small_sendmode.setAttribute('style', 'display:block')
		return false
	}
}

// -> validador general
function fn_validator(data_evaluate, smalltag_data_evaluate) {

	if (data_evaluate.value !== '') {
		data_evaluate.className = "is-valid"
		smalltag_data_evaluate.setAttribute('style', 'display:none')
		return true
	} else {
		data_evaluate.className = "is-invalid";
		smalltag_data_evaluate.setAttribute('style', 'display:block')
		return false
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

// calculo del subtotal por cada producto
function calcsubtotal(article, cost) {
	let input = document.getElementById(`input_of${article}`).value
	let subTotal = document.getElementById(`sub_of_${article}`)
	let sub_total = cost * input
	subTotal.innerHTML = `${sub_total}`
}
let street = document.getElementById("calle")
let numdoor = document.getElementById("numpuerta")
let corner_street = document.getElementById("calleEsquina")
let valid_purchase = document.getElementById('cartopc')

valid_purchase.addEventListener('change', () => {
	let confirm_purchase = document.getElementById('btnconfirm')
	validSendMode()
	fn_validator(numdoor, small_street_number)
	fn_validator(street, small_street)
	fn_validator(corner_street, small_street_corner)
	
	if (validSendMode() && fn_validator(numdoor, small_street_number) && fn_validator(street, small_street) && fn_validator(corner_street, small_street_corner)
	) {
		confirm_purchase.removeAttribute('disabled')
	} else {
		confirm_purchase.setAttribute('disabled', '')

	}
})