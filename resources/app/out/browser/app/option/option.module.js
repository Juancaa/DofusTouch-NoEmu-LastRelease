"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const common_1 = require("@angular/common");
const ng2_translate_1 = require("ng2-translate");
const shared_module_1 = require("./../../shared/shared.module");
const option_routing_1 = require("./option.routing");
const option_component_1 = require("./option.component");
const general_component_1 = require("./general/general.component");
const shortcuts_component_1 = require("./shortcuts/shortcuts.component");
const no_emu_component_1 = require("./shortcuts/no-emu/no-emu.component");
const diver_component_1 = require("./shortcuts/diver/diver.component");
const spell_component_1 = require("./shortcuts/spell/spell.component");
const item_component_1 = require("./shortcuts/item/item.component");
const interface_component_1 = require("./shortcuts/interface/interface.component");
const input_component_1 = require("./shortcuts/input/input.component");
const forms_1 = require("@angular/forms");
const notification_component_1 = require("./notification/notification.component");
const vip_component_1 = require("./vip/vip.component");
const auto_group_component_1 = require("./vip/auto-group/auto-group.component");
const general_component_2 = require("./vip/general/general.component");
const ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
const multi_account_component_1 = require("./vip/multi-account/multi-account.component");
const prompt_service_1 = require("../../shared/utils/prompt.service");
const status_component_1 = require("./vip/status/status.component");
const ng2_tagsinput_1 = require("ng2-tagsinput");
let OptionModule = class OptionModule {
};
OptionModule = __decorate([
    core_1.NgModule({
        imports: [
            common_1.CommonModule,
            option_routing_1.OptionRoutingModule,
            shared_module_1.SharedModule,
            forms_1.FormsModule,
            ng2_translate_1.TranslateModule,
            ng_bootstrap_1.NgbModule,
            ng2_tagsinput_1.Ng2TagsInputModule
        ],
        providers: [
            prompt_service_1.PromptService
        ],
        declarations: [
            option_component_1.OptionComponent,
            general_component_1.GeneralComponent,
            shortcuts_component_1.ShortcutsComponent,
            no_emu_component_1.NoEmuComponent,
            input_component_1.InputComponent,
            diver_component_1.DiverComponent,
            spell_component_1.SpellComponent,
            item_component_1.ItemComponent,
            interface_component_1.InterfaceComponent,
            notification_component_1.NotificationComponent,
            vip_component_1.VipComponent,
            auto_group_component_1.AutoGroupComponent,
            general_component_2.GeneralComponent,
            multi_account_component_1.MultiAccountComponent,
            status_component_1.StatusComponent
        ]
    })
], OptionModule);
exports.OptionModule = OptionModule;

//# sourceMappingURL=option.module.js.map
