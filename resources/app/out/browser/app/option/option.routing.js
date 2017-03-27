"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("@angular/router");
const option_component_1 = require("./option.component");
const general_component_1 = require("./general/general.component");
const shortcuts_component_1 = require("./shortcuts/shortcuts.component");
const no_emu_component_1 = require("./shortcuts/no-emu/no-emu.component");
const diver_component_1 = require("./shortcuts/diver/diver.component");
const spell_component_1 = require("./shortcuts/spell/spell.component");
const item_component_1 = require("./shortcuts/item/item.component");
const interface_component_1 = require("./shortcuts/interface/interface.component");
const notification_component_1 = require("./notification/notification.component");
const vip_component_1 = require("./vip/vip.component");
const general_component_2 = require("./vip/general/general.component");
const auto_group_component_1 = require("./vip/auto-group/auto-group.component");
const multi_account_component_1 = require("./vip/multi-account/multi-account.component");
const status_component_1 = require("./vip/status/status.component");
const routes = [
    {
        path: '',
        component: option_component_1.OptionComponent,
        children: [
            {
                path: '',
                redirectTo: 'general',
                pathMatch: 'full'
            },
            {
                path: 'general',
                component: general_component_1.GeneralComponent
            },
            {
                path: 'shortcuts',
                component: shortcuts_component_1.ShortcutsComponent,
                children: [
                    { path: '', redirectTo: 'no-emu', pathMatch: 'full' },
                    { path: 'no-emu', component: no_emu_component_1.NoEmuComponent },
                    { path: 'diver', component: diver_component_1.DiverComponent },
                    { path: 'spell', component: spell_component_1.SpellComponent },
                    { path: 'item', component: item_component_1.ItemComponent },
                    { path: 'interface', component: interface_component_1.InterfaceComponent }
                ]
            },
            {
                path: 'notification',
                component: notification_component_1.NotificationComponent
            },
            {
                path: 'vip',
                component: vip_component_1.VipComponent,
                children: [
                    { path: '', redirectTo: 'general', pathMatch: 'full' },
                    { path: 'general', component: general_component_2.GeneralComponent },
                    { path: 'auto-group', component: auto_group_component_1.AutoGroupComponent },
                    { path: 'multi-account', component: multi_account_component_1.MultiAccountComponent },
                    { path: 'status', component: status_component_1.StatusComponent }
                ]
            },
        ]
    }
];
exports.OptionRoutingModule = router_1.RouterModule.forChild(routes);

//# sourceMappingURL=option.routing.js.map
