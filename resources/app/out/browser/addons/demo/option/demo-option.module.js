"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const demo_routing_option_module_1 = require("./demo-routing-option.module");
const demo_option_component_1 = require("./demo-option.component");
let DemoModule = class DemoModule {
};
DemoModule = __decorate([
    core_1.NgModule({
        declarations: [demo_option_component_1.DemoComponent],
        imports: [demo_routing_option_module_1.DemoRoutingModule],
    })
], DemoModule);
exports.DemoModule = DemoModule;

//# sourceMappingURL=demo-option.module.js.map
