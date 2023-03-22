const {app,BrowserWindow,dialog,Notification,Tray,Menu,shell,ipcMain}=require("electron")
const path = require('path')

let winTitle, win;
let rutaIcono;

// si la aplicacion esta empaquetada, es decir, si esta corriendo el ejecutable
if (app.isPackaged)
    rutaIcono = path.join("resources","youtube.ico")
else
    rutaIcono = "youtube.ico"

// requestSingleInstanceLock retorna true es porque es la primera ejecucion 
// de la aplicacion
if (app.requestSingleInstanceLock())
    configApp()
else{
    dialog.showErrorBox("Error","La aplicación ya se esta ejecutando")
    app.quit();
}

function configApp(){

    // se dispara cuando el usuario intenta ejecutar la aplicacion por segunda vez
    app.on("second-instance",()=>{
        if (win != null){
            win.show()
            win.restore()
        }else
            crearVentana();
        
    })

    function crearVentana(){
        win = new BrowserWindow({
            icon :rutaIcono,
            show:false
        })
        // para modificar el super titulo de la notificación
        app.setAppUserModelId("Sistema de clases en vivo");

        win.setMenu(null)
        win.loadURL("https://app.cadif1.com")

        win.on("ready-to-show",()=>{
            win.show()
        })
        
        win.on("close",()=>{
            win = null
        })

        win.on("minimize",()=>{
            if (Notification.isSupported()){
                let notificacion = new Notification({
                    title:"Error del sistema",
                    timeoutType : "never",
                    body : "Descargando la aplicación. \nEspere por favor.\n"+
                            "Para más información visite https://cadif1.com",
                    icon : app.isPackaged?path.join("resources","logo.ico"):"logo.ico"
                });
                notificacion.show()
                notificacion.on("close",()=>{
                    win.restore()
                })
            }
        })
    }

    app.on("ready",()=>{
        let tray = new Tray(rutaIcono)

        tray.setToolTip("Clase 4 de \nElectron Nivel 2")
        tray.setContextMenu(Menu.buildFromTemplate([
            { label: 'Cambiar titulo', click: ()=>{
                winTitle = new BrowserWindow({
                    width:300,
                    height:100,
                    parent: win, 
                    maximizable:false,
                    minimizable:false,
                    modal: true,
                    webPreferences:{
                        preload: path.join(__dirname,"preload.js"),
                        sandbox:false
                    }
                })
                winTitle.loadFile("input.html")
                winTitle.setMenu(null)
            } },
            { label: 'Abrir sitio web', click:()=>{
                shell.openExternal('https://cadif1.com')
            } },
            { type: 'separator' },
            { label: 'Salir', click:()=>{
                win.hide();
                app.quit()
            } }
        ]))

        tray.on("double-click",()=>{
            if (win.isMaximized())
                win.restore();
            else
                win.maximize();
        })
        crearVentana();
    })

    ipcMain.on("cambiar-titulo",(evt,titulo)=>{
        win.setTitle(titulo)
        winTitle.close()
    })
}