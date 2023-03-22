const {app,BrowserWindow,dialog,ipcMain} = require("electron");
const path = require("path");
const fs = require("fs");

let win1;
let win2;
let win3;
let rutaFoto;
const rutaJSON = path.join(__dirname,"usuarios.json")

fs.readFile(rutaJSON,"utf-8",(err,data)=>{
    try {
        usuarios = JSON.parse(data);
        console.log(usuarios);
    } catch (error) {
        console.log("Error!:" + err)
    }
})

app.on("ready",()=>{
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

    ipcMain.on("msg-iniciar-sesion",(e,obj)=>{
        console.log("inicio sesion")
        console.log(obj)
        console.log(usuarios)
        if (existeUser(obj.username,obj.pass)){
            e.returnValue=false
            win1.hide();
            win2.show();
            //Se envía la ruta de la foto para mostrarla en la ventana de bienvenida (win2)
            win2.webContents.send("foto",{
                user: obj.username,
                foto: `./usuarios/img-${obj.username}.png`
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
        fs.copyFile(user.foto, `./usuarios/img-${user.user}.png`, (error)=>{
            console.log(error)
            if (error) throw error;
                console.log('foto copiada');
        })
        user.foto = `./usuarios/img-${user.user}.png`;
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

    ipcMain.on("msg-cerrar-sesion",()=>{
        win2.hide();
        win1.show();
    })

    //Se quita el app al cerrar cualquier ventana, porque al cerrar alguna las otras quedaban como hide
    let windows = BrowserWindow.getAllWindows()
    windows.forEach(win => win.on("close",()=>{
        app.quit();
    }))

})

function existeUser(username,pass){
    for(let i = 0; i<usuarios.length; i++){
        if(usuarios[i].user == username && usuarios[i].password == pass)
            return true;
    }
    return false;
}

