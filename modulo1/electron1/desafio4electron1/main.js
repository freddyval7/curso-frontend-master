const { app , BrowserWindow, Menu } = require("electron");
const { menuPlant } = require("./menu.js")

const menu = Menu.buildFromTemplate(menuPlant);

app.on("ready", () => {
    Menu.setApplicationMenu(null);

    const win = new BrowserWindow();
    win.setMenu(menu);
})