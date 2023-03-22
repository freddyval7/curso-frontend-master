let id = 0;
document.getElementById("btnRegistrar").onclick = ()=>{
    id++;
    this.disabled = true;
    let user = {
        user: document.registrar.user.value,
        password: document.registrar.password.value,
        foto: "x",
        id: id
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