const {app,BrowserWindow,Menu} = require("electron")
const {plantillaMenu} = require("./menu.js")

let menu = Menu.buildFromTemplate(plantillaMenu)

app.on("ready",()=>{
    
    Menu.setApplicationMenu(null);
    let main = new BrowserWindow({
        show:false
    });
    main.loadURL("http://cadif1.com");
    main.setMenu(menu)
    main.on("ready-to-show",()=>{
        main.show()
        let item = menu.getMenuItemById("menuCerrarSoloEstaVentana");
        setTimeout(() => {
            item.enabled = true;
        }, 10000);
    })

    let otraVent = new BrowserWindow();
    otraVent.loadURL("http://youtube.com");
    otraVent.setMenu(null)
}) 