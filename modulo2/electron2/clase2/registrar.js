

document.getElementById("btn-registrar").onclick=()=>{
    console.log("registrar..")
    if (api.registrar({
        cedula:document.datos.cedula.value,
        nombre:document.datos.nombre.value
    })){
        document.getElementById("msg-exito").innerText="Se registro exitosamente"
        document.getElementById("msg-exito").style.display="block"
        document.datos.reset()
    }else{
        document.getElementById("msg-exito").innerText="Ya existe"
        document.getElementById("msg-exito").style.display="block"
    }
    setTimeout(()=>{
        document.getElementById("msg-exito").style.display="none"
    },3500)
}

document.getElementById("msg-exito").style.display="none"

document.getElementById("btn-cerrar").onclick=()=>{
    console.log("cerrar..")
    api.cerrar()
}