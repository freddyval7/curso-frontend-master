const {ipcRenderer,contextBridge} = require("electron");

contextBridge.exposeInMainWorld("api",{
    iniciarSesion: (obj)=>{
        console.log("preload iniciar sesion")
        let resp = ipcRenderer.sendSync("msg-iniciar-sesion",obj);
        console.log(resp);
        return resp;
    }
})