const {ipcRenderer,contextBridge} = require("electron");

contextBridge.exposeInMainWorld("api",{
    iniciarSesion: (obj)=>{
        console.log("preload iniciar sesion")
        let resp = ipcRenderer.sendSync("msg-iniciar-sesion",obj); //NO UTILIZAR SEND SYNC
        console.log(resp);
        return resp;
    },
    abrirRegistro: ()=>{
        ipcRenderer.send("abrir-registro");
    }
})