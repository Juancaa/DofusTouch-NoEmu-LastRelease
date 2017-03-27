"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const settings = require('electron-settings');
const electron = require('electron');
const { app, Menu, ipcMain } = electron;
const i18n = require('node-translate');
const application_1 = require("../application");
class ChangeLogWindow {
    static run() {
        if (!this.win || this.win.isDestroyed()) {
            this.win = new electron.BrowserWindow({
                width: 700,
                height: 600,
                resizable: false,
                center: true,
                parent: electron.BrowserWindow.getFocusedWindow(),
                skipTaskbar: true,
                show: false,
                autoHideMenuBar: true
            });
            this.win.loadURL(`file://${application_1.Application.appPath}/out/browser/index.html#/changelog`);
            this.win.setTitle(i18n.t('window.changelog.title'));
            this.win.setMenu(null);
            this.win.on('close', (event) => {
                this.win.hide();
                return event.preventDefault();
            });
            this.win.show();
        }
        else {
            this.win.show();
            this.win.focus();
        }
    }
}
exports.ChangeLogWindow = ChangeLogWindow;

//# sourceMappingURL=changelog-window.js.map
