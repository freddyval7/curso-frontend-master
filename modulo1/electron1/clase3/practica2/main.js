const {dialog,app,BrowserWindow} = require("electron")

app.on("ready",()=>{
    let main = new BrowserWindow({
        title: "prueba del constructor de Browser Window",
        width: 500,
        height:600,
        x: 0, 
        show: false,
        y:0,
        resizable:true,
        maximizable :true,
        minimizable: false,
        alwaysOnTop :true,
        icon: "html.ico",
    })
    
    main.on("ready-to-show",()=>{
        main.show()
    })

    main.loadURL("http://cadif1.com")
    .then(()=>{
        console.log("en el then")

        main.on("will-move",()=>{
            main.setOpacity(0.5)
        })
        main.on("moved",()=>{
            main.setOpacity(1)
        })
    })
    .catch(()=>{
        dialog.showMessageBoxSync(null,{
            message : "No se pudo cargar la pagina ...",
            type: "error"
        });
        app.exit();
    })

    
})