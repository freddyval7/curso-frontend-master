document.getElementById("btn2").onclick = (e)=>{
    e.preventDefault;
    window.history.back();
    console.log("click btn 2")
    console.log(document.getElementById("input2").value)
    api.enviarMensaje2(document.getElementById("input2").value)
    document.getElementById("input2").value = ""
}