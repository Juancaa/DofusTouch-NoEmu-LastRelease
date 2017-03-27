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
const settings_service_1 = require("./../../../../shared/settings/settings.service");
const application_service_1 = require("../../../../shared/electron/application.service");
let GeneralComponent = class GeneralComponent {
    constructor(settingsService, applicationService) {
        this.settingsService = settingsService;
        this.applicationService = applicationService;
    }
};
GeneralComponent = __decorate([
    core_1.Component({
        templateUrl: 'app/option/vip/general/general.component.html',
        styleUrls: ['app/option/vip/general/general.component.css']
    }),
    __metadata("design:paramtypes", [settings_service_1.SettingsService,
        application_service_1.ApplicationService])
], GeneralComponent);
exports.GeneralComponent = GeneralComponent;

//# sourceMappingURL=general.component.js.map