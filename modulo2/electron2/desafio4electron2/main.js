const {app,BrowserWindow,dialog,ipcMain,Tray,shell,Menu,Notification} = require("electron");
const path = require("path");
const fs = require("fs");

const formatearFecha = () => {
    const fechaNueva = new Date();

    const opciones = {
        year: "numeric",
        month: "long",
        day: "2-digit"
    }

    return fechaNueva.toLocaleDateString("es-ES", opciones)
}

let win1;
let win2;
let win3;
let win4;
let rutaIcono;
let rutaImagen;
let id;
const rutaJSON = path.join(__dirname,"usuarios.json");
let tray;
let fecha = formatearFecha();
let tiempoIni;
let usuarios;

const menu1 = [
    {
        label: "Salir",
        role: "quit"
    },
    {
        type:"separator"
    },
    {
        label: "Ayuda",
        click:()=>{
            shell.openExternal("https://support.microsoft.com/es-es");
        }
    }
]

const menu2 = [
    {
        label: "Cerrar Sesión",
        click:()=>{
            win2.hide();
            win1.show();
            tray.setContextMenu(Menu.buildFromTemplate(menu1));
            showNotiFin(tiempoIni);
        }
    },
    {
        type:"separator"
    },
    {
        label: "Cambiar Clave",
        click:()=>{
            win4.show();
        }
    },
    {
        label: "Cambiar Foto",
        click:()=>{
            dialog.showOpenDialog(win2,{
                title: "Seleccione una foto para el usuario",
                filters:[{
                    name: "PNG,JPG,webp",
                    extensions: ["png","jpg","webp"]
                }]
            })
            .then(result => {
                if(!result.canceled){
                    fs.copyFile(result.filePaths[0], `./usuarios/user-${id}.png`, (error)=>{
                        console.log(error)
                        if (error) throw error
                            console.log('foto copiada');
                    })
                    win2.webContents.send("nuevaFoto",{
                        foto: result.filePaths[0]
                    })
                }
            }).catch(err => {
                console.log(err)
            })
        }
    }
]

if (app.isPackaged){
    rutaIcono = path.join("./resources","icono.ico");
}
else{
    rutaIcono = "icono.ico";
}

fs.readFile(rutaJSON,"utf-8",(err,data)=>{
    try {
        usuarios = JSON.parse(data);
        console.log(usuarios);
    } catch (error) {
        console.log("Error!:" + err);
    }
})

