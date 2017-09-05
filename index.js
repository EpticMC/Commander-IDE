const { app, BrowserWindow } = require("electron")
const path                   = require("path")
const { shell }              = require("electron")
const os                     = require("os");
const ipc                    = require("electron").ipcMain;

const debug = true;

if (debug){
    //Inspect Elements context menu
    require("electron-context-menu")({
        prepend: (params, browserWindow) => [{
            label: "Rainbow",
            visible: params.mediaType === "image"
        }]
    });
}

function getLogoPath(){
    if (os.platform() === "darwin")     return "/icon/icon.icns";
    else if (os.platform() === "win32") return "/icon/icon.ico";
    else                                return "/icon/icon.png";
}

function createWindowConfig(){
    var conf = { 
        resizable: false, 
        width: 1000, 
        heigth: 600, 
        icon: __dirname + getLogoPath(), 
        show: false 
    };
    return conf;
}

ipc.on("UI-windowID", function (event) { event.returnValue = win.id; });

app.setName("Commander IDE");

app.on("ready", () => {
    console.log(
        "    ██╗ ██████╗  ███████╗\n" +
        "    ██║ ██╔══██╗ ██╔════╝\n" +
        "    ██║ ██║  ██║ █████╗  \n" +
        "    ██║ ██║  ██║ ██╔══╝  \n" +
        "    ██║ ██████╔╝ ███████╗\n" +
        "    ╚═╝ ╚═════╝  ╚══════╝\n" +
        "    ╔═╗╔╦╗╔═╗╦═╗╔╦╗╔═╗╔╦╗\n" +
        "    ╚═╗ ║ ╠═╣╠╦╝ ║ ║╣  ║║\n" +
        "    ╚═╝ ╩ ╩ ╩╩╚═ ╩ ╚═╝═╩╝\n"
    );

    win = new BrowserWindow(createWindowConfig());
    win.setMenu(null); 
    win.loadURL(`file://${__dirname}/layouts/loader.html`);
    win.on("ready-to-show", () => { win.show(); });
    win.on("closed",        () => { app.quit(); });
});
