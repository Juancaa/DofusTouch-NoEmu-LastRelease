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
const crypt_service_1 = require("../../../../shared/utils/crypt.service");
const prompt_service_1 = require("../../../../shared/utils/prompt.service");
const ng2_translate_1 = require("ng2-translate");
const { shell } = global.nodeRequire('electron').remote;
let MultiAccountComponent = class MultiAccountComponent {
    constructor(settingsService, applicationService, crypt, translate, promptService) {
        this.settingsService = settingsService;
        this.applicationService = applicationService;
        this.crypt = crypt;
        this.translate = translate;
        this.promptService = promptService;
        this.inputCheckMasterPassword = "";
        this.inputCheckMasterPasswordError = false;
        this.windows = settingsService.option.vip.multiaccount.windows;
    }
    hasPassword() {
        return this.settingsService.option.vip.multiaccount.master_password != "";
    }
    setMasterPassword() {
        let self = this;
        self.promptService.custom({
            input: 'password',
            title: this.translate.instant("app.option.vip.multi-account.prompt.add-master.title"),
            confirmButtonText: this.translate.instant("app.option.vip.multi-account.prompt.add-master.confirm"),
            showLoaderOnConfirm: true,
            showCancelButton: true,
            cancelButtonText: this.translate.instant("app.option.vip.multi-account.prompt.add-master.cancel"),
            preConfirm: function (masterPassword) {
                return new Promise(function (resolve, reject) {
                    if (masterPassword.length < 8) {
                        reject(self.translate.instant("app.option.vip.multi-account.prompt.add-master.min-lenght", { "lenght": 8 }));
                        return false;
                    }
                    self.applicationService.masterpassword = masterPassword;
                    self.settingsService.option.vip.multiaccount.master_password = self.crypt.createHash(masterPassword);
                    self.settingsService.option.vip.multiaccount.active = true;
                    resolve();
                });
            },
        }).then(function (vipId) {
            self.promptService.success({ html: self.translate.instant("app.option.vip.multi-account.prompt.add-master.success-text") });
        }, (dismiss) => { });
    }
    updateMasterPassword() {
        let self = this;
        self.promptService.custom({
            title: this.translate.instant("app.option.vip.multi-account.prompt.edit-master.title"),
            html: '<input type="password" id="input-old-password" class="swal2-input" placeholder="' + this.translate.instant("app.option.vip.multi-account.prompt.edit-master.input-old-placeholder") + '">' +
                '<input type="password" id="input-new-password" class="swal2-input" placeholder="' + this.translate.instant("app.option.vip.multi-account.prompt.edit-master.input-new-placeholder") + '">',
            confirmButtonText: this.translate.instant("app.option.vip.multi-account.prompt.edit-master.confirm"),
            showLoaderOnConfirm: true,
            showCancelButton: true,
            cancelButtonText: this.translate.instant("app.option.vip.multi-account.prompt.edit-master.cancel"),
            preConfirm: function () {
                return new Promise(function (resolve, reject) {
                    let oldPassword = document.getElementById("input-old-password").value;
                    let newPassword = document.getElementById("input-new-password").value;
                    if (newPassword.length < 8) {
                        reject(self.translate.instant("app.option.vip.multi-account.prompt.edit-master.min-lenght", { "lenght": 8 }));
                        return false;
                    }
                    if (self.settingsService.option.vip.multiaccount.master_password != self.crypt.createHash(oldPassword)) {
                        reject(self.translate.instant("app.option.vip.multi-account.prompt.edit-master.incorrect-old"));
                        return false;
                    }
                    let windows = self.settingsService.option.vip.multiaccount.windows;
                    for (let i in windows) {
                        for (let j in windows[i]) {
                            let account_name = self.crypt.decrypt(windows[i][j].account_name_encrypted, oldPassword);
                            let password = self.crypt.decrypt(windows[i][j].password_encrypted, oldPassword);
                            windows[i][j] = {
                                account_name_encrypted: self.crypt.encrypt(account_name, newPassword),
                                password_encrypted: self.crypt.encrypt(password, newPassword),
                            };
                        }
                    }
                    self.settingsService.option.vip.multiaccount.windows = windows;
                    self.settingsService.option.vip.multiaccount.master_password = self.crypt.createHash(newPassword);
                    self.applicationService.masterpassword = newPassword;
                    resolve();
                });
            },
        }).then(function (vipId) {
            self.promptService.success({ html: self.translate.instant("app.option.vip.multi-account.prompt.edit-master.success-text") });
        }, (dismiss) => { });
    }
    checkMasterPassword() {
        console.log(this.inputCheckMasterPassword);
        if (this.settingsService.option.vip.multiaccount.master_password == this.crypt.createHash(this.inputCheckMasterPassword)) {
            this.inputCheckMasterPasswordError = false;
            this.applicationService.masterpassword = this.inputCheckMasterPassword;
        }
        else {
            this.inputCheckMasterPasswordError = true;
        }
    }
    addAccount(windowIndex) {
        let self = this;
        let remote = shell;
        let windows = this.settingsService.option.vip.multiaccount.windows;
        if (this.applicationService.vipStatus < 3 && this.getTotalAccounts(windows) >= 4) {
            this.promptService.custom({
                type: "error",
                title: this.translate.instant("app.option.vip.multi-account.prompt.maximum-account.title"),
                html: this.translate.instant("app.option.vip.multi-account.prompt.maximum-account.text"),
                confirmButtonText: this.translate.instant("app.option.vip.multi-account.prompt.maximum-account.confirm"),
                confirmButtonClass: 'btn btn-primary flat btn-lg spacing-left',
                showCancelButton: true,
                cancelButtonText: this.translate.instant("app.option.vip.multi-account.prompt.maximum-account.cancel"),
                cancelButtonClass: 'btn btn-default flat btn-lg'
            }).then(function () {
                remote.openExternal('https://www.tipeee.com/dtne');
            }, (dismiss) => { });
            return false;
        }
        self.promptService.custom({
            title: this.translate.instant("app.option.vip.multi-account.prompt.add-account.title"),
            html: '<input type="text" id="input-account-login" class="swal2-input" placeholder="' + this.translate.instant("app.option.vip.multi-account.prompt.add-account.input-login-placeholder") + '">' +
                '<input type="password" id="input-account-password" class="swal2-input" placeholder="' + this.translate.instant("app.option.vip.multi-account.prompt.add-account.input-password-placeholder") + '">',
            confirmButtonText: this.translate.instant("app.option.vip.multi-account.prompt.add-account.confirm"),
            showLoaderOnConfirm: true,
            showCancelButton: true,
            cancelButtonText: this.translate.instant("app.option.vip.multi-account.prompt.add-account.cancel"),
            preConfirm: function () {
                return new Promise(function (resolve, reject) {
                    let accountLogin = document.getElementById("input-account-login").value;
                    let accountPassword = document.getElementById("input-account-password").value;
                    if (accountLogin == "") {
                        reject(self.translate.instant("app.option.vip.multi-account.prompt.add-account.min-lenght-login"));
                        return false;
                    }
                    if (accountPassword == "") {
                        reject(self.translate.instant("app.option.vip.multi-account.prompt.add-account.min-lenght-password"));
                        return false;
                    }
                    windows[windowIndex].push({
                        account_name_encrypted: self.crypt.encrypt(accountLogin, self.applicationService.masterpassword),
                        password_encrypted: self.crypt.encrypt(accountPassword, self.applicationService.masterpassword)
                    });
                    self.settingsService.option.vip.multiaccount.windows = windows;
                    resolve();
                });
            },
        }).then(function () { }, (dismiss) => { });
    }
    deleteAccount(windowIndex, accountIndex) {
        let windows = this.settingsService.option.vip.multiaccount.windows;
        windows[windowIndex].splice(accountIndex, 1);
        this.settingsService.option.vip.multiaccount.windows = windows;
    }
    modifyAccount(windowIndex, accountIndex, account_name_encrypted) {
        let self = this;
        let login = self.crypt.decrypt(account_name_encrypted, self.applicationService.masterpassword);
        let windows = self.settingsService.option.vip.multiaccount.windows;
        self.promptService.custom({
            title: this.translate.instant("app.option.vip.multi-account.prompt.edit-account.title"),
            html: '<input type="text" id="input-account-login" value="' + login + '" class="swal2-input" placeholder="' + this.translate.instant("app.option.vip.multi-account.prompt.edit-account.input-login-placeholder") + '"  >' +
                '<input type="password" id="input-account-password" class="swal2-input" placeholder="' + this.translate.instant("app.option.vip.multi-account.prompt.edit-account.input-password-placeholder") + '">',
            confirmButtonText: this.translate.instant("app.option.vip.multi-account.prompt.edit-account.confirm"),
            showLoaderOnConfirm: true,
            showCancelButton: true,
            cancelButtonText: this.translate.instant("app.option.vip.multi-account.prompt.edit-account.cancel"),
            preConfirm: function () {
                return new Promise(function (resolve, reject) {
                    let accountLogin = document.getElementById("input-account-login").value;
                    let accountPassword = document.getElementById("input-account-password").value;
                    if (accountLogin == "") {
                        reject(self.translate.instant("app.option.vip.multi-account.prompt.edit-account.min-lenght-login"));
                        return false;
                    }
                    if (accountPassword == "") {
                        reject(self.translate.instant("app.option.vip.multi-account.prompt.edit-account.min-lenght-password"));
                        return false;
                    }
                    windows[windowIndex][accountIndex].account_name_encrypted = self.crypt.encrypt(accountLogin, self.applicationService.masterpassword);
                    windows[windowIndex][accountIndex].password_encrypted = self.crypt.encrypt(accountPassword, self.applicationService.masterpassword);
                    self.settingsService.option.vip.multiaccount.windows = windows;
                    resolve();
                });
            },
        }).then(function () { }, (dismiss) => { });
    }
    getTotalAccounts(windows) {
        let total = 0;
        windows.forEach((window) => {
            total += window.length;
        });
        return total;
    }
    addWindow() {
        let windows = this.settingsService.option.vip.multiaccount.windows;
        windows.push([]);
        this.settingsService.option.vip.multiaccount.windows = windows;
    }
    deleteWindow(windowIndex) {
        let windows = this.settingsService.option.vip.multiaccount.windows;
        windows.splice(windowIndex, 1);
        if (windows.length == 0)
            this.windows.push([]);
        this.settingsService.option.vip.multiaccount.windows = windows;
    }
};
MultiAccountComponent = __decorate([
    core_1.Component({
        templateUrl: 'app/option/vip/multi-account/multi-account.component.html',
        styleUrls: ['app/option/vip/multi-account/multi-account.component.css']
    }),
    __metadata("design:paramtypes", [settings_service_1.SettingsService,
        application_service_1.ApplicationService,
        crypt_service_1.CryptService,
        ng2_translate_1.TranslateService,
        prompt_service_1.PromptService])
], MultiAccountComponent);
exports.MultiAccountComponent = MultiAccountComponent;

//# sourceMappingURL=multi-account.component.js.map
