const {ipcRenderer,contextBridge} = require("electron");
let path;

contextBridge.exposeInMainWorld("api",{
    abrirInicio: ()=>{
        ipcRenderer.send("abrir-inicio");
    },
    buscarFoto: ()=>{
        ipcRenderer.invoke("buscar-foto").then(resp => {
            console.log(resp.filePaths[0])
            if(!resp.canceled){
                let foto=document.getElementById("foto")
                foto.src=resp.filePaths[0]
                foto.style.display="inline"
                path=resp.filePaths[0]
            }
        })
    },
    guardarUsuario: (user)=>{
        user.foto = path;
        ipcRenderer.send("guardar-usuario",user)
    }
})

ipcRenderer.on("respuesta",()=>{
    document.getElementById("btnRegistrar").disabled = false;
    document.getElementById("texto").innerText = "Se registró con éxito";
    document.getElementById("foto").style.display="none"
    document.forms[0].reset();
})