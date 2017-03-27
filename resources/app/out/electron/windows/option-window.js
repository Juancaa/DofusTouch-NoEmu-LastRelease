"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const settings = require('electron-settings');
const electron = require('electron');
const { app, Menu, ipcMain } = electron;
const application_1 = require("../application");
class OptionWindow {
    static run() {
        if (!this.win || this.win.isDestroyed()) {
            this.win = new electron.BrowserWindow({
                width: 820,
                height: 500,
                resizable: false,
                center: true,
                parent: electron.BrowserWindow.getFocusedWindow(),
                darkTheme: true,
                skipTaskbar: true,
                show: false,
                autoHideMenuBar: true
            });
            this.win.setMenu(null);
            this.win.on('close', (event) => {
                console.log('prevent closing');
                application_1.Application.reloadSettings();
                this.win.hide();
                return event.preventDefault();
            });
            this.win.loadURL(`file://${application_1.Application.appPath}/out/browser/index.html#/option`);
            ipcMain.on('validate-option', (event, arg) => {
                this.win.close();
            });
            ipcMain.on('reset-option', (event, arg) => {
                console.log('receive->reset-option');
                settings.resetToDefaultsSync();
                this.win.webContents.send('reload-settings');
                this.win.hide();
            });
            this.win.show();
        }
        else {
            this.win.show();
            this.win.focus();
        }
    }
}
exports.OptionWindow = OptionWindow;

//# sourceMappingURL=option-window.js.map
