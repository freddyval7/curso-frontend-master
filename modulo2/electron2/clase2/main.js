const {ipcMain,app,dialog,BrowserWindow,Menu}=require("electron")
const path = require('path')

// funcionara en cualquier SO
console.log(path.join(__dirname,"preload-registrar.js"))
// solo funcionara en SO Window
console.log(__dirname+"\\preload-registrar.js")

app.on("ready",()=>{
    //QUITAR EL MENU
    Menu.setApplicationMenu(null);
    let win = new BrowserWindow({
        titleBarStyle :"hidden",
        webPreferences:{
            preload: __dirname+"\\preload-index.js",
            sandbox :false
        }
    })
    win.setMenu(null)
    win.loadFile("index.html")
})

app.on("will-quit",(event)=>{

})

ipcMain.on("msg-win-close",(evt)=>{
    console.log(evt.processId)
    console.log(evt.frameId)
    console.log(evt.sender.id)
    // sender es el webContents de la ventan
    // que envia el mensaje
    evt.sender.close()
})

ipcMain.on("msg-salir",(evt)=>{
    console.log("salir desde el main....")
    app.quit()
})

ipcMain.on("msg-abrir-ventana-registro",()=>{
    // para abrir la ventana de registro
    console.log("abrir ventana registro")
    let w=new BrowserWindow({
        width:400,
        height:400,
        alwaysOnTop:true,
        webPreferences:{
            preload:path.join(__dirname,"preload-registrar.js")
        }
    })
    w.loadFile("registrar.html")
    console.log(w.id)

})
// base de datos de clientes
let clientes=[]

ipcMain.once("msg-registrar",(evt,obj)=>{
    // para registrar el nuevo cliente
    console.log(obj)
    if (!existeCliente(obj.cedula)){
        clientes.push(obj)
        console.log(clientes)
        dialog.showMessageBox(null,{
            message :"Hola",
            title:"Saludos"
        })
        evt.returnValue=true
    }else
        evt.returnValue=false

    console.log("despues del dialog")
    // es el valor "evt.returnValue" para un
    // llamado a ipcMain usando sendSync
    // luego de dar valor a este atributo
    // el render process se desbloquea y 
    // recibe el dato 
})

function existeCliente(ced){
    for (c of clientes)
        if (c.cedula == ced)
            return true
    
    return false
}

ipcMain.on("msg-abrir-youtube",()=>{
    console.log("abrir desde el main....")
    let win2 = new BrowserWindow({
        show:false,
        opacity:0.5
    })
    win2.loadURL("https://youtube.com")
    win2.on("ready-to-show",()=>{
        win2.show()
        win2.maximize()
    })
})
