const {ipcRenderer,contextBridge} = require("electron");

contextBridge.exposeInMainWorld("api",{
    enviarMensaje2:(mensaje)=>{
        console.log("se envió el mensaje: " + mensaje)
        ipcRenderer.send("enviar-mensaje2",mensaje)
    }
})

ipcRenderer.on("respuesta1",(evento,datos)=>{
    console.log("llego la respuesta")
    console.log(datos)
    document.getElementById("texto2").innerText = datos;
})