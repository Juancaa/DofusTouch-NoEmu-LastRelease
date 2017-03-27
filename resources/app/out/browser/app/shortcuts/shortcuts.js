"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ShortCuts {
    constructor(window) {
        this.shortcuts = [];
        this.shortcutsVanilla = [];
        this.window = window;
    }
    bind(shortcut, action) {
        this.window.key(shortcut, () => {
            action();
        });
        this.shortcuts.push(shortcut);
    }
    bindVanilla(shortcut, action) {
        let listener = (e) => {
            if (e.key.toLowerCase() == shortcut)
                action();
        };
        this.window.addEventListener('keydown', listener);
        this.shortcutsVanilla.push(listener);
    }
    unBindAll() {
        this.shortcuts.forEach((shortcut) => {
            this.unBind(shortcut);
        });
        this.shortcutsVanilla.forEach((listener) => {
            this.unBindVanilla(listener);
        });
    }
    unBind(shortcut) {
        this.window.key.unbind(shortcut);
    }
    unBindVanilla(listener) {
        this.window.removeEventListener('keydown', listener);
    }
}
exports.ShortCuts = ShortCuts;

//# sourceMappingURL=shortcuts.js.map
