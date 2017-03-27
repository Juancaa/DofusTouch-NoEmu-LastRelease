"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const settings = global.nodeRequire('electron-settings');
class AppPreferences {
    constructor() {
    }
    store(success, fail, key, value) {
        settings.set('appPreferences.' + key, value).then(() => {
            return success();
        }).catch((err) => {
            return fail(err);
        });
    }
    fetch(success, fail, key) {
        settings.get('appPreferences.' + key).then((val) => {
            return success(val);
        }).catch((err) => {
            return fail(err);
        });
    }
    remove(success, fail, key) {
        settings.delete(key).then(() => {
            return success();
        }).catch((err) => {
            return fail(err);
        });
    }
    show(success, fail) {
        return this.fetch(success, fail, 'appPreferences');
    }
}
exports.AppPreferences = AppPreferences;

//# sourceMappingURL=appPreferences.js.map
