const {dialog, app, BrowserWindow} = require ("electron");

//dialog.showErrorBox("Error de inicio","Ha ocurrido un error al leer el archivo config.json")
//app.exit();
let ventana;

app.on("ready",()=>{

    let resp = dialog.showMessageBoxSync(null,{
        message :"¿Cual página desea abrir ?",
        type: "question",
        title : "Confirmación",
        buttons:["Cadif1.com","Google.com","Index.html"],
        noLink :true
    });

    switch(resp){
        case 0: abrirVentanaCadif1();
        break;
        case 1: new BrowserWindow().loadURL("http://google.com");
        break;
        case 2: let vent2 = new BrowserWindow()
                vent2.loadFile("index.html")
                vent2.on("ready-to-show",()=>{
                    console.log("esta listo el contenido de index.html")
                }) 
        break
    }

    /*setTimeout(()=>{
        ventana.maximize();
    },3000)*/

    /*setTimeout(()=>{
        let ventanas = BrowserWindow.getAllWindows()
        ventanas.forEach(w => {
            w.minimize()
        }); 
        /*console.log(ventanas)
        for(i=0;i<ventanas.length;i++)
            ventanas[i].minimize();
    },6000)*/

    /*setTimeout(()=>{
        app.quit();
    },9000)*/

    
    //vent2.maximize();
    
})

app.on("before-quit",()=>{
    console.log("antes de cerrarse")
})

function abrirVentanaCadif1(){
    ventana = new BrowserWindow();

    ventana.loadURL("http://cadif1.com")
    ventana.on("ready-to-show",()=>{
        console.log("esta listo el contenido de cadif1.com")
        dialog.showMessageBox(null,{
            message :"Ha abierto una página desconocida....",
            type: "warning",
            title : "Advertencia",
            buttons:["Si","No","Tal vez"],
            noLink :true
        }).then((resp)=>{
            console.log(resp.response)
        })
    })

    ventana.on("focus",()=>{
        console.log("la ventana cadif1.com gano el foco")
    })
    

    ventana.on("close",(event)=>{
        console.log("se va a cerrar la ventana")
        if (dialog.showMessageBoxSync(ventana,{
            message :"¿Esta seguro que desea salir de la ventana?",
            type: "question",
            title : "Confirmación",
            buttons:["Si","No"],
            noLink :true
        }) == 1)
            event.preventDefault();

        /*setTimeout(()=>{
            ventana.show()
        },3000)*/
        
    })

    ventana.on("minimize",()=>{
        console.log("se minimizo la ventana")
    })
}