"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const changelog_window_1 = require("./windows/changelog-window");
const settings = require('electron-settings');
const i18n = require('node-translate');
const electron = require("electron");
const updater = require('electron-simple-updater');
const electron_1 = require("electron");
const request = require("request");
const check_settings_1 = require("./check-settings");
const default_settings_1 = require("./default.settings");
const game_window_1 = require("./windows/game-window");
const update_window_1 = require("./windows/update-window");
const prompt_password_window_1 = require("./windows/prompt-password-window");
const crypt_1 = require("../shared/crypt");
class Application {
    static init(cmdOptions) {
        this.cmdOptions = cmdOptions;
        this.appPath = electron_1.app.getAppPath();
        if (this.cmdOptions.devmode) {
            this.appPath = __dirname + '/../..';
        }
        settings.defaults(default_settings_1.DefaultSettings);
        settings.applyDefaultsSync();
        if (!check_settings_1.checkSettings()) {
        }
        if (!settings.getSync('language')) {
            let local = electron_1.app.getLocale();
            if (local.search('en') !== -1) {
                settings.setSync('language', 'en');
            }
            else if (local.search('fr') !== -1) {
                settings.setSync('language', 'fr');
            }
            else if (local.search('es') !== -1) {
                settings.setSync('language', 'es');
            }
            else {
                settings.setSync('language', 'en');
            }
        }
        i18n.requireLocales({
            'en': require(`${Application.appPath}/i18n/electron/en`),
            'fr': require(`${Application.appPath}/i18n/electron/fr`),
            'es': require(`${Application.appPath}/i18n/electron/es`)
        });
        i18n.setLocale(settings.getSync('language'));
        electron_1.ipcMain.on('read-settings', (event, args) => {
            let value = settings.getSync(args[0]);
            event.returnValue = value;
        });
        electron_1.ipcMain.on('write-settings', (event, args) => {
            event.returnValue = settings.setSync(args[0], args[1]);
        });
        return this;
    }
    static getVipStatus() {
        return new Promise((resolve, reject) => {
            if (!settings.getSync('vip_id')) {
                return resolve({ status: null, date: null });
            }
            request.get({
                url: `${this.website}/tipeee.php?vip_id=${settings.getSync('vip_id')}`,
            }, (error, response, body) => {
                if (!error && response.statusCode == 200) {
                    let bodyParse = JSON.parse(body);
                    resolve(bodyParse);
                }
                else {
                    reject(error);
                }
            });
        });
    }
    static getRemoteVersion() {
        return new Promise((resolve, reject) => {
            request.get({
                url: `${this.website}/version.json?time=${new Date().getTime()}`,
                forever: true
            }, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    let bodyParse = JSON.parse(body);
                    resolve(bodyParse);
                }
                else {
                    reject(error);
                }
            });
        });
    }
    static requestMasterPassword() {
        let promptWindow = prompt_password_window_1.PromptPassword.run();
        return new Promise((success, fail) => {
            promptWindow.on('close', () => {
                success(null);
            });
            electron_1.ipcMain.on('master-password', (event, args) => {
                if (settings.getSync("option.vip.multi_account.master_password") != crypt_1.Crypt.createHash(args[0]))
                    prompt_password_window_1.PromptPassword.displayWrongPassword(promptWindow);
                else {
                    success(args[0]);
                    promptWindow.close();
                }
            });
            electron_1.ipcMain.on('master-password-canceled', () => {
                success(null);
                promptWindow.close();
            });
        });
    }
    static run() {
        let fakeWindow = new electron.BrowserWindow({ frame: false, transparent: true });
        let masterpassword = null;
        Promise.all([
            this.getRemoteVersion(),
            this.getVipStatus(),
        ]).then(([version, vip]) => {
            console.log(vip);
            settings.setSync('appVersion', version.appVersion);
            fakeWindow.hide();
            update_window_1.UpdateWindow.run().then(() => {
                if (settings.getSync("option.vip.multi_account.active")) {
                    this.requestMasterPassword().then((_masterpassword) => {
                        if (_masterpassword) {
                            masterpassword = _masterpassword;
                            this.addMultiWindows();
                        }
                        else {
                            this.addWindow();
                        }
                        fakeWindow.close();
                    });
                }
                else {
                    this.addWindow();
                    fakeWindow.close();
                }
                if (update_window_1.UpdateWindow && update_window_1.UpdateWindow.win && !update_window_1.UpdateWindow.win.isDestroyed()) {
                    update_window_1.UpdateWindow.win.close();
                }
                if (Application.cmdOptions.changelog) {
                    changelog_window_1.ChangeLogWindow.run();
                }
            }).catch((raison) => {
                console.log('run update error');
                electron_1.dialog.showMessageBox(electron_1.BrowserWindow.getFocusedWindow(), {
                    type: 'error',
                    title: 'Error',
                    message: raison.toString(),
                    buttons: ['Fermer']
                }, () => {
                    electron_1.app.exit();
                });
            });
            electron_1.ipcMain.on('load-config', (event, arg) => {
                event.returnValue = {
                    gamePath: electron_1.app.getPath('userData') + '/game',
                    appPath: Application.appPath,
                    buildVersion: version.buildVersion,
                    appVersion: version.appVersion,
                    platform: process.platform,
                    language: settings.getSync('language'),
                    vipStatus: vip.status,
                    vipDate: vip.date,
                    masterpassword: masterpassword,
                    website: this.website
                };
            });
            electron_1.ipcMain.on('auto-group-reset-counter', (event, arg) => {
                console.log('receive -> auto-group-reset-counter');
                this.gameWindows.forEach((gWindow, index) => {
                    console.log('send -> auto-group-reset-counter to gWindow ' + index);
                    gWindow.win.webContents.send('auto-group-reset-counter');
                });
            });
        }).catch((raison) => {
            fakeWindow.close();
            electron_1.dialog.showMessageBox(electron_1.BrowserWindow.getFocusedWindow(), {
                type: 'error',
                title: 'Error',
                message: raison.toString(),
                buttons: ['Fermer']
            }, () => {
                electron_1.app.exit();
            });
        });
    }
    static reloadSettings() {
        this.gameWindows.forEach((gWindow) => {
            if (!settings.getSync('language')) {
                let local = electron_1.app.getLocale();
                if (local.search('en') !== -1) {
                    settings.setSync('language', 'en');
                }
                else if (local.search('fr') !== -1) {
                    settings.setSync('language', 'fr');
                }
                else if (local.search('es') !== -1) {
                    settings.setSync('language', 'es');
                }
                else {
                    settings.setSync('language', 'en');
                }
            }
            i18n.setLocale(settings.getSync('language'));
            gWindow.reloadSettings();
        });
    }
    static addWindow() {
        let gWindow = new game_window_1.GameWindow(this);
        gWindow.run();
        gWindow.closed((e) => {
            delete this.gameWindows[this.gameWindows.indexOf(e)];
        });
        this.gameWindows.push(gWindow);
    }
    static addMultiWindows() {
        let windows = settings.getSync("option.vip.multi_account.windows");
        let windowsCount = 0;
        electron_1.ipcMain.on('window-ready', (event, arg) => {
            windowsCount += 1;
            if (windowsCount == windows.length)
                for (let i in windows)
                    this.gameWindows[i].win.webContents.send('accounts', windows[i]);
        });
        for (let i in windows) {
            this.addWindow();
        }
    }
}
Application.website = "http://api.no-emu.com";
Application.gameWindows = [];
exports.Application = Application;

//# sourceMappingURL=application.js.map
