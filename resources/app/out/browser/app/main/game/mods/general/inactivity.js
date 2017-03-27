"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Inactivity {
    constructor(window, enable) {
        this.window = window;
        if (enable) {
            this.idInt = setInterval(() => {
                this.window.d.recordActivity();
            }, 60 * 60 * 3);
        }
    }
    reset() {
        clearInterval(this.idInt);
    }
}
exports.Inactivity = Inactivity;

//# sourceMappingURL=inactivity.js.map
