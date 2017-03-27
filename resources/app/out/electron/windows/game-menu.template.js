"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const settings = require('electron-settings');
const i18n = require('node-translate');
const shortcuts_1 = require("../shortcuts");
const application_1 = require("../application");
const option_window_1 = require("./option-window");
const changelog_window_1 = require("./changelog-window");
class GameMenuTemplate {
    static build() {
        const template = [
            {
                label: i18n.t('game-menu.file.title'),
                submenu: [
                    {
                        label: i18n.t('game-menu.file.new-window'),
                        accelerator: shortcuts_1.ShortCuts.convert(settings.getSync('option.shortcuts.no_emu.new_window')),
                        click(item, focusedWindow) {
                            application_1.Application.addWindow();
                        }
                    },
                    {
                        label: i18n.t('game-menu.file.new-tab'),
                        accelerator: shortcuts_1.ShortCuts.convert(settings.getSync('option.shortcuts.no_emu.new_tab')),
                        click(item, focusedWindow) {
                            focusedWindow.webContents.send('new-tab', {});
                        }
                    },
                    {
                        type: 'separator'
                    },
                    {
                        label: i18n.t('game-menu.file.close-tab'),
                        accelerator: 'CmdOrCtrl+W',
                        click(item, focusedWindow) {
                            focusedWindow.webContents.send('close-tab', {});
                        }
                    },
                    {
                        label: i18n.t('game-menu.file.close-window'),
                        accelerator: 'Shift+CmdOrCtrl+W',
                        click(item, focusedWindow) {
                            focusedWindow.close();
                        }
                    }
                ]
            },
            {
                label: i18n.t('game-menu.edit.title'),
                submenu: [
                    {
                        label: i18n.t('game-menu.edit.undo'),
                        role: 'undo'
                    },
                    {
                        label: i18n.t('game-menu.edit.redo'),
                        role: 'redo'
                    },
                    {
                        type: 'separator'
                    },
                    {
                        label: i18n.t('game-menu.edit.cut'),
                        role: 'cut'
                    },
                    {
                        label: i18n.t('game-menu.edit.copy'),
                        role: 'copy'
                    },
                    {
                        label: i18n.t('game-menu.edit.paste'),
                        role: 'paste'
                    },
                    {
                        label: i18n.t('game-menu.edit.selectall'),
                        role: 'selectall'
                    }
                ]
            },
            {
                label: i18n.t('game-menu.window.title'),
                submenu: [
                    {
                        label: i18n.t('game-menu.window.reload'),
                        accelerator: 'CmdOrCtrl+R',
                        click(item, focusedWindow) {
                            if (focusedWindow)
                                focusedWindow.reload();
                        }
                    },
                    {
                        type: 'separator'
                    },
                    {
                        label: i18n.t('game-menu.window.prev-tab'),
                        accelerator: shortcuts_1.ShortCuts.convert(settings.getSync('option.shortcuts.no_emu.prev_tab')),
                        click(item, focusedWindow) {
                            focusedWindow.webContents.send('switch-tab', 'prev');
                        }
                    },
                    {
                        label: i18n.t('game-menu.window.next-tab'),
                        accelerator: shortcuts_1.ShortCuts.convert(settings.getSync('option.shortcuts.no_emu.next_tab')),
                        click(item, focusedWindow) {
                            focusedWindow.webContents.send('switch-tab', 'next');
                        }
                    },
                    {
                        type: 'separator'
                    },
                    {
                        'label': i18n.t('game-menu.window.disable-sound'),
                        'type': "checkbox",
                        click(item, focusedWindow) {
                            focusedWindow.webContents.setAudioMuted(item.checked);
                        }
                    },
                    {
                        label: i18n.t('game-menu.window.zoomin'),
                        role: 'zoomin'
                    },
                    {
                        label: i18n.t('game-menu.window.zoomout'),
                        role: 'zoomout'
                    },
                    {
                        label: i18n.t('game-menu.window.resetzoom'),
                        role: 'resetzoom'
                    },
                    {
                        type: 'separator'
                    },
                    {
                        label: i18n.t('game-menu.window.full-screen'),
                        role: 'togglefullscreen'
                    }
                ]
            },
            {
                label: i18n.t('game-menu.settings.title'),
                submenu: [
                    {
                        label: i18n.t('game-menu.settings.option'),
                        click(item, focusedWindow) {
                            option_window_1.OptionWindow.run();
                        }
                    },
                    {
                        label: i18n.t('game-menu.settings.redownload-file-game'),
                        click(item, focusedWindow) {
                            settings.setSync('appVersion', null);
                            settings.setSync('buildVersion', null);
                            electron_1.app.relaunch();
                            electron_1.app.quit();
                        }
                    },
                ]
            },
            {
                label: i18n.t('game-menu.social.title'),
                submenu: [
                    {
                        label: i18n.t('game-menu.social.news'),
                        click(item, focusedWindow) {
                            focusedWindow.webContents.send('open-news');
                        }
                    },
                    {
                        label: i18n.t('game-menu.social.forum'),
                        click() {
                            require('electron').shell.openExternal('http://forum.no-emu.com');
                        }
                    },
                    {
                        label: i18n.t('game-menu.social.support'),
                        click() {
                            require('electron').shell.openExternal('https://www.tipeee.com/dtne');
                        }
                    },
                    {
                        label: i18n.t('game-menu.social.voice'),
                        click() {
                            require('electron').shell.openExternal('https://discordapp.com/invite/rCawwmD');
                        }
                    },
                ]
            },
            {
                label: i18n.t('game-menu.help.title'),
                submenu: [
                    {
                        label: i18n.t('game-menu.help.faq'),
                        click() {
                            require('electron').shell.openExternal('http://dofustouch.no-emu.com/#faq');
                        }
                    },
                    {
                        label: i18n.t('game-menu.help.need-help'),
                        click() {
                            require('electron').shell.openExternal('https://discord.gg/w2X58CX');
                        }
                    },
                    {
                        label: i18n.t('game-menu.help.bug-report'),
                        click() {
                            require('electron').shell.openExternal('http://forum.no-emu.com/viewforum.php?f=4');
                        }
                    },
                    {
                        label: i18n.t('game-menu.help.bug-resolve'),
                        click() {
                            require('electron').shell.openExternal('http://forum.no-emu.com/viewforum.php?f=6');
                        }
                    }
                ]
            },
            {
                label: i18n.t('game-menu.infos.title'),
                submenu: [
                    {
                        label: i18n.t('game-menu.infos.changelog'),
                        click(item, focusedWindow) {
                            changelog_window_1.ChangeLogWindow.run();
                        }
                    },
                    {
                        label: i18n.t('game-menu.infos.console'),
                        accelerator: process.platform === 'darwin' ? 'Alt+Command+I' : 'Ctrl+Shift+I',
                        click(item, focusedWindow) {
                            if (focusedWindow)
                                focusedWindow.webContents.toggleDevTools();
                        }
                    },
                    {
                        label: i18n.t('game-menu.infos.about'),
                        click() {
                            require('electron').shell.openExternal('https://www.tipeee.com/dtne');
                        }
                    }
                ]
            }
        ];
        if (process.platform === 'darwin') {
            this.darwin(template);
        }
        return template;
    }
    static darwin(template) {
        template.unshift({
            label: electron_1.app.getName(),
            submenu: [
                {
                    role: 'about'
                },
                {
                    type: 'separator'
                },
                {
                    role: 'services',
                    submenu: []
                },
                {
                    type: 'separator'
                },
                {
                    role: 'hide'
                },
                {
                    role: 'hideothers'
                },
                {
                    role: 'unhide'
                },
                {
                    type: 'separator'
                },
                {
                    role: 'quit'
                }
            ]
        });
        template[2].submenu.push({
            type: 'separator'
        }, {
            label: i18n.t('game-menu.window.sound'),
            submenu: [
                {
                    label: i18n.t('game-menu.window.enable-sound'),
                    role: 'startspeaking'
                },
                {
                    label: i18n.t('game-menu.window.disable-sound'),
                    role: 'stopspeaking'
                }
            ]
        });
    }
}
exports.GameMenuTemplate = GameMenuTemplate;

//# sourceMappingURL=game-menu.template.js.map
