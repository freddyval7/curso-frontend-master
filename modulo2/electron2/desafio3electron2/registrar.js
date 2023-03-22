document.getElementById("btnRegistrar").onclick = ()=>{
    this.disabled = true;
    let user = {
        user: document.registrar.user.value,
        password: document.registrar.password.value,
        foto: "x"
    };
    api.guardarUsuario(user);
    setTimeout(() => {
        document.getElementById("texto").style.display = "none"
    }, 3000);
}

document.getElementById("btnAbrirInicio").onclick = ()=>{
    api.abrirInicio();
}

document.getElementById("btnFoto").onclick = ()=>{
    console.log("busca foto js")
    api.buscarFoto();
}