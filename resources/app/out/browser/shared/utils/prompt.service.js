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
const sweetalert2_1 = require("sweetalert2");
const ng2_translate_1 = require("ng2-translate");
const core_1 = require("@angular/core");
let PromptService = class PromptService {
    constructor(translate) {
        this.translate = translate;
        sweetalert2_1.default.setDefaults({
            buttonsStyling: false,
            reverseButtons: true,
            allowOutsideClick: false,
            confirmButtonClass: 'btn btn-primary flat btn-lg spacing-left',
            cancelButtonClass: 'btn btn-danger flat btn-lg'
        });
    }
    close() { sweetalert2_1.default.close(); }
    custom(options) {
        sweetalert2_1.default.setDefaults({
            type: undefined
        });
        return sweetalert2_1.default(options);
    }
    confirm(options) {
        sweetalert2_1.default.setDefaults({
            type: "question",
            title: this.translate.instant("app.prompt.title.confirm"),
            confirmButtonText: this.translate.instant("app.prompt.button.confirm"),
            confirmButtonClass: 'btn btn-primary flat btn-lg spacing-left',
            showCancelButton: true,
            cancelButtonText: this.translate.instant("app.prompt.button.cancel"),
            cancelButtonClass: 'btn btn-danger flat btn-lg',
        });
        return sweetalert2_1.default(options);
    }
    info(options) {
        sweetalert2_1.default.setDefaults({
            type: "info",
            title: this.translate.instant("app.prompt.title.info"),
            confirmButtonText: this.translate.instant("app.prompt.button.close"),
            showCancelButton: false
        });
        return sweetalert2_1.default(options);
    }
    success(options) {
        sweetalert2_1.default.setDefaults({
            type: "success",
            title: this.translate.instant("app.prompt.title.success"),
            confirmButtonText: this.translate.instant("app.prompt.button.close"),
            showCancelButton: false
        });
        return sweetalert2_1.default(options);
    }
    alert(options) {
        sweetalert2_1.default.setDefaults({
            type: "error",
            title: this.translate.instant("app.prompt.title.error"),
            confirmButtonText: this.translate.instant("app.prompt.button.close"),
            showCancelButton: false
        });
        return sweetalert2_1.default(options);
    }
};
PromptService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [ng2_translate_1.TranslateService])
], PromptService);
exports.PromptService = PromptService;

//# sourceMappingURL=prompt.service.js.map
