"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const request = require("request");
const pkg = require('./../../../package.json');
const settings = require('electron-settings');
const i18n = require('node-translate');
const decompress = require('decompress');
const decompressTargz = require('decompress-targz');
const decompressUnzip = require('decompress-unzip');
const electron = require("electron");
const electron_1 = require("electron");
const application_1 = require("../application");
class UpdateWindow {
    static createWindow() {
        let window = new electron.BrowserWindow({
            width: 800,
            height: 150,
            resizable: false,
            center: true,
            parent: electron.BrowserWindow.getFocusedWindow(),
            darkTheme: true,
            skipTaskbar: true,
            show: true,
            modal: true,
        });
        window.setMenu(null);
        window.on('closed', () => {
            window = null;
        });
        return window;
    }
    static openUpdateModal(response) {
        return new Promise((resolve, reject) => {
            let message = i18n.t('updater.new-update.default');
            let buttons = [i18n.t('updater.new-update.go-site')];
            if (!response.noemu.required) {
                buttons.push(i18n.t('updater.new-update.ignore'));
            }
            else {
                message = i18n.t('updater.new-update.required');
            }
            electron_1.dialog.showMessageBox(electron_1.BrowserWindow.getFocusedWindow(), {
                type: 'info',
                title: i18n.t('updater.new-update.title', { version: response.noemu.version }),
                message: message,
                buttons: buttons,
            }, (buttonIndex) => {
                if (buttonIndex == 0) {
                    electron_1.shell.openExternal("http://dofustouch.no-emu.com/#download");
                    electron_1.app.exit();
                }
                else {
                    resolve();
                }
            });
        });
    }
    static checkNoEmuUpdate(response) {
        return new Promise((resolve, reject) => {
            console.log(pkg.version);
            if (pkg.version == response.noemu.version) {
                console.log('No-Emu is already up to date');
                resolve(response);
            }
            else {
                switch (process.platform) {
                    case 'darwin':
                    case 'linux':
                    case 'win32':
                        this.openUpdateModal(response).then(() => {
                            resolve(response);
                        });
                        break;
                }
            }
        });
    }
    static checkGameUpdate(response) {
        return new Promise((resolve, reject) => {
            if (settings.getSync('buildVersion') == response.dofustouch.version) {
                console.log('Game is already up to date');
                resolve();
            }
            else {
                this.win = this.createWindow();
                let savePath = electron_1.app.getPath('userData') + '/' + response.dofustouch.fileName;
                console.log(savePath);
                let remoteUrl = response.dofustouch.file;
                this.win.loadURL(`file://${application_1.Application.appPath}/out/browser/index.html#/update/${encodeURIComponent(savePath)}/${encodeURIComponent(remoteUrl)}`);
                if (application_1.Application.cmdOptions.devmode) {
                    this.win.webContents.openDevTools();
                }
                electron_1.ipcMain.on('install-update', (event, arg) => {
                    console.log('ready to update');
                    decompress(savePath, electron_1.app.getPath('userData') + '/game', {
                        plugins: [
                            decompressTargz(),
                            decompressUnzip()
                        ]
                    }).then(() => {
                        console.log('Files decompressed');
                        settings.setSync('buildVersion', response.dofustouch.version);
                        resolve();
                    }).catch(reject);
                });
            }
        });
    }
    static run() {
        return new Promise((resolve, reject) => {
            this.retrieveUpdate().then((response) => {
                return this.checkNoEmuUpdate(response);
            }).then((response) => {
                return this.checkGameUpdate(response);
            }).then(() => {
                resolve();
            }).catch(reject);
        });
    }
    static retrieveUpdate() {
        return new Promise((resolve, reject) => {
            let queries = 'version=' + settings.getSync('buildVersion') + '&os=' + process.platform + '&time=' + new Date().getTime();
            let uri = `${application_1.Application.website}/update.php?${queries}`;
            request.get({
                url: uri,
                forever: true,
                gzip: true
            }, (error, response, body) => {
                console.log(body);
                if (!error && response.statusCode == 200) {
                    let parseBody = JSON.parse(body);
                    resolve(parseBody);
                }
                else {
                    if (error) {
                        reject(error);
                    }
                    else {
                        reject(body);
                    }
                }
            });
        });
    }
}
exports.UpdateWindow = UpdateWindow;

//# sourceMappingURL=update-window.js.map
