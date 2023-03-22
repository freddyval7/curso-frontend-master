
document.getElementById("btn-abrir").onclick=()=>{
    //window.open("http://google.com")
    console.log("abrir..")
    api.abrir()
}

document.getElementById("btn-cerrar").onclick=()=>{
    console.log("cerrar..")
    api.cerrar()
}

document.getElementById("btn-salir").onclick=()=>{
    console.log("salir..")
    api.salir()
}

document.getElementById("btn-registrar").onclick=()=>{
    console.log("abrir ventana de registror..")
    api.abrirVentanaRegistro()
}
