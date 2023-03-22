const {app,BrowserWindow,ipcMain,dialog} = require("electron");

const path = require("path");

app.on("ready",()=>{
    let w1 = new BrowserWindow({
        title: "Ventana 1",
        show:false,
        webPreferences: {
            preload: path.join(__dirname,"preload1-index.js"),
            sandbox:false
        }
    });
    w1.loadFile("ventana.html");
    w1.show();
    w1.webContents.openDevTools();

    let w2 = new BrowserWindow({
        title: "Ventana 2",
        show:false,
        webPreferences: {
            preload: path.join(__dirname,"preload2-index.js"),
            sandbox:false
        }
    });
    w2.loadFile("ventana2.html");
    w2.show();
    w2.webContents.openDevTools();

    ipcMain.on("enviar-mensaje1",(evento,datos)=>{
        console.log("Mensaje 1: "+datos)
        w2.webContents.send("respuesta1",datos)
    })
    ipcMain.on("enviar-mensaje2",(evento,datos)=>{
        console.log("Mensaje 2: "+datos)
        w1.webContents.send("respuesta2",datos)
    })
})

