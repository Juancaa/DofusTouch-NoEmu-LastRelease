"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electronLocalshortcut = require('electron-localshortcut');
const settings = require('electron-settings');
const { app } = require('electron');
const async = require('async');
const isAccelerator = require("electron-is-accelerator");
class ShortCuts {
    constructor(win) {
        this.win = win;
        this.isBinded = false;
    }
    bindAll() {
        async.forEachOf(settings.getSync('option.shortcuts.no_emu.tabs'), (shortcut, index) => {
            if (shortcut) {
                electronLocalshortcut.register(this.win, ShortCuts.convert(shortcut), () => {
                    this.win.webContents.send('switch-tab', index);
                });
            }
        });
    }
    reload() {
        electronLocalshortcut.unregisterAll(this.win);
        this.bindAll();
        console.log('emit->reload-shortcuts');
        this.win.webContents.send('reload-shortcuts');
    }
    enable() {
        if (!this.isBinded) {
            this.bindAll();
        }
        else {
            electronLocalshortcut.enableAll(this.win);
        }
    }
    disable() {
        electronLocalshortcut.disableAll(this.win);
    }
    static convert(shortcut) {
        shortcut = shortcut.replace('ctrl', 'CmdOrCtrl');
        return shortcut;
    }
}
exports.ShortCuts = ShortCuts;

//# sourceMappingURL=shortcuts.js.map
