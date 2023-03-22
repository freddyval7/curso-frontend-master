let texto = document.getElementById("text");

document.getElementById("btnCambiarClave").onclick = ()=>{
    let oldPass = api.obtenerClave();
    console.log(oldPass)
    let newClave;
    if(document.getElementById("nuevaClave").value !== "" && document.getElementById("nuevaClaveConfirm").value !== "" && document.getElementById("oldClave").value !== ""){
        if(document.getElementById("oldClave").value !== oldPass){
            document.getElementById("text").style.display = "block";
            document.getElementById("text").innerText = "La contraseña antigua no coincide!";
            return false;
        } else{
            if(document.getElementById("nuevaClave").value === document.getElementById("nuevaClaveConfirm").value){
                newClave = document.getElementById("nuevaClave").value;
                texto.style.display = "block"
                document.getElementById("text").innerText = "Clave cambiada con éxito!";
                document.getElementById("nuevaClave").value = "";
                document.getElementById("nuevaClaveConfirm").value = "";
                document.getElementById("oldClave").value = "";
            } else{
                texto.style.display = "block"
                document.getElementById("text").innerText = "Las claves deben coincidir";
        }
        }
    } else{
        texto.style.display = "block"
        document.getElementById("text").innerText = "No pueden haber campos vacíos"
    }
    api.cambiarClave(newClave)
    setTimeout(()=>{
        texto.style.display = "none";
    },3000)
}

texto.style.display = "none"

