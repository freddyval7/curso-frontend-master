const {app,BrowserWindow,dialog,ipcMain} = require("electron");
const path = require("path");

let usuarios = [
    {
        username: "freddy",
        pass: 123
    },
    {
        username: "pedro",
        pass: 1234
    }
];
let win1;
let win2;

app.on("ready",()=>{
    win1 = new BrowserWindow({
        width:500,
        height:300,
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
            // preload: path.join(__dirname,"preload-index.js")
            preload: path.join(__dirname,"preload-principal.js")
        }
    });
    win2.loadFile("principal.html");

    ipcMain.on("msg-iniciar-sesion",(e,obj)=>{
        console.log(obj)
        console.log(usuarios)
        if (existeUser(obj.username,obj.pass)){
            e.returnValue=false
            win1.hide();
            win2.show();
        }
        else{
            console.log(usuarios)
            e.returnValue=true
        }     
    })

    ipcMain.on("msg-cerrar-sesion",()=>{
        win2.hide();
        win1.show();
    })
})


function existeUser(username,pass){
    for(let i = 0; i<usuarios.length; i++){
        if(usuarios[i].username == username && usuarios[i].pass == pass)
            return true;
    }
    return false;
}

