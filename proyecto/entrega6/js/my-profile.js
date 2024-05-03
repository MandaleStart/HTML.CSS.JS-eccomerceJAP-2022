
let input_mail = document.getElementById('user_mail')
let input_name1  = document.getElementById('name1')
let input_name2 = document.getElementById('name2')
let input_surname1 = document.getElementById('surname1')
let input_surname2 = document.getElementById('surname2')
let input_tel = document.getElementById('celnumber')
let save_changes = document.getElementById('save_changes')
let img_saved = localStorage.getItem('img_saved')
let img_tag = document.getElementById('img_profile')
let countrefresh = sessionStorage.getItem('countrefresh')
let databasic_name1 = localStorage.getItem('databasic_name1')
let databasic_name2 = localStorage.getItem('databasic_name2')
let databasic_surname1 = localStorage.getItem('databasic_surname1')
let databasic_surname2 = localStorage.getItem('databasic_surname2')
let databasic_mail = localStorage.getItem('databasic_mail')
let databasic_tel = localStorage.getItem('databasic_tel')
let imput_user_img = document.getElementById('imput_user_img')

//Solamente se podrá ingresar al perfil si el usuario se encuentra logueado. 
//al momento de ingresar por primera vez, todos los campos se deben encontrar vacíos, excepto E-mail
//que debe contener el ingresado por el usuario al momento del login.
function logedSession(){
if (userlog == null) {
    location.href = 'login.html'
} else {}
}
//Al presionar el botón para guardar los datos, se debe validar que los campos obligatorios (*) se encuentren con valor, y de ser así, guardar en el almacenamiento local.
function validData(element,element_status){

if ( element.value === ''){
    element.className = 'is-invalid'
   return false
}else{
    element.className = 'is-valid'
    return true
}}
save_changes.addEventListener('click', () => {
    validData(input_name1)
    validData(input_name2)
    validData(input_surname1)
    validData(input_surname2)
    validData(input_mail)
    validData(input_tel)
if ( validData(input_name1) && validData(input_name2) && validData(input_surname1) && validData(input_surname2) && validData(input_mail) && validData(input_tel))
{
    localStorage.setItem('databasic_name1',input_name1.value)
    localStorage.setItem('databasic_name2',input_name2.value)
    localStorage.setItem('databasic_surname1',input_surname1.value)
    localStorage.setItem('databasic_surname2',input_surname2.value)
    localStorage.setItem('databasic_mail',input_mail.value)
    localStorage.setItem('databasic_tel',input_tel.value)
} else {}
 });
//Las siguientes veces que se ingrese al perfil, ya se deben encontrar los datos cargados en los input, listos para ser modificados por el usuario.
document.addEventListener('DOMContentLoaded', () =>{
    logedSession()
    loadDataBasicInfo(databasic_name1, input_name1)
    loadDataBasicInfo(databasic_name2, input_name2)
    loadDataBasicInfo(databasic_surname1, input_surname1)
    loadDataBasicInfo(databasic_surname2, input_surname2)
    loadDataBasicInfo(databasic_mail, input_mail)
    loadDataBasicInfo(databasic_tel, input_tel)
})
 function loadDataBasicInfo(databasic_data, input_data){
    if (databasic_data !='null'){
        input_data.value = databasic_data
    } else { null}
 }
/*
¡Desafíate!
Ofrécele al usuario la posibilidad de guardar una imagen de perfil, y muéstrasela. En caso de que no seleccione una, muestra una imagen por defecto.
*/
function SaveFile(){
  clog(imput_user_img.files[0])
  var archivo = imput_user_img.files[0];
  var reader = new FileReader();
  if (imput_user_img.value) {
  reader.readAsDataURL(archivo );
  reader.onloadend = function () {
  img_tag.src = reader.result;
 localStorage.setItem("img_saved", reader.result);
}
 }
}
function imgloader() {
    if (img_saved === null) {
      img_tag.setAttribute('src','img/img_perfil.png')

    } else {
      img_tag.setAttribute('src',`${img_saved}`)
    }
}
imgloader()