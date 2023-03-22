const {app,BrowserWindow} = require("electron")

process.env['ELECTRON_DISABLE_SECURITY_WARNINGS']=true;
console.log("nombre de la \\ \"app\": "+app.name)
console.log("ruta donde esta almacenada:"+__dirname)

app.on("ready",()=>{
    let w=new BrowserWindow({
        
        webPreferences:{
            devTools :true,
            // es una practica que se considera insegura en algunos contextos
            contextIsolation :false,
            nodeIntegration :true
        }
    })
    w.loadFile("index.html")
    w.webContents.openDevTools()
    w.maximize()
})