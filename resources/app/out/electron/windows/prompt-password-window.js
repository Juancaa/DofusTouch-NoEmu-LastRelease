"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const application_1 = require("../application");
const settings = require('electron-settings');
const electron_1 = require("electron");
class PromptPassword {
    static run() {
        let promptWindow;
        promptWindow = new electron_1.BrowserWindow({
            width: 400,
            height: 200,
            title: "DofusTouchNE",
            show: false,
            center: true,
            movable: true,
            alwaysOnTop: true,
            resizable: false,
        });
        promptWindow.loadURL(`file://${application_1.Application.appPath}/out/browser/index.html#/prompt-password`);
        promptWindow.show();
        promptWindow.setMenu(null);
        promptWindow.on('close', (event) => {
            promptWindow = null;
        });
        return promptWindow;
    }
    static displayWrongPassword(promptWindow) {
        promptWindow.webContents.send("wrong-password");
    }
}
exports.PromptPassword = PromptPassword;

//# sourceMappingURL=prompt-password-window.js.map
