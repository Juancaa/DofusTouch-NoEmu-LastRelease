"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
let GameService = class GameService {
    constructor() {
        this._games = [];
    }
    get games() {
        return this._games;
    }
    getGame(id) {
        return this._games.filter((game) => {
            return game.id === id;
        })[0];
    }
    addGame(game) {
        this._games.push(game);
    }
    removeGame(game) {
        let index = this._games.indexOf(game);
        if (index !== -1) {
            this._games.splice(index, 1);
        }
    }
};
GameService = __decorate([
    core_1.Injectable()
], GameService);
exports.GameService = GameService;

//# sourceMappingURL=game.service.js.map
