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
const ipcrenderer_service_1 = require("./../../shared/electron/ipcrenderer.service");
const platform_browser_1 = require("@angular/platform-browser");
const ng2_translate_1 = require("ng2-translate");
let PromptPasswordComponent = class PromptPasswordComponent {
    constructor(translate, zone, ipcRendererService, titleService) {
        this.translate = translate;
        this.zone = zone;
        this.ipcRendererService = ipcRendererService;
        this.titleService = titleService;
        this.password = "";
        this.badPassword = false;
    }
    ngOnInit() {
        this.ipcRendererService.on('wrong-password', () => {
            this.badPassword = true;
        });
        this.translate.get('update.title').subscribe((res) => {
            this.titleService.setTitle('Sauvegarde de comptes');
        });
    }
    valid() {
        this.ipcRendererService.send('master-password', this.password);
    }
    skip() {
        this.ipcRendererService.send('master-password-canceled');
    }
};
PromptPasswordComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'prompt-password',
        templateUrl: 'prompt-password.component.html',
        styleUrls: ['prompt-password.component.css']
    }),
    __metadata("design:paramtypes", [ng2_translate_1.TranslateService,
        core_1.NgZone,
        ipcrenderer_service_1.IpcRendererService,
        platform_browser_1.Title])
], PromptPasswordComponent);
exports.PromptPasswordComponent = PromptPasswordComponent;

//# sourceMappingURL=prompt-password.component.js.map
