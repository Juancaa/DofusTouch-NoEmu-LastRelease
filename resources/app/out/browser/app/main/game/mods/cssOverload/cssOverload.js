"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CssOverload {
    constructor(window) {
        this.window = window;
        this.styleTag = this.window.document.createElement('style');
        this.window.document.getElementsByTagName('head')[0].appendChild(this.styleTag);
        this.pageNumberSelection();
    }
    pageNumberSelection() {
        this.styleTag.innerHTML += `
            .NumberInputBox[readonly=readonly] {
                -webkit-user-select: none;
            }
        `;
    }
    reset() {
        this.window.document.getElementsByTagName('head')[0].removeChild(this.styleTag);
    }
}
exports.CssOverload = CssOverload;

//# sourceMappingURL=cssOverload.js.map
