const {clipboard,contextBridge} = require("electron")

window.addEventListener("DOMContentLoaded",()=>{
    console.log(process.pid)
})

contextBridge.exposeInMainWorld(
    'bridge', {
        portaPapeles:clipboard
    }
)