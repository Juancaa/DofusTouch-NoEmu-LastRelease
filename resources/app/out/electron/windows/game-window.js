"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const settings = require('electron-settings');
const electron = require('electron');
const { app, Menu, ipcMain } = electron;
const shortcuts_1 = require("../shortcuts");
const game_menu_template_1 = require("./game-menu.template");
const application_1 = require("../application");
class GameWindow {
    constructor(application) {
        this.devMode = false;
        this.application = application;
        this.devMode = settings.getSync('option.general.developer-mode');
        this.win = new electron.BrowserWindow({
            width: parseInt(settings.getSync('option.general.resolution').x),
            height: parseInt(settings.getSync('option.general.resolution').y),
            useContentSize: true,
            center: true,
            webPreferences: {
                backgroundThrottling: false,
                allowDisplayingInsecureContent: true,
                allowRunningInsecureContent: true,
                webSecurity: false
            }
        });
        this.shortCuts = new shortcuts_1.ShortCuts(this.win);
        this.menu = Menu.buildFromTemplate(game_menu_template_1.GameMenuTemplate.build());
    }
    reloadSettings() {
        console.log('emit->reload-settings');
        this.win.webContents.send('reload-settings');
        ipcMain.once('reload-settings-done', () => {
            console.log('receive->reload-settings-done');
            this.shortCuts.reload();
            this.win.webContents.send('reload-settings-done');
        });
        this.menu = Menu.buildFromTemplate(game_menu_template_1.GameMenuTemplate.build());
        Menu.setApplicationMenu(this.menu);
    }
    run() {
        this.win.loadURL(`file://${application_1.Application.appPath}/out/browser/index.html`, { userAgent: '' });
        Menu.setApplicationMenu(this.menu);
        this.shortCuts.enable();
        if (this.devMode) {
            this.win.webContents.openDevTools();
        }
    }
    closed(cb) {
        this.win.on('closed', () => {
            this.win = null;
            cb(this);
        });
    }
}
exports.GameWindow = GameWindow;

//# sourceMappingURL=game-window.js.map
