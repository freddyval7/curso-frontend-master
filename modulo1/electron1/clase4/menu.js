const {dialog,shell,BrowserWindow} = require("electron")
let x;
let registrar = null;

module.exports.plantillaMenu = [
    {
        label: "Archivo",
        submenu:
            [
                {
                    label: "Abrir",
                    icon: "../html_small.png"
                },
                {
                    label: "Guardar"
                },
                {
                    label: "Guardar como"
                },
                {
                    type: "separator"
                },
                {
                    label: "Salir",
                    role :"quit"
                }
            ]
    },
    {
        label: "Registrar",
        submenu : [
            {
                label: "Clientes",
                click: clickRegistrar
            }
        ]
    },
    {
        label: "Depurar",
        role: "toggleDevTools"
    },
    {
        label: "Pantalla completa",
        submenu:[
            {
                label: "Sólo esta ventana",
                type : "checkbox", 
                accelerator: "F11",
                click:function(event, ventana){
                    let fs = ventana.isFullScreen();
                    ventana.setFullScreen(!fs)

                    event.checked = !fs;
                }
            }  
        ]
    },
    {
        label: "Cerrar",
        submenu :[
            {
                label: "Sólo esta ventana",
                role: "close",
                enabled:false,
                id:"mnuCerrarSoloEstaVentana"
            },
            {
                label: "Esconder esta ventana",
                role: "hide"
            },
            {
                label: "Cerrar la aplicación",
                role: "quit"
            },
            {
                type: "separator"
            },
            {
                label: "Calculadora",
                click:()=>{
                    shell.openExternal('C:\\Windows\\System32\\calc.exe')
                    .catch((error)=>{
                        dialog.showErrorBox("Error","No se encuentra el archivo")
                    })
                    
                }
            },
            {
                label: "Ayuda",
                click: ()=>{
                    shell.openExternal('https://cadif1.com/help')
                    
                }
            }
        ]
    }
]

function clickRegistrar(event,ventana){
    let bordes = ventana.getBounds()
    if (registrar==null){
        registrar = new BrowserWindow({
            parent: ventana,
            modal:true,
            x:bordes.x+50,
            y:bordes.y+50,
            minimizable :false,
            maximizable :false,
            width:Math.round(bordes.width*0.80),
            height: Math.round(bordes.height*0.80),
            title: "Registro de clientes",
            icon: "../html.ico"
        });
        registrar.loadFile("registro.html")
        console.log(registrar.id)

        registrar.on("close",()=>{
            registrar = null;
        })
    }else
        registrar.show()
}
