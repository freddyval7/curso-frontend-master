
const {ipcRenderer,contextBridge} = require("electron")

contextBridge.exposeInMainWorld("api",{
    cambiarTitulo: (titulo)=>{
        ipcRenderer.send("cambiar-titulo",titulo)
    }
})