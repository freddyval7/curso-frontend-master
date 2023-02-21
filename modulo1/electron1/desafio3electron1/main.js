const { app, BrowserWindow, dialog } = require("electron")
let tiempo = 30

app.on("ready", () => {
    var window2 = new BrowserWindow({
        x: Math.floor(Math.random() * 801),
        y: Math.floor(Math.random() * 101),
        show: false,
    })
    const window = new BrowserWindow({
        show: false,
    })
    
    window.loadURL("https://store.steampowered.com/?l=spanish")
    window.once("ready-to-show", () => {
        setTimeout(() => {
            window.show()
            var id = setInterval(() => {
                --tiempo
                window.setTitle(tiempo.toString())
                if (tiempo === 15) {
                    maximizarVentanaYVentanaAleat(window, window2)
                }
                if (tiempo === 0) {
                    clearInterval(id)
                    mostrarMensajeFinal(window, window2)
                }
            }, 1000);

        }, 2000);
    })
})

const maximizarVentanaYVentanaAleat = (window, window2) => {
    window.maximize()
    if(window.isMaximized()){
        const resp = dialog.showMessageBoxSync(window, {
            message: "Desea abrir una ventana nueva?",
            type: "question",
            buttons: ["Si", "No"],
            noLink: true
        })
    
        switch (resp) {
            case 0: abrirVentanaAleatoria(window2)
                break;
            case 1:
                break;
        }
    }
}

const abrirVentanaAleatoria = (window) => {
    window.show()
}

const mostrarMensajeFinal = (window, window2) => {
    const resp = dialog.showMessageBoxSync(window, {
        message: "Se acabó el tiempo",
        type: "warning",
        buttons: ["Cerrar"],
        noLink: true
    })

    if(resp === 0){
        window2.close()
        window2.once("closed", () => {
            setTimeout(() => {
                window.close()
            }, 500);
            // Coloco el setTimeout para que se note que se cierra luego de la segunda ventana
        })
    }
}