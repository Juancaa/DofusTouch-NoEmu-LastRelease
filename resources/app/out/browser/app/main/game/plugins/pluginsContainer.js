"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const plugins_1 = require("./plugins");
class PluginsContainer {
    constructor(wGame) {
        this.wGame = wGame;
        this.wGame.plugins = new plugins_1.Plugins(this.wGame);
    }
}
exports.PluginsContainer = PluginsContainer;

//# sourceMappingURL=pluginsContainer.js.map
