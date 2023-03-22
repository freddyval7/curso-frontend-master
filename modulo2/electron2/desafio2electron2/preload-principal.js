const {ipcRenderer,contextBridge} = require("electron");

contextBridge.exposeInMainWorld("api",{
    cerrarSesion: ()=>{
        ipcRenderer.send("msg-cerrar-sesion");
    }
})