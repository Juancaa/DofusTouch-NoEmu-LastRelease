"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const platform_browser_dynamic_1 = require("@angular/platform-browser-dynamic");
const app_module_1 = require("./app.module");
const core_1 = require("@angular/core");
const { Application } = global.nodeRequire('electron').remote.require('./application');
if (Application.cmdOptions.devmode) {
    console.info('- No-Emu is in dev mode');
}
else {
    console.info('- No-Emu is in prod mode');
    core_1.enableProdMode();
}
platform_browser_dynamic_1.platformBrowserDynamic().bootstrapModule(app_module_1.AppModule);

//# sourceMappingURL=main.js.map
