function login() {
    let user = document.getElementById('user').value;
    let pass = document.getElementById('pass').value;
    let errorstatus = document.getElementById('errortextlog');
    let numerror = 1
    let nologed = localStorage.getItem('user');
    
    //validacion y redireccion 
    if (user != "" && pass != "") {
        localStorage.setItem('user', user);
        location.href = 'index.html';
    }
    //error
    else if (errorstatus < numerror) {
        var sp2 = document.getElementById('btnlogin');
        let errorText = document.createElement('p')
        let errorTextLog = document.createTextNode('Usuario y clave son requeridos');
        errorText.id = 'errortextlog'
        errorText.appendChild(errorTextLog);
        sp2.parentNode.insertBefore(errorText, sp2);
    }
    else { null } //  si ya se mostro un mensaje de error no se vuelve a mostrar
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('btnlogin').addEventListener('click', () => { login(); })  
})
