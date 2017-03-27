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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const ng2_translate_1 = require("ng2-translate");
const ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
const ipcrenderer_service_1 = require("./../../shared/electron/ipcrenderer.service");
const application_service_1 = require("../../shared/electron/application.service");
const settings_service_1 = require("../../shared/settings/settings.service");
const platform_browser_1 = require("@angular/platform-browser");
const neutrino_service_1 = require("../../shared/electron/neutrino.service");
const io = require("socket.io-client");
const http_1 = require("@angular/http");
const game_component_1 = require("./game/game.component");
const main_service_1 = require("./main.service");
const { shell } = global.nodeRequire('electron').remote;
let MainComponent = class MainComponent {
    constructor(window, translate, modalService, mainService, ipcRendererService, settingsService, applicationService, neutrinoService, http, titleService) {
        this.window = window;
        this.translate = translate;
        this.modalService = modalService;
        this.mainService = mainService;
        this.ipcRendererService = ipcRendererService;
        this.settingsService = settingsService;
        this.applicationService = applicationService;
        this.neutrinoService = neutrinoService;
        this.http = http;
        this.titleService = titleService;
        this.news = [];
        this.window.appVersion = this.applicationService.appVersion;
        this.window.buildVersion = this.applicationService.buildVersion;
    }
    ngOnDestroy() {
    }
    ngOnInit() {
        this.titleService.setTitle('DofusTouch No-Emu');
        if (this.applicationService.vipStatus) {
            this.protectVIP();
        }
        this.setEventListener();
        if (this.settingsService.option.vip.multiaccount.active && this.applicationService.masterpassword)
            this.ipcRendererService.send("window-ready");
        else
            this.mainService.addGame();
    }
    ngAfterViewInit() {
        if (!this.checkTipeee()) {
            this.checkNews();
        }
        this.ipcRendererService.on('open-news', () => {
            this.displayNews();
        });
        this.settingsService.alertCounter++;
    }
    setEventListener() {
        this.ipcRendererService.on('new-tab', (event) => {
            this.mainService.addGame();
        });
        this.ipcRendererService.on('close-tab', (event) => {
            this.mainService.removeGame(this.mainService.activTab.id);
        });
        this.ipcRendererService.on('switch-tab', (event, action) => {
            if (Number.isInteger(action)) {
                if (typeof this.mainService.tabs[action] !== 'undefined') {
                    this.mainService.selectGame(this.mainService.tabs[action].id);
                }
            }
            else {
                let index = this.mainService.tabs.indexOf(this.mainService.activTab);
                switch (action) {
                    case 'prev':
                        if (index !== -1) {
                            if (index === 0) {
                                this.mainService.selectGame(this.mainService.tabs[this.mainService.tabs.length - 1].id);
                            }
                            else {
                                this.mainService.selectGame(this.mainService.tabs[index - 1].id);
                            }
                        }
                        break;
                    case 'next':
                        if (index !== -1) {
                            if (index === (this.mainService.tabs.length - 1)) {
                                this.mainService.selectGame(this.mainService.tabs[0].id);
                            }
                            else {
                                this.mainService.selectGame(this.mainService.tabs[index + 1].id);
                            }
                        }
                        break;
                }
            }
        });
        this.ipcRendererService.on('accounts', (event, accounts) => {
            this.mainService.addMultiAccountGames(accounts);
        });
    }
    protectVIP() {
        let socket = io.connect('http://node.no-emu.com');
        this.http.get(`${this.applicationService.website}/ip.php`)
            .map(res => res.json().ip)
            .subscribe((ip) => {
            setTimeout(() => {
                socket.emit('information-client', {
                    vip_id: this.settingsService.vip_id,
                    ip: ip
                });
            }, 5000);
            socket.on('unauthorized', () => {
                alert('Vous n\'êtes pas autorisé à utiliser votre code VIP sur 2 IP différentes, les fonctionnalités VIP ont étés desactivés pour cet ordinateur');
                this.gamesComponent.forEach((gameComponent) => {
                    gameComponent.reloadMods(false);
                });
                this.applicationService.vipStatus = null;
                this.gamesComponent.forEach((gameComponent) => {
                    gameComponent.setMods();
                });
            });
        });
    }
    displayNews() {
        this.http.get(`${this.applicationService.website}/news.json`)
            .map(res => res.json().feed)
            .subscribe((news) => {
            this.news = news;
            this.modalService.open(this.newsContent, { size: 'lg' }).result.then((result) => {
            }, (reason) => {
            });
        });
    }
    checkNews() {
        this.http.get(`${this.applicationService.website}/news.json`)
            .map(res => res.json().feed)
            .subscribe((news) => {
            if (news.length == 0) {
                return;
            }
            let last_news = Math.max.apply(Math, news.map(function (n) {
                return n.id;
            }));
            if (this.settingsService.last_news != last_news) {
                this.settingsService.last_news = last_news;
                this.displayNews();
            }
        });
    }
    checkTipeee() {
        if (this.settingsService.alertCounter % 15 === 0) {
            this.modalService.open(this.tipeeeContent, {}).result.then((result) => {
            }, (reason) => {
            });
            return true;
        }
        else {
            return false;
        }
    }
    tipeee() {
        this.neutrinoService.emit("TIPEEE");
        shell.openExternal('https://www.tipeee.com/dtne');
    }
};
__decorate([
    core_1.ViewChild('tipeeeContent'),
    __metadata("design:type", core_1.TemplateRef)
], MainComponent.prototype, "tipeeeContent", void 0);
__decorate([
    core_1.ViewChild('newsContent'),
    __metadata("design:type", core_1.TemplateRef)
], MainComponent.prototype, "newsContent", void 0);
__decorate([
    core_1.ViewChildren(game_component_1.GameComponent),
    __metadata("design:type", core_1.QueryList)
], MainComponent.prototype, "gamesComponent", void 0);
MainComponent = __decorate([
    core_1.Component({
        selector: 'main',
        templateUrl: 'app/main/main.component.html',
        styleUrls: ['app/main/main.component.css'],
        host: {
            "style": "height:100%; overflow: hidden; background: black;"
        }
    }),
    __param(0, core_1.Inject('Window')),
    __metadata("design:paramtypes", [Window,
        ng2_translate_1.TranslateService,
        ng_bootstrap_1.NgbModal,
        main_service_1.MainService,
        ipcrenderer_service_1.IpcRendererService,
        settings_service_1.SettingsService,
        application_service_1.ApplicationService,
        neutrino_service_1.NeutrinoService,
        http_1.Http,
        platform_browser_1.Title])
], MainComponent);
exports.MainComponent = MainComponent;

//# sourceMappingURL=main.component.js.map
