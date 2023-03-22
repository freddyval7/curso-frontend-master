const {ipcRenderer,contextBridge} = require("electron");
let oldPass;

contextBridge.exposeInMainWorld("api",{
    cambiarClave: (clave)=>{
        ipcRenderer.send("cambiar-clave",clave)
    },
    obtenerClave: ()=>{
        return oldPass;
    }
})

ipcRenderer.on("password",(e,obj)=>{
    console.log("Clave vieja es " + obj.password)
    oldPass = obj.password;
})

