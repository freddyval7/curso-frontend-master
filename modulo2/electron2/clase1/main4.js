const {app,BrowserWindow} = require("electron")

process.env['ELECTRON_DISABLE_SECURITY_WARNINGS']=true;
console.log("nombre de la \\ \"app\": "+app.name)
console.log("ruta donde esta almacenada:"+__dirname)

app.on("ready",()=>{
    let w=new BrowserWindow({

        webPreferences:{
            sandbox: false,
            preload: __dirname+"\\preload-main4.js",
            devTools :true,
        }
    })
    w.loadFile("index2.html")
    w.webContents.openDevTools()
    w.maximize()
})