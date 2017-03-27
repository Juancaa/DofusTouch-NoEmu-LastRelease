"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("@angular/router");
const routes = [
    {
        path: '', redirectTo: 'main', pathMatch: 'full'
    },
    {
        path: 'option',
        loadChildren: './app/option/option.module#OptionModule'
    },
    {
        path: 'changelog',
        loadChildren: './app/changelog/changelog.module#ChangeLogModule'
    },
    {
        path: 'update',
        loadChildren: './app/update/update.module#UpdateModule'
    },
    {
        path: 'main',
        loadChildren: './app/main/main.module#MainModule'
    },
    {
        path: 'prompt-password',
        loadChildren: './app/prompt-password/prompt-password.module#PromptPasswordModule'
    },
];
exports.routing = router_1.RouterModule.forRoot(routes, { useHash: true });

//# sourceMappingURL=app.routing.js.map
