const {ipcRenderer,contextBridge} = require("electron");

contextBridge.exposeInMainWorld("api",{
    cerrarSesion: ()=>{
        ipcRenderer.send("msg-cerrar-sesion");
    }
})

ipcRenderer.on("foto",(e,user)=>{
    console.log(user)
    document.getElementById("titulo").innerText = `Bienvenido, ${user.user}!`;
    document.getElementById("foto").src=user.foto;
    document.getElementById("foto").style.display="inline";
})