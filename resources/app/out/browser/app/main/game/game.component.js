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
const shortcuts_1 = require("./mods/shortcuts/shortcuts");
const ipcrenderer_service_1 = require("./../../../shared/electron/ipcrenderer.service");
const ng2_translate_1 = require("ng2-translate");
const settings_service_1 = require("./../../../shared/settings/settings.service");
const application_service_1 = require("./../../../shared/electron/application.service");
const platform_browser_1 = require("@angular/platform-browser");
const autogroup_1 = require("./mods/auto-group/autogroup");
const inactivity_1 = require("./mods/general/inactivity");
const healthbar_1 = require("./mods/health-bar/healthbar");
const notifications_1 = require("./mods/notifications/notifications");
const damageestimator_1 = require("./mods/damage-estimator/damageestimator");
const cssOverload_1 = require("./mods/cssOverload/cssOverload");
const rapid_exchange_1 = require("./mods/rapid-exchange/rapid-exchange");
const wizAssetsContainer_1 = require("./wizAssets/wizAssetsContainer");
const hide_shop_1 = require("./mods/hide-shop/hide-shop");
const http_1 = require("@angular/http");
const pluginsContainer_1 = require("./plugins/pluginsContainer");
const game_1 = require("./game");
const { remote } = global.nodeRequire('electron');
let SafePipe = class SafePipe {
    constructor(sanitizer) {
        this.sanitizer = sanitizer;
    }
    transform(url) {
        return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }
};
SafePipe = __decorate([
    core_1.Pipe({ name: 'safe' }),
    __metadata("design:paramtypes", [platform_browser_1.DomSanitizer])
], SafePipe);
exports.SafePipe = SafePipe;
let GameComponent = class GameComponent {
    constructor(window, ipcRendererService, zone, settingsService, translate, applicationService, http, titleService) {
        this.window = window;
        this.ipcRendererService = ipcRendererService;
        this.zone = zone;
        this.settingsService = settingsService;
        this.translate = translate;
        this.applicationService = applicationService;
        this.http = http;
        this.titleService = titleService;
        this.selected = new core_1.EventEmitter();
        this.gameLoaded = false;
        this.gamePath = this.applicationService.gamePath + '/index.html';
    }
    ngOnInit() {
    }
    ngAfterViewInit() {
        this.game.window = this.window['Frame' + this.game.id].contentWindow;
    }
    gameReady() {
        if (this.gameLoaded) {
            let loading = document.getElementById("LoadingGame_" + this.game.id);
            loading.style.opacity = '0';
            setTimeout(function () {
                loading.remove();
            }, 500);
            this.plugins = new pluginsContainer_1.PluginsContainer(this.game.window);
            this.setEventListener();
            this.setMods();
            if (this.game.credentials)
                this.connectAccount();
            this.ipcRendererService.on('reload-settings-done', () => {
                this.reloadMods();
            });
        }
        this.gameLoaded = true;
    }
    reloadMods(start = true) {
        switch (this.applicationService.vipStatus) {
            case 5:
            case 4:
            case 3:
                if (this.healthbar)
                    this.healthbar.reset();
            case 2:
                if (this.autogroup)
                    this.autogroup.reset();
                if (this.inactivity)
                    this.inactivity.reset();
                if (this.damageEstimator)
                    this.damageEstimator.reset();
            default:
                if (this.notifications)
                    this.notifications.removeAllListeners();
                if (this.notifications)
                    this.notifications.reset();
                if (this.shortcuts)
                    this.shortcuts.reset();
                if (this.cssOverload)
                    this.cssOverload.reset();
                if (this.hideShop)
                    this.hideShop.reset();
        }
        if (start)
            this.setMods();
    }
    setMods() {
        switch (this.applicationService.vipStatus) {
            case 5:
            case 4:
            case 3:
                this.healthbar = new healthbar_1.HealthBar(this.game.window, this.settingsService.option.vip.general);
            case 2:
                this.autogroup = new autogroup_1.AutoGroup(this.game.window, this.settingsService.option.vip.autogroup, this.ipcRendererService);
                this.inactivity = new inactivity_1.Inactivity(this.game.window, this.settingsService.option.vip.general.disable_inactivity);
                this.damageEstimator = new damageestimator_1.DamageEstimator(this.game.window, this.settingsService.option.vip.general);
            default:
                this.notifications = new notifications_1.Notifications(this.game.window, this.settingsService.option.notification, this.translate);
                this.notifications.on('newNotification', () => {
                    this.zone.run(() => {
                        this.game.emit('notification');
                    });
                });
                this.notifications.on('focusTab', () => {
                    this.zone.run(() => {
                        this.selected.emit(this.game);
                    });
                });
                this.shortcuts = new shortcuts_1.Shortcuts(this.game.window, this.settingsService.option.shortcuts);
                this.cssOverload = new cssOverload_1.CssOverload(this.game.window);
                this.hideShop = new hide_shop_1.HideShop(this.game.window, this.settingsService.option.general.hidden_shop);
                this.rapidExchange = new rapid_exchange_1.RapidExchange(this.game.window);
                this.wizAssets = new wizAssetsContainer_1.WizAssetsContainer(this.game.window, this.applicationService, this.http, this.settingsService.option.general);
        }
    }
    setEventListener() {
        var canvas = this.game.window.document.getElementById("mapScene-canvas");
        canvas.addEventListener("webglcontextlost", (event) => {
            console.log('reload webglcontext cause: webglcontextlost');
            this.game.window.isoEngine.background.render();
            event.preventDefault();
        }, false);
        this.game.window.onresize = () => {
            try {
                this.game.window.gui._resizeUi();
            }
            catch (e) {
            }
            this.checkMaxZoom();
        };
        let onCharacterSelectedSuccess = () => {
            this.zone.run(() => {
                this.game.emit('character', this.game.window.gui.playerData.characterBaseInformations.name);
                this.game.emit('logged', true);
                this.titleService.setTitle(this.game.window.gui.playerData.characterBaseInformations.name);
            });
            this.checkMaxZoom();
        };
        let onDisconnect = () => {
            this.zone.run(() => {
                this.game.emit('character', null);
                this.game.emit('logged', false);
            });
        };
        this.game.window.gui.playerData.on("characterSelectedSuccess", onCharacterSelectedSuccess);
        this.game.window.gui.on("disconnect", onDisconnect);
        this.game.window.isoEngine.mapScene._refreshAreasBackup = this.game.window.isoEngine.mapScene._refreshAreas;
        this.game.window.isoEngine.mapScene._refreshAreas = function () {
            for (var id in this.areasToRefresh) {
                if (this.areasToRefresh[id][3] < this.t) {
                    this.areasToRefresh[id][2] = this.t;
                    this.areasToRefresh[id][3] = this.t + 5;
                }
            }
            this._refreshAreasBackup();
        };
    }
    checkMaxZoom() {
        if (!this.backupMaxZoom)
            this.backupMaxZoom = this.game.window.isoEngine.mapScene.camera.maxZoom;
        this.game.window.isoEngine.mapScene.camera.maxZoom = Math.max(this.backupMaxZoom, this.backupMaxZoom + (this.game.window.isoEngine.mapScene.canvas.height / 800 - 1));
    }
    connectAccount() {
        setTimeout(() => {
            this.selected.emit(this.game);
            let credentials = this.game.credentials;
            delete (this.game.credentials);
            this.game.window.gui.loginScreen._connectMethod = "lastCharacter";
            this.game.window.gui.loginScreen._login(credentials.account_name, credentials.password, false);
        }, this.game.id * 1000);
    }
};
__decorate([
    core_1.Input(),
    __metadata("design:type", game_1.Game)
], GameComponent.prototype, "game", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], GameComponent.prototype, "selected", void 0);
GameComponent = __decorate([
    core_1.Component({
        selector: 'game',
        templateUrl: 'app/main/game/game.component.html',
        styleUrls: ['app/main/game/game.component.css']
    }),
    __param(0, core_1.Inject('Window')),
    __metadata("design:paramtypes", [Window,
        ipcrenderer_service_1.IpcRendererService,
        core_1.NgZone,
        settings_service_1.SettingsService,
        ng2_translate_1.TranslateService,
        application_service_1.ApplicationService,
        http_1.Http,
        platform_browser_1.Title])
], GameComponent);
exports.GameComponent = GameComponent;

//# sourceMappingURL=game.component.js.map
