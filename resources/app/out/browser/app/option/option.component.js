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
const prompt_service_1 = require("../../shared/utils/prompt.service");
let OptionComponent = class OptionComponent {
    constructor(translate, ipcRendererService, promptService, titleService) {
        this.translate = translate;
        this.ipcRendererService = ipcRendererService;
        this.promptService = promptService;
        this.titleService = titleService;
    }
    ngOnInit() {
        this.titleService.setTitle('Option');
    }
    validate() {
        console.log('emit->valite-option');
        this.ipcRendererService.send('validate-option');
    }
    reset() {
        let self = this;
        this.promptService.confirm({
            title: this.translate.instant("app.prompt.title.confirm"),
            html: this.translate.instant("app.option.prompt.reset-option.text"),
            type: "warning"
        }).then(() => {
            console.log('emit->reset-option');
            self.ipcRendererService.send('reset-option');
        }, (dismiss) => { });
    }
};
OptionComponent = __decorate([
    core_1.Component({
        selector: 'options',
        templateUrl: 'app/option/option.component.html',
        styleUrls: ['app/option/option.component.css']
    }),
    __metadata("design:paramtypes", [ng2_translate_1.TranslateService,
        ipcrenderer_service_1.IpcRendererService,
        prompt_service_1.PromptService,
        platform_browser_1.Title])
], OptionComponent);
exports.OptionComponent = OptionComponent;

//# sourceMappingURL=option.component.js.map
