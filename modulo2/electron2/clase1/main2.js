const {app,BrowserWindow} = require("electron")

app.on("ready",()=>{
    setInterval(()=>{
        let w=new BrowserWindow();
        setTimeout(()=>{
            // se crea el render process al momento de cargar el html
            w.loadURL("http://google.com")
        },3000);
    },8000)
})