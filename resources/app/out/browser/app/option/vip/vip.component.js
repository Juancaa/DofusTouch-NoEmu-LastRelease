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
const settings_service_1 = require("./../../../shared/settings/settings.service");
const ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
const http_1 = require("@angular/http");
const application_service_1 = require("../../../shared/electron/application.service");
const ng2_translate_1 = require("ng2-translate");
const prompt_service_1 = require("../../../shared/utils/prompt.service");
const { shell, app } = global.nodeRequire('electron').remote;
let VipComponent = class VipComponent {
    constructor(settingsService, modalService, applicationService, translate, promptService, http) {
        this.settingsService = settingsService;
        this.modalService = modalService;
        this.applicationService = applicationService;
        this.translate = translate;
        this.promptService = promptService;
        this.http = http;
    }
    getTemplate() {
        if (!this.applicationService.vipStatus) {
            return this.authTmpl;
        }
        else {
            return this.mainTmpl;
        }
    }
    goDiscord(event) {
        shell.openExternal('https://discordapp.com/invite/rCawwmD');
        event.preventDefault();
    }
    goTipeee(event) {
        shell.openExternal('https://www.tipeee.com/dtne');
        event.preventDefault();
    }
    requestVipId() {
        let self = this;
        let status = [null, 'Tiwabbit', 'Wabbit', 'Grand Pa Wabbit', '42', 'Boss Wa Wabbit', 'Cresus MasterRace'];
        let labelStatut;
        this.promptService.custom({
            title: this.translate.instant("app.option.vip.authentication.prompt.title.write-code"),
            input: 'text',
            showCancelButton: true,
            confirmButtonText: this.translate.instant("app.option.vip.authentication.prompt.button.send-code"),
            cancelButtonText: this.translate.instant("app.option.vip.authentication.prompt.button.cancel"),
            showLoaderOnConfirm: true,
            preConfirm: function (vipId) {
                return new Promise(function (resolve, reject) {
                    if (vipId == "") {
                        reject(self.translate.instant("app.option.vip.authentication.prompt.text.empty-code"));
                        return false;
                    }
                    self.http.get(`${self.applicationService.website}/tipeee.php?vip_id=${vipId}`).map(res => res.json()).subscribe((data) => {
                        if (data.status) {
                            labelStatut = status[data.status];
                            self.settingsService.vip_id = vipId;
                            resolve();
                        }
                        else {
                            self.promptService.alert({ html: self.translate.instant("app.option.vip.authentication.prompt.text.bad-code") });
                        }
                    });
                });
            },
        }).then(function (vipId) {
            self.promptService.success({
                title: self.translate.instant("app.option.vip.authentication.prompt.title.success"),
                html: self.translate.instant("app.option.vip.authentication.prompt.text.success", { value1: labelStatut }),
                confirmButtonText: self.translate.instant("app.option.vip.authentication.prompt.button.reboot"),
                confirmButtonClass: 'btn btn-primary flat btn-lg spacing-left',
                showCancelButton: true,
                cancelButtonText: self.translate.instant("app.option.vip.authentication.prompt.button.stand-here"),
                cancelButtonClass: 'btn btn-default flat btn-lg'
            }).then(function () {
                app.relaunch();
                app.quit();
            }, (dismiss) => { });
        }, (dismiss) => { });
    }
};
__decorate([
    core_1.ViewChild('authentication'),
    __metadata("design:type", core_1.TemplateRef)
], VipComponent.prototype, "authTmpl", void 0);
__decorate([
    core_1.ViewChild('main'),
    __metadata("design:type", core_1.TemplateRef)
], VipComponent.prototype, "mainTmpl", void 0);
__decorate([
    core_1.ViewChild('modal'),
    __metadata("design:type", core_1.TemplateRef)
], VipComponent.prototype, "modalTmpl", void 0);
VipComponent = __decorate([
    core_1.Component({
        selector: 'option-shortcuts',
        templateUrl: 'app/option/vip/vip.component.html',
        styleUrls: ['app/option/vip/vip.component.css'],
        host: {}
    }),
    __metadata("design:paramtypes", [settings_service_1.SettingsService,
        ng_bootstrap_1.NgbModal,
        application_service_1.ApplicationService,
        ng2_translate_1.TranslateService,
        prompt_service_1.PromptService,
        http_1.Http])
], VipComponent);
exports.VipComponent = VipComponent;

//# sourceMappingURL=vip.component.js.map
