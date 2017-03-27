"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const async = require("async");
const shortcuts_1 = require("../../../../shortcuts/shortcuts");
class Shortcuts {
    constructor(wGame, params) {
        this.events = [];
        this.wGame = wGame;
        this.params = params;
        this.shortcuts = new shortcuts_1.ShortCuts(this.wGame);
        let onCharacterSelectedSuccess = () => {
            this.bindAll();
            let onDisconnect = () => {
                this.shortcuts.unBindAll();
            };
            this.wGame.gui.on("disconnect", onDisconnect);
            this.events.push(() => {
                this.wGame.gui.removeListener("disconnect", onDisconnect);
            });
        };
        this.wGame.gui.playerData.on("characterSelectedSuccess", onCharacterSelectedSuccess);
        this.events.push(() => {
            this.wGame.gui.playerData.removeListener("characterSelectedSuccess", onCharacterSelectedSuccess);
        });
        if (this.wGame.gui.isConnected) {
            onCharacterSelectedSuccess();
        }
    }
    bindAll() {
        this.shortcuts.bind(this.params.diver.end_turn, () => {
            this.wGame.gui.fightManager.finishTurn();
        });
        this.shortcuts.bind(this.params.diver.open_chat, () => {
            this.wGame.gui.chat.activate();
        });
        async.forEachOf(this.params.spell, (shortcut, index) => {
            this.shortcuts.bind(shortcut, () => {
                this.wGame.gui.shortcutBar._panels.spell.slotList[index].tap();
            });
        });
        async.forEachOf(this.params.item, (shortcut, index) => {
            this.shortcuts.bind(shortcut, () => {
                this.wGame.gui.shortcutBar._panels.item.slotList[index].tap();
            });
        });
        async.forEachOf(this.params.interface.getAll(), (inter) => {
            this.wGame.gui.menuBar._icons._childrenList.forEach((element, index) => {
                if (element.id.toUpperCase() == inter.key.toUpperCase()) {
                    this.shortcuts.bind(inter.value, () => {
                        let newIndex = index;
                        this.wGame.gui.menuBar._icons._childrenList[newIndex].tap();
                    });
                    return;
                }
            });
        });
        this.shortcuts.bindVanilla('escape', () => {
            if (this.wGame.gui.chat.active) {
                this.wGame.gui.chat.deactivate();
            }
            else {
                for (let i = this.wGame.gui.windowsContainer._childrenList.length - 1; i >= 0; i--) {
                    let win = this.wGame.gui.windowsContainer._childrenList[i];
                    if (win.isVisible()) {
                        win.close();
                        break;
                    }
                }
            }
        });
    }
    reset() {
        this.shortcuts.unBindAll();
        this.events.forEach((event) => {
            event();
        });
        this.events = [];
    }
}
exports.Shortcuts = Shortcuts;

//# sourceMappingURL=shortcuts.js.map