app.on("ready",()=>{
    Menu.setApplicationMenu(null);
    tray = new Tray(rutaIcono);
    tray.setToolTip("User App");
    tray.setContextMenu(Menu.buildFromTemplate(menu1));

    win1 = new BrowserWindow({
        width:700,
        height:500,
        webPreferences:{
            sandbox:false,
            preload: path.join(__dirname,"preload-index.js")
        }
    });
    win1.loadFile("index.html");

    win2 = new BrowserWindow({
        show:false,
        webPreferences:{
            sandbox:false,
            preload: path.join(__dirname,"preload-principal.js")
        }
    });
    win2.loadFile("principal.html");

    win3 = new BrowserWindow({
        width:700,
        height:500,
        show:false,
        webPreferences:{
            sandbox:false,
            preload: path.join(__dirname,"preload-registrar.js")
        }
    });
    win3.loadFile("registrar.html");

    win4 = new BrowserWindow({
        width:300,
        height:300,
        show:false,
        parent: win2, 
        maximizable:false,
        minimizable:false,
        modal: true,
        webPreferences:{
            sandbox:false,
            preload: path.join(__dirname,"preload-clave.js")
        }
    });
    win4.loadFile("clave.html");

    ipcMain.on("msg-iniciar-sesion",(e,obj)=>{
        tiempoIni = Date.now();
        console.log("inicio sesion")
        console.log(obj)
        let currentUser = usuarios.filter(user => user.user === obj.username)
        currentUser = currentUser[0];
        console.log(currentUser)
        if (existeUser(obj.username,obj.pass)){
            id = currentUser.id;
            console.log("Existe user con id: " + id)
            e.returnValue=false
            win1.hide();
            win2.show();
            //Se cambia el menú del Tray para la sesión iniciada
            tray.setContextMenu(Menu.buildFromTemplate(menu2));
            //Se muestra una notificación con el usuario y la fecha
            console.log("Fecha actual: " + fecha)
            showNotiIni(obj.username,fecha);

            //Se envía la ruta de la foto para mostrarla en la ventana de bienvenida (win2)
            win2.webContents.send("foto",{
                user: obj.username,
                foto: `./usuarios/user-${id}.png`
            })
            win4.webContents.send("password",{
                password: obj.pass
            })
        }
        else{
            console.log(usuarios)
            e.returnValue=true
        }     
    })

    ipcMain.on("abrir-registro",()=>{
        win1.hide();
        win3.show();
    })

    ipcMain.on("abrir-inicio",()=>{
        win3.hide();
        win1.show();
    })

    ipcMain.handle("buscar-foto",()=>{
        console.log("busca foto en main")
        return dialog.showOpenDialog(win3,{
            title: "Seleccione una foto para el usuario",
            filters:[{
                name: "PNG,JPG,webp",
                extensions: ["png","jpg","webp"]
            }]
        })
    })

    ipcMain.on("guardar-usuario",(e,user)=>{
        console.log(path.join(__dirname,"./usuarios"))
        console.log("guardar en main");
        console.log(user.foto);
        fs.copyFile(user.foto, `./usuarios/user-${user.id}.png`, (error)=>{
            console.log(error)
            if (error) throw error;
                console.log('foto copiada');
        })
        user.foto = `./usuarios/user-${user.id}.png`;
        usuarios.push(user);
        fs.writeFile(rutaJSON,JSON.stringify(usuarios),err=>{
            if(err == null){
                console.log("registrado con exito");
            } else{
                console.log("error al registrar, " + err);
            }

            e.reply("respuesta");
        })
    })

    ipcMain.on("cambiar-clave",(e,clave)=>{
        console.log(id)
        usuarios[id-1].password = clave;
        fs.writeFile(rutaJSON,JSON.stringify(usuarios),err=>{
            if(err == null){
                console.log("cambiado con exito");
            } else{
                console.log("error al cambiar, " + err);
            }

            e.reply("respuesta");
        })
    })

    ipcMain.on("msg-cerrar-sesion",()=>{
        win2.hide();
        win1.show();
        tray.setContextMenu(Menu.buildFromTemplate(menu2));
    })

    //Se quita el app al cerrar cualquier ventana, porque al cerrar alguna las otras quedaban como hide
    // let windows = BrowserWindow.getAllWindows()
    // windows.forEach(win => win.on("close",()=>{
    //     win1.close();
    //     win2.close();
    //     win3.close();
    // }))

})

function showNotiIni(username,fecha){
    if(Notification.isSupported()){
        let notificacion = new Notification({
            title:"Sesión Iniciada",
            body : `Bienvenido, ${username}\nSesión iniciada el: ${fecha}`,
            icon : app.isPackaged?path.join("./resources","icono.ico"):"icono.ico"
        });
        notificacion.show()
    } else
        console.log("Notificaciones no soportadas");
}

function showNotiFin(tiempoIni){
    let tiempoFin = Date.now() - tiempoIni;
    tiempoFin = miliASegundYMin(tiempoFin);
    console.log(tiempoFin)

    if(Notification.isSupported()){
        let notificacion = new Notification({
            title:"Sesión Finalizada",
            body : `Duración de la sesión: ${tiempoFin}`,
            icon : app.isPackaged?path.join("./resources","icono.ico"):"icono.ico"
        });
        notificacion.show()
    } else
        console.log("Notificaciones no soportadas");
}

const miliASegundYMin = (milisegundos) => {
    const minutos = Math.floor(milisegundos / 1000 / 60);
    milisegundos -= minutos * 60 * 1000;
    const segundos = Math.floor(milisegundos / 1000);
    return `${minutos} Minutos con ${segundos} segundos`;
  };

function existeUser(username,pass){
    for(let i = 0; i<usuarios.length; i++){
        if(usuarios[i].user == username && usuarios[i].password == pass)
            return true;
    }
    return false;
}



