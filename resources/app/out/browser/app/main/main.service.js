"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const tab_service_1 = require("./tab/tab.service");
const game_service_1 = require("./game/game.service");
const game_1 = require("./game/game");
const tab_1 = require("./tab/tab");
const async = require("async");
const application_service_1 = require("../../shared/electron/application.service");
const crypt_service_1 = require("../../shared/utils/crypt.service");
const prompt_service_1 = require("../../shared/utils/prompt.service");
const ng2_translate_1 = require("ng2-translate");
let MainService = class MainService {
    constructor(gameService, tabService, promptService, translate, applicationService, crypt) {
        this.gameService = gameService;
        this.tabService = tabService;
        this.promptService = promptService;
        this.translate = translate;
        this.applicationService = applicationService;
        this.crypt = crypt;
        this.seqId = 1;
        this.activTab = null;
    }
    get tabs() {
        return this.tabService.tabs;
    }
    get games() {
        return this.gameService.games;
    }
    addGame(credentials = undefined, cb = undefined) {
        let add = () => {
            let tab = new tab_1.Tab(this.seqId++);
            this.tabService.addTab(tab);
            let game = new game_1.Game(tab.id, credentials);
            game.on('character', (name) => {
                tab.character = name;
            });
            game.on('logged', (logged) => {
                tab.isLogged = logged;
            });
            game.on('notification', () => {
                if (this.activTab.id !== tab.id) {
                    tab.notification = true;
                }
            });
            this.gameService.addGame(game);
            this.selectGame(tab.id);
            if (cb)
                cb();
        };
        if (this.gameService.games.length > 5) {
            this.promptService.confirm({
                title: this.translate.instant("app.prompt.title.confirm"),
                html: this.translate.instant("app.main.prompt.tabs-overflow.text"),
                type: "warning"
            }).then(() => {
                add();
            }, (dismiss) => {
            });
        }
        else {
            add();
        }
    }
    addMultiAccountGames(accounts) {
        if (!accounts || accounts.length <= 0) {
            this.addGame();
            return;
        }
        async.eachSeries(accounts, (account, cb) => {
            let credentials = {
                account_name: this.crypt.decrypt(account.account_name_encrypted, this.applicationService.masterpassword),
                password: this.crypt.decrypt(account.password_encrypted, this.applicationService.masterpassword),
            };
            this.addGame(credentials, () => {
                setTimeout(cb, 1500);
            });
        }, () => {
            this.selectGame(this.seqId - 1);
        });
    }
    selectGame(id) {
        console.log(`selectGame ${id}`);
        if (this.activTab !== null) {
            this.activTab.isFocus = false;
            let oldGame = this.gameService.getGame(this.activTab.id);
            oldGame.isFocus = false;
        }
        let tab = this.tabService.getTab(id);
        let game = this.gameService.getGame(id);
        tab.isFocus = true;
        tab.notification = false;
        game.isFocus = true;
        if (tab.isLogged) {
            game.window.focus();
        }
        this.activTab = tab;
    }
    removeGame(id) {
        if (this.activTab !== null && id === this.activTab.id) {
            this.activTab = null;
        }
        let tab = this.tabService.getTab(id);
        let game = this.gameService.getGame(id);
        this.tabService.removeTab(tab);
        this.gameService.removeGame(game);
    }
};
MainService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [game_service_1.GameService,
        tab_service_1.TabService,
        prompt_service_1.PromptService,
        ng2_translate_1.TranslateService,
        application_service_1.ApplicationService,
        crypt_service_1.CryptService])
], MainService);
exports.MainService = MainService;

//# sourceMappingURL=main.service.js.map
