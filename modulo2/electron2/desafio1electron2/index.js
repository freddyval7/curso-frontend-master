const { app, BrowserWindow, Menu, dialog, globalShortcut } = require("electron");

process.env['ELECTRON_DISABLE_SECURITY_WARNINGS']=true;

const menuTemplate = [
    {
        label: "Mostrar impresora por defecto",
        click: () => {
            content.getPrintersAsync()
                .then((impresoras) => {
                    if (impresoras.length === 0) {
                        dialog.showErrorBox("Error", "No se encontraron impresoras instaladas!")
                    }
                    impresoras.forEach(impresora => {
                        if (impresora.isDefault === true) {
                            console.log("la impresora por defecto: " + impresora.name)
                            dialog.showMessageBox(window, {
                                message: `La impresora por defecto es ${impresora.name}`,
                                type: "info",
                                noLink: true
                            })
                        } else
                            return false
                    });
                })
        }
    },
    {
        label: "Imprimir",
        click: () => {
            content.print({
                silent: true,
                landscape: true,
                copies: 3
            })
        }
    }
]

const menu = Menu.buildFromTemplate(menuTemplate);

app.on("ready", () => {
    window = new BrowserWindow({
        webPreferences: {
            devTools: true,
            contextIsolation: false,
            nodeIntegration: true
        }
    })
    window.loadURL("https://store.steampowered.com/?l=spanish");
    window.setMenu(menu);
    content = window.webContents;

    let window2 = new BrowserWindow({
        webPreferences:{
            sandbox: false,
            preload: __dirname+"\\preload.js",
            devTools :true,
        }
    })
    window2.loadFile("index.html");

    globalShortcut.register('Alt+F12', () => {
        const windows = BrowserWindow.getAllWindows();
        windows.forEach(window => {
            if(window.isDevToolsOpened() === false){
                window.webContents.openDevTools();
            }
            else
                window.webContents.closeDevTools();
        })
    })
})

