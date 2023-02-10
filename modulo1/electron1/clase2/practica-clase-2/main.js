const { app, BrowserWindow } = require("electron")

console.log("arranco la aplicacion...")

app.on("ready",()=>{
    createWindow();
    console.log("Esta lista la app electron. Su nombre es")
    console.log(app.name)
    console.log("Esta empaquetada: "+ app.isPackaged)
    // app.quit()
})

function createWindow () {
    // Create the browser window.
    const mainWindow = new BrowserWindow({
      width: 800,
      height: 600
    })
}

app.on("before-quit", ()=>{
    console.log("se va a cerrar la app")
})

app.on("quit",()=>{
    console.log("se cerro la app")
})

console.log("despues del ready")