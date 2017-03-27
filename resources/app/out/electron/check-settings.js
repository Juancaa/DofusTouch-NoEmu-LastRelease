"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const default_settings_1 = require("./default.settings");
const settings = require('electron-settings');
function checkSettings() {
    let sett = settings.getSync();
    function checkRecursive(settings, defaultSettings) {
        for (let id in defaultSettings) {
            if (Array.isArray(defaultSettings[id])) {
                if (!Array.isArray(settings[id]) || typeof settings[id] !== 'object') {
                    console.log('error setting ' + id);
                    console.log(settings[id]);
                    return false;
                }
            }
            else {
                if (typeof defaultSettings[id] !== typeof settings[id] && defaultSettings[id] !== null) {
                    console.log('error setting ' + id);
                    console.log(settings[id]);
                    return false;
                }
            }
            if (typeof defaultSettings[id] === 'object') {
                if (!checkRecursive(settings[id], defaultSettings[id])) {
                    console.log(settings[id]);
                    console.log('error setting ' + id);
                    return false;
                }
            }
        }
        return true;
    }
    let ok = checkRecursive(sett, default_settings_1.DefaultSettings);
    sett.alertCounter = Math.floor(sett.alertCounter);
    if (!sett.option.general.resolution.x || !sett.option.general.resolution.y) {
        ok = false;
    }
    else {
        sett.option.general.resolution.x = Math.floor(sett.option.general.resolution.x);
        sett.option.general.resolution.y = Math.floor(sett.option.general.resolution.y);
    }
    if (ok)
        console.log('check settings OK');
    else
        console.log('check settings FAILED');
    return ok;
}
exports.checkSettings = checkSettings;

//# sourceMappingURL=check-settings.js.map
