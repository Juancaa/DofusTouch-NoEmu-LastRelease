"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
const ng2_translate_1 = require("ng2-translate");
const shared_module_1 = require("./../../shared/shared.module");
const prompt_password_routing_module_1 = require("./prompt-password-routing.module");
const prompt_password_component_1 = require("./prompt-password.component");
const forms_1 = require("@angular/forms");
const common_1 = require("@angular/common");
let PromptPasswordModule = class PromptPasswordModule {
};
PromptPasswordModule = __decorate([
    core_1.NgModule({
        declarations: [prompt_password_component_1.PromptPasswordComponent],
        imports: [
            shared_module_1.SharedModule,
            common_1.CommonModule,
            prompt_password_routing_module_1.PromptPasswordRoutingModule,
            ng_bootstrap_1.NgbModule.forRoot(),
            forms_1.FormsModule,
            ng2_translate_1.TranslateModule
        ],
    })
], PromptPasswordModule);
exports.PromptPasswordModule = PromptPasswordModule;

//# sourceMappingURL=prompt-password.module.js.map
