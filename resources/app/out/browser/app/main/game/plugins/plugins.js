"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const appPreferences_1 = require("./appPreferences/appPreferences");
class Plugins {
    constructor(wGame) {
        this.wGame = wGame;
        this.appPreferences = new appPreferences_1.AppPreferences();
    }
}
exports.Plugins = Plugins;

//# sourceMappingURL=plugins.js.map
