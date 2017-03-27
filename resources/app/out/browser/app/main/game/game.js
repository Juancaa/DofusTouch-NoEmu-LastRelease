"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const eventemitter3_1 = require("eventemitter3");
class Game extends eventemitter3_1.EventEmitter {
    constructor(id, credentials) {
        super();
        this.id = id;
        this.isFocus = false;
        this.window = null;
        if (credentials)
            this.credentials = credentials;
    }
}
exports.Game = Game;

//# sourceMappingURL=game.js.map
