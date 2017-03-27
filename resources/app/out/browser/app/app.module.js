"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const core_2 = require("@angular/core");
const platform_browser_1 = require("@angular/platform-browser");
const common_1 = require("@angular/common");
const ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
const ng2_translate_1 = require("ng2-translate");
const settings_service_1 = require("../shared/settings/settings.service");
const shared_module_1 = require("../shared/shared.module");
const app_component_1 = require("./app.component");
const app_routing_1 = require("./app.routing");
const http_1 = require("@angular/http");
let AppModule = class AppModule {
};
AppModule = __decorate([
    core_1.NgModule({
        imports: [
            platform_browser_1.BrowserModule,
            shared_module_1.SharedModule.forRoot(),
            ng_bootstrap_1.NgbModule.forRoot(),
            ng2_translate_1.TranslateModule.forRoot({
                provide: ng2_translate_1.TranslateLoader,
                useFactory: (http) => new ng2_translate_1.TranslateStaticLoader(http, '../../i18n/browser', '.json'),
                deps: [http_1.Http]
            }),
            app_routing_1.routing
        ],
        declarations: [
            app_component_1.AppComponent
        ],
        providers: [
            { provide: common_1.APP_BASE_HREF, useValue: '/' },
            {
                provide: core_2.LOCALE_ID,
                deps: [settings_service_1.SettingsService],
                useFactory: function (setting) {
                    return setting.language;
                }
            }
        ],
        bootstrap: [app_component_1.AppComponent]
    })
], AppModule);
exports.AppModule = AppModule;

//# sourceMappingURL=app.module.js.map
