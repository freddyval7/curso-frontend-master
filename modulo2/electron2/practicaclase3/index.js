document.getElementById("btn").onclick = (e)=>{
    e.preventDefault;
    window.history.back();
    console.log("click btn 1")
    console.log(document.getElementById("input").value)
    api.enviarMensaje1(document.getElementById("input").value)
    document.getElementById("input").value = ""
}

