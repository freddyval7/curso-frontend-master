const {clipboard,contextBridge} = require("electron")

window.addEventListener('DOMContentLoaded', () => {
    console.log("preload running " + process.pid);
    console.log( __dirname);
    document.getElementById("input").value= __dirname;
});

contextBridge.exposeInMainWorld(
    'bridge', {
        portapapeles: clipboard
    }
)