const {ipcRenderer,contextBridge}=require("electron")


contextBridge.exposeInMainWorld("api",{
    cerrar:()=>{
        console.log("preload cerrar..")
        ipcRenderer.send("msg-win-close")
    },
    salir:()=>{
        console.log("preload salir..")
        ipcRenderer.send("msg-salir")
    },
    abrir:()=>{
        console.log("preload abrir..")
        ipcRenderer.send("msg-abrir-youtube")
    },
    abrirVentanaRegistro:()=>{
        console.log("preload abrir ventana registro..")
        ipcRenderer.send("msg-abrir-ventana-registro")
    }
})