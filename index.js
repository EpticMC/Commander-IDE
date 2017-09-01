const { app, BrowserWindow } = require("electron")
const path                   = require("path")
const { shell }              = require("electron")
const os                     = require('os');
const ipc                    = require('electron').ipcMain;

require('electron-context-menu')({
    prepend: (params, browserWindow) => [{
        label: 'Rainbow',
        visible: params.mediaType === 'image'
    }]
});

function getLogoPath(){
    if (os.platform() === 'darwin')     return '/icon/icon.icns';
    else if (os.platform() === 'win32') return '/icon/icon.ico';
    else                                return '/icon/icon.png';
}

function createWindowConfig(){
    var conf = { width: 1000, heigth: 600, icon: __dirname + getLogoPath(), show: false };
    return conf;
}

ipc.on('UI-windowID', function (event) { event.returnValue = win.id; });

app.on('ready', () => {
    console.log('STARTED');
    win = new BrowserWindow({ resizable: false, width: 1000, heigth: 600, icon: __dirname + getLogoPath(), show: false });
    win.setMenu(null); 
    win.webContents.on("will-navigate", (e, url) => {
        e.preventDefault();
        win.webContents.send("navigate", url);
    });
    win.loadURL(`file://${__dirname}/index.html`);
    win.on('ready-to-show', () => { win.show(); });
    win.on('closed',        () => { app.quit(); });
});
