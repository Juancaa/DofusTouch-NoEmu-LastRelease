"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const wizAssets_1 = require("./wizAssets");
const app = global.nodeRequire('electron').remote.app;
class WizAssetsContainer {
    constructor(wGame, applicationService, http, general) {
        this.wGame = wGame;
        function escapeRegExp(str) {
            return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        }
        function replaceAll(str, find, replace) {
            return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
        }
        if (general.local_content) {
            console.info('- wizAssets enable');
            let cachePath = app.getPath('userData') + '/wizCache';
            cachePath = replaceAll(cachePath, '\\', '/');
            this.wGame.wizAssets = new wizAssets_1.WizAssets(cachePath, http);
        }
    }
}
exports.WizAssetsContainer = WizAssetsContainer;

//# sourceMappingURL=wizAssetsContainer.js.map
