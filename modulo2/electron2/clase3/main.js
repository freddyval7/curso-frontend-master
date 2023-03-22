
const {app,BrowserWindow,ipcMain,dialog} = require("electron")
const path = require("path")
const { mkdir } = require('node:fs/promises')
const fs = require("fs")

let productos;
let nombreArchivo = path.join(__dirname,"productos.json")

fs.readFile(nombreArchivo,"utf8",(err,data)=>{
    console.log(data)
    try{
        productos = JSON.parse(data)
        console.log(productos)
    }catch(error){
        console.log("no se puedo procesar el archivo")
    }
})

app.on("ready",()=>{
    let w = new BrowserWindow({
        show:false,
        webPreferences: {
            preload: path.join(__dirname,"preload-index.js"),
            sandbox: false
        }
    })
    w.loadFile("index.html")
    w.show()

    /*setTimeout(()=>{
        w.webContents.send("respuesta",{
            nombre:"Pedro",
            cedula: "54241"
        })
    },5000)*/
})

ipcMain.on("guardar-archivo",(evt,datos)=>{
    console.log("se llama al guardar...")
    
    productos.push(datos)
    fs.writeFile(nombreArchivo,JSON.stringify(productos),(err)=>{
        if (err == null)
            console.log("se creo el archivo")
        else
            console.log("error al crear el archivo:"+err)

        evt.reply("respuesta",{
            error:err,
            producto: datos.nombre
        })
    })
    /*
    si se necesita enviar una respuesta al render
    setTimeout(()=>{
        evt.reply("respuesta",{
            nombre:"jose",
            cedula:"123456"
        })
    },5000)*/
})

ipcMain.handle("buscar-foto",()=>{
    return dialog.showOpenDialog(null,{
        title: "Seleccionar foto del producto",
        filters:[{
            name: "PNG",
            extensions :["png"]
        }]
    })
})

ipcMain.handle("crear-carpeta",(evt,nombre)=>{
    console.log("se intenta crear la carpeta "+nombre)
    let ruta=path.join(__dirname,nombre)
    console.log("path: "+ruta)
    return mkdir(ruta)
})

ipcMain.handle("abrir-archivo",(event,datos)=>{
    console.log("llego el invoke")
    console.log(event)
    console.log(datos)
    return dialog.showMessageBox(null,{
        message :"¿Desea salir sin guardar?",
        buttons: ["Si","No"],
        type :"question",
        title: "Confirmación",
        noLink: true,
        checkboxLabel :"No volver a preguntar"
    })
})