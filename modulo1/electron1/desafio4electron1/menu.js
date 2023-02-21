const {app,dialog,Menu,BrowserWindow} = require("electron")
let ventanas = null
//Se crea el arreglo para almacenar los títulos de las ventanas abiertas
let titles = []

module.exports.menuPlant = [
    {
        label: "Alumnos",
        submenu: [
            {
                label: "Listado",
                click: abrirNuevaVent
            },
            {
                label: "Nuevo",
                click: abrirNuevaVent
            },
            {
                label: "Buscar",
                click: abrirNuevaVent
            }
        ]
    },
    {
        label: "Secciones",
        submenu: [
            {
                label: "Abrir Seccion",
                click: abrirNuevaVent
            },
            {
                label: "Inscribir Alumno",
                click: abrirNuevaVent
            },
            {
                label: "Imprimir Facturas",
                click: abrirNuevaVent
            }
        ]
    },
    {
        label: "Sistema",
        submenu: [
            {
                label: "Ayuda",
                role: "help" //fue el único rol que encontré para Ayuda, aunque no entiendo muy bien su función...
            },
            {
                label: "Acerca de",
                role: "about"
            },
            {
                label: "DevTools",
                role: "toggleDevTools"
            },
            {
                type: "separator"
            },
            {
                label: "Salir",
                role: "quit"
            }
        ]
    }
]

function abrirNuevaVent(event,window){
    let bordes = window.getBounds()
    //Si el título no está incluido en el arreglo significará que no se ha instanciado aún
    if(!titles.includes(event.label) || ventanas === null ){
        //Se guarda la ventana en el arreglo usando su título
        titles.push(event.label)
        ventanas = new BrowserWindow({
            title: `${event.label}`,
            x: bordes.x + 100,
            y: bordes.y + 50,
            width: Math.round(bordes.width*0.80),
            heigth: Math.round(bordes.heigth*0.80)
        });
        ventanas.on("close",()=>{
            //Al cerrar la ventana se resetea la variable ventanas y se elimina el título del arreglo
            ventanas = null
            titles = titles.filter(title => title != event.label)
        })
    } else
        ventanas.show();
}
