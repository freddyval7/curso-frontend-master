const {ipcRenderer,contextBridge} = require("electron");

contextBridge.exposeInMainWorld("api",{
    enviarMensaje1:(mensaje)=>{
        console.log("se envió el mensaje: " + mensaje)
        ipcRenderer.send("enviar-mensaje1",mensaje)
    }
})

ipcRenderer.on("respuesta2",(evento,datos)=>{
    console.log("llego la respuesta")
    console.log(datos)
    document.getElementById("texto").innerText = datos;
})