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
const ng2_translate_1 = require("ng2-translate");
const prompt_service_1 = require("../../../shared/utils/prompt.service");
let GeneralComponent = class GeneralComponent {
    constructor(translate, settingsService, promptService) {
        this.translate = translate;
        this.settingsService = settingsService;
        this.promptService = promptService;
        this.resolutions = [
            { name: '800x600', value: "800;600" },
            { name: '960x540', value: "960;540" },
            { name: '1280x720', value: "1280;720" },
            { name: '1024x768', value: "1024;768" },
            { name: '1366x768', value: "1366;768" },
            { name: '1440x900', value: "1440;900" },
            { name: '1600x900', value: "1600;900" },
            { name: '1280x1024', value: "1280;1024" },
            { name: '1680x1050', value: "1680;1050" },
            { name: '1920x1080', value: "1920;1080" },
            { name: '2560x1440', value: "2560;1440" }
        ];
        this.languages = [
            { name: 'Français', value: "fr" },
            { name: 'English', value: "en" },
            { name: 'Espagnol', value: "es" }
        ];
    }
    ngOnInit() {
        this._resolution = this.settingsService.option.general.resolution.x + ';' + this.settingsService.option.general.resolution.y;
        this._language = this.settingsService.language;
    }
    setLanguage() {
        this.translate.use(this._language);
        this.settingsService.language = this._language;
    }
    setResolution(value) {
        let aValue = value.split(';');
        let resolution = {
            x: parseInt(aValue[0]),
            y: parseInt(aValue[1])
        };
        if (this.settingsService.option.general.resolution != resolution) {
            this.promptService.info({ html: this.translate.instant("app.option.prompt.change-resolution.text") });
        }
        this.settingsService.option.general.resolution = resolution;
    }
};
GeneralComponent = __decorate([
    core_1.Component({
        selector: 'option-general',
        templateUrl: 'app/option/general/general.component.html',
        styleUrls: ['app/option/general/general.component.css'],
        host: {}
    }),
    __metadata("design:paramtypes", [ng2_translate_1.TranslateService,
        settings_service_1.SettingsService,
        prompt_service_1.PromptService])
], GeneralComponent);
exports.GeneralComponent = GeneralComponent;

//# sourceMappingURL=general.component.js.map
