
const {ipcRenderer, contextBridge} = require("electron")

contextBridge.exposeInMainWorld("api",{
    abrir:()=>{
        console.log("abrir en el preload")
        ipcRenderer.invoke("abrir-archivo","hola").then((respuesta)=>{
            console.log("se cumplio la promesa")
            console.log(respuesta)
        })
    },
    guardar:(prod)=>{
        console.log("guardar en el preload")
        ipcRenderer.send("guardar-archivo",prod)
        
    },
    crearCarpeta: (nombre)=>{
        div = document.getElementById("mensajes")
        ipcRenderer.invoke("crear-carpeta",nombre).then(()=>{
            div.innerText="Se creo la carpeta exitosamente"
        }).catch(()=>{
            div.innerText="No se puedo crear la carpeta"
        })
    },
    buscarFoto: ()=>{
        ipcRenderer.invoke("buscar-foto").then((resp)=>{
            console.log(resp)
            if (!resp.canceled){
                let foto=document.getElementById("foto")
                foto.src=resp.filePaths[0]
                foto.style.display="inline"
            }
        })
    }
})

ipcRenderer.on("respuesta",(evt,datos)=>{
    console.log("llego la respuesta del guardar")
    console.log(datos)
    document.getElementById("btn-guardar").disabled=false
    document.getElementById("mensajes").innerText = 
        `Se guardo exitosamente el producto ${datos.producto}`
})