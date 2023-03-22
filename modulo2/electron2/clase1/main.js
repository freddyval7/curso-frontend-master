const {app,BrowserWindow,dialog, globalShortcut,Menu } = require("electron")

const template = [
    {
        label:"Imprimir",
        submenu:[
            {
                label: "Imprimir",
                click: ()=>{
                    content.print()
                }
            },
            {
                label: "Imprimir silencioso",
                click: ()=>{
                    content.print({silent:true})
                }
            },
            {
                label: "Guardar como Pdf",
                click: ()=>{
                    content.printToPDF({})
                    .then(()=>{

                    })
                }
            },
            {
                type: "separator"
            },
            {
                label: "Impresoras instaladas",
                click: ()=>{
                    content.getPrintersAsync()
                    .then((impresoras)=>{
                        console.log(impresoras)
                    })
                }
            }
        ]
        
    },   
]

let menu = Menu.buildFromTemplate(template)
let content;
let urlsValidas = ["https://www.google.com","https://cadif1.com","https://google.com"]

console.log(`el pid del main process es ${process.pid}`)

app.on("ready",()=>{
    let win = new BrowserWindow();
    
    new BrowserWindow().loadURL("http://app.cadif1.com");

    win.setMenu(menu)
    win.loadURL("http://google.com")
    content = win.webContents

    const ret = globalShortcut.register('Alt+Left', () => {
        console.log('flecha atras con alt')
        content.goBack()
    })
    content.setWindowOpenHandler((opciones)=>{
        console.log("se va abrir una ventana")
        console.log(opciones)
        return {action: 'allow'}
    })
    content.on("did-finish-load",()=>{
        console.log("se termino de cargar el contenido")
    })
    content.on("will-navigate",(event,url)=>{
        console.log("va a navegar a "+url)
        //if (!urlsValidas.includes(url))
        if (!esValidaLaUrl(url)){
            dialog.showErrorBox("Error",`La dirección ${url} esta prohibida`)
            event.preventDefault();
        }
    })
    content.on("did-navigate",(event,url)=>{
        console.log("navegando a "+url)
    })
})

function esValidaLaUrl(url){
    for (let i=0;i<urlsValidas.length;i++){
        console.log(url+" en "+urlsValidas[i])
        if (url.startsWith(urlsValidas[i])){
            console.log("coincide")
            return true;
        }
    }
    console.log("no coincide")
    return false;
}