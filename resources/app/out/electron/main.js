"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commandLineArgs = require('command-line-args');
const electron_1 = require("electron");
const application_1 = require("./application");
electron_1.app.commandLine.appendSwitch('ignore-gpu-blacklist', 'true');
electron_1.app.commandLine.appendSwitch("disable-renderer-backgrounding");
const optionDefinitions = [
    { name: 'update', alias: 'u', type: Boolean },
    { name: 'changelog', alias: 'l', type: Boolean },
    { name: 'relaunch', alias: 'r', type: Boolean },
    { name: 'remote-debugging-port', type: String },
    { name: 'expose_debug_as', type: String },
    { name: 'devmode', type: Boolean },
    { name: 'skipupdate', type: Boolean }
];
const cmdOptions = commandLineArgs(optionDefinitions);
electron_1.app.on('certificate-error', (event, webContents, url, error, certificate, callback) => {
    event.preventDefault();
    callback(true);
});
electron_1.app.on('ready', () => {
    application_1.Application.init(cmdOptions).run();
});
electron_1.app.on('window-all-closed', function () {
    process.platform;
    electron_1.app.quit();
});

//# sourceMappingURL=main.js.map
