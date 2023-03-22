const {ipcRenderer,contextBridge}=require("electron")


contextBridge.exposeInMainWorld("api",{
    cerrar:()=>{
        console.log("preload cerrar..")
        ipcRenderer.send("msg-win-close")
    },
    registrar:(obj)=>{
        console.log("preload registrar..")
        let resp = ipcRenderer.sendSync("msg-registrar",obj)
        console.log("despues de enviar..")
        console.log(resp)
        return resp;
    }
})