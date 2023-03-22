document.getElementById("btnIniciar").onclick = ()=>{
    if(api.iniciarSesion({
        username: document.form.nombre.value,
        pass: document.form.clave.value
    })){
        document.form.reset();
        document.getElementById("msg").innerText = "El usuario NO existe";
        document.getElementById("msg").style.display = "block";
    } else {
        document.form.reset();
        document.getElementById("msg").innerText = "El usuario SI existe";
        document.getElementById("msg").style.display = "block";
    }
    setTimeout(() => {
        document.getElementById("msg").style.display = "none";
    }, 3000);
}

document.getElementById("msg").style.display = "none";