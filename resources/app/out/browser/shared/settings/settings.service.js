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
const ipcrenderer_service_1 = require("../electron/ipcrenderer.service");
const settings = global.nodeRequire('electron-settings');
class Option {
    constructor(ipcRendererService) {
        this.ipcRendererService = ipcRendererService;
        this.general = new Option.General(ipcRendererService);
        this.shortcuts = new Option.Shortcuts(ipcRendererService);
        this.notification = new Option.Notification(ipcRendererService);
        this.vip = new Option.VIP(ipcRendererService);
    }
}
exports.Option = Option;
(function (Option) {
    class Shortcuts {
        constructor(ipcRendererService) {
            this.ipcRendererService = ipcRendererService;
            this.no_emu = new Shortcuts.NoEmu(ipcRendererService);
            this.diver = new Shortcuts.Diver(ipcRendererService);
            this.interface = new Shortcuts.Interface(ipcRendererService);
            this._spell = this.ipcRendererService.sendSync('read-settings', 'option.shortcuts.spell');
            this._item = this.ipcRendererService.sendSync('read-settings', 'option.shortcuts.item');
        }
        get spell() {
            let self = this;
            return new Proxy(this._spell, {
                get: function (target, name) {
                    return target[name];
                },
                set(target, prop, value) {
                    target[prop] = value;
                    self.ipcRendererService.send('write-settings', 'option.shortcuts.spell', target);
                    return true;
                }
            });
        }
        set spell(spell) {
            this.ipcRendererService.send('write-settings', 'option.shortcuts.spell', spell);
            this._spell = spell;
        }
        get item() {
            let self = this;
            return new Proxy(this._item, {
                get: function (target, name) {
                    return target[name];
                },
                set(target, prop, value) {
                    target[prop] = value;
                    self.ipcRendererService.send('write-settings', 'option.shortcuts.item', target);
                    return true;
                }
            });
        }
        set item(item) {
            this.ipcRendererService.send('write-settings', 'option.shortcuts.item', item);
            this._item = item;
        }
    }
    Option.Shortcuts = Shortcuts;
    (function (Shortcuts) {
        class Interface {
            constructor(ipcRendererService) {
                this.ipcRendererService = ipcRendererService;
                this._carac = this.ipcRendererService.sendSync('read-settings', 'option.shortcuts.interface.carac');
                this._spell = this.ipcRendererService.sendSync('read-settings', 'option.shortcuts.interface.spell');
                this._bag = this.ipcRendererService.sendSync('read-settings', 'option.shortcuts.interface.bag');
                this._bidhouse = this.ipcRendererService.sendSync('read-settings', 'option.shortcuts.interface.bidhouse');
                this._map = this.ipcRendererService.sendSync('read-settings', 'option.shortcuts.interface.map');
                this._friend = this.ipcRendererService.sendSync('read-settings', 'option.shortcuts.interface.friend');
                this._book = this.ipcRendererService.sendSync('read-settings', 'option.shortcuts.interface.book');
                this._guild = this.ipcRendererService.sendSync('read-settings', 'option.shortcuts.interface.guild');
                this._conquest = this.ipcRendererService.sendSync('read-settings', 'option.shortcuts.interface.conquest');
                this._job = this.ipcRendererService.sendSync('read-settings', 'option.shortcuts.interface.job');
                this._alliance = this.ipcRendererService.sendSync('read-settings', 'option.shortcuts.interface.alliance');
                this._mount = this.ipcRendererService.sendSync('read-settings', 'option.shortcuts.interface.mount');
                this._directory = this.ipcRendererService.sendSync('read-settings', 'option.shortcuts.interface.directory');
                this._alignement = this.ipcRendererService.sendSync('read-settings', 'option.shortcuts.interface.alignement');
                this._bestiary = this.ipcRendererService.sendSync('read-settings', 'option.shortcuts.interface.bestiary');
                this._title = this.ipcRendererService.sendSync('read-settings', 'option.shortcuts.interface.title');
                this._achievement = this.ipcRendererService.sendSync('read-settings', 'option.shortcuts.interface.achievement');
                this._almanax = this.ipcRendererService.sendSync('read-settings', 'option.shortcuts.interface.almanax');
                this._spouse = this.ipcRendererService.sendSync('read-settings', 'option.shortcuts.interface.spouse');
                this._shop = this.ipcRendererService.sendSync('read-settings', 'option.shortcuts.interface.shop');
                this._goultine = this.ipcRendererService.sendSync('read-settings', 'option.shortcuts.interface.goultine');
            }
            get carac() {
                return this._carac;
            }
            set carac(carac) {
                this.ipcRendererService.send('write-settings', 'option.shortcuts.interface.carac', carac);
                this._carac = carac;
            }
            get spell() {
                return this._spell;
            }
            set spell(spell) {
                this.ipcRendererService.send('write-settings', 'option.shortcuts.interface.spell', spell);
                this._spell = spell;
            }
            get bag() {
                return this._bag;
            }
            set bag(bag) {
                this.ipcRendererService.send('write-settings', 'option.shortcuts.interface.bag', bag);
                this._bag = bag;
            }
            get bidhouse() {
                return this._bidhouse;
            }
            set bidhouse(bidhouse) {
                this.ipcRendererService.send('write-settings', 'option.shortcuts.interface.bidhouse', bidhouse);
                this._bidhouse = bidhouse;
            }
            get map() {
                return this._map;
            }
            set map(map) {
                this.ipcRendererService.send('write-settings', 'option.shortcuts.interface.map', map);
                this._map = map;
            }
            get friend() {
                return this._friend;
            }
            set friend(friend) {
                this.ipcRendererService.send('write-settings', 'option.shortcuts.interface.friend', friend);
                this._friend = friend;
            }
            get book() {
                return this._book;
            }
            set book(book) {
                this.ipcRendererService.send('write-settings', 'option.shortcuts.interface.book', book);
                this._book = book;
            }
            get guild() {
                return this._guild;
            }
            set guild(guild) {
                this.ipcRendererService.send('write-settings', 'option.shortcuts.interface.guild', guild);
                this._guild = guild;
            }
            get conquest() {
                return this._conquest;
            }
            set conquest(conquest) {
                this.ipcRendererService.send('write-settings', 'option.shortcuts.interface.conquest', conquest);
                this._conquest = conquest;
            }
            get job() {
                return this._job;
            }
            set job(job) {
                this.ipcRendererService.send('write-settings', 'option.shortcuts.interface.job', job);
                this._job = job;
            }
            get alliance() {
                return this._alliance;
            }
            set alliance(alliance) {
                this.ipcRendererService.send('write-settings', 'option.shortcuts.interface.alliance', alliance);
                this._alliance = alliance;
            }
            get mount() {
                return this._mount;
            }
            set mount(mount) {
                this.ipcRendererService.send('write-settings', 'option.shortcuts.interface.mount', mount);
                this._mount = mount;
            }
            get directory() {
                return this._directory;
            }
            set directory(directory) {
                this.ipcRendererService.send('write-settings', 'option.shortcuts.interface.directory', directory);
                this._directory = directory;
            }
            get alignement() {
                return this._alignement;
            }
            set alignement(alignement) {
                this.ipcRendererService.send('write-settings', 'option.shortcuts.interface.alignement', alignement);
                this._alignement = alignement;
            }
            get bestiary() {
                return this._bestiary;
            }
            set bestiary(bestiary) {
                this.ipcRendererService.send('write-settings', 'option.shortcuts.interface.bestiary', bestiary);
                this._bestiary = bestiary;
            }
            get title() {
                return this._title;
            }
            set title(title) {
                this.ipcRendererService.send('write-settings', 'option.shortcuts.interface.title', title);
                this._title = title;
            }
            get achievement() {
                return this._achievement;
            }
            set achievement(achievement) {
                this.ipcRendererService.send('write-settings', 'option.shortcuts.interface.achievement', achievement);
                this._achievement = achievement;
            }
            get almanax() {
                return this._almanax;
            }
            set almanax(almanax) {
                this.ipcRendererService.send('write-settings', 'option.shortcuts.interface.almanax', almanax);
                this._almanax = almanax;
            }
            get spouse() {
                return this._spouse;
            }
            set spouse(spouse) {
                this.ipcRendererService.send('write-settings', 'option.shortcuts.interface.spouse', spouse);
                this._spouse = spouse;
            }
            get shop() {
                return this._shop;
            }
            set shop(shop) {
                this.ipcRendererService.send('write-settings', 'option.shortcuts.interface.shop', shop);
                this._shop = shop;
            }
            get goultine() {
                return this._goultine;
            }
            set goultine(goultine) {
                this.ipcRendererService.send('write-settings', 'option.shortcuts.interface.goultine', goultine);
                this._goultine = goultine;
            }
            getAll() {
                let tab = [];
                for (let prop in this) {
                    let newProp = prop.replace('_', '');
                    tab.push({
                        key: newProp,
                        value: this[prop]
                    });
                }
                return tab;
            }
        }
        Shortcuts.Interface = Interface;
        class NoEmu {
            constructor(ipcRendererService) {
                this.ipcRendererService = ipcRendererService;
                this.new_tab = this.ipcRendererService.sendSync('read-settings', 'option.shortcuts.no_emu.new_tab');
                this.new_window = this.ipcRendererService.sendSync('read-settings', 'option.shortcuts.no_emu.new_window');
                this.next_tab = this.ipcRendererService.sendSync('read-settings', 'option.shortcuts.no_emu.next_tab');
                this.prev_tab = this.ipcRendererService.sendSync('read-settings', 'option.shortcuts.no_emu.prev_tab');
                this.activ_tab = this.ipcRendererService.sendSync('read-settings', 'option.shortcuts.no_emu.activ_tab');
                this.tabs = this.ipcRendererService.sendSync('read-settings', 'option.shortcuts.no_emu.tabs');
            }
            get new_tab() {
                return this._new_tab;
            }
            set new_tab(new_tab) {
                this.ipcRendererService.send('write-settings', 'option.shortcuts.no_emu.new_tab', new_tab);
                this._new_tab = new_tab;
            }
            get new_window() {
                return this._new_window;
            }
            set new_window(new_window) {
                this.ipcRendererService.send('write-settings', 'option.shortcuts.no_emu.new_window', new_window);
                this._new_window = new_window;
            }
            get next_tab() {
                return this._next_tab;
            }
            set next_tab(next_tab) {
                this.ipcRendererService.send('write-settings', 'option.shortcuts.no_emu.next_tab', next_tab);
                this._next_tab = next_tab;
            }
            get prev_tab() {
                return this._prev_tab;
            }
            set prev_tab(prev_tab) {
                this.ipcRendererService.send('write-settings', 'option.shortcuts.no_emu.prev_tab', prev_tab);
                this._prev_tab = prev_tab;
            }
            get activ_tab() {
                return this._activ_tab;
            }
            set activ_tab(activ_tab) {
                this.ipcRendererService.send('write-settings', 'option.shortcuts.no_emu.activ_tab', activ_tab);
                this._activ_tab = activ_tab;
            }
            get tabs() {
                let self = this;
                return new Proxy(this._tabs, {
                    get: function (target, name) {
                        return target[name];
                    },
                    set(target, prop, value) {
                        target[prop] = value;
                        self.ipcRendererService.send('write-settings', 'option.shortcuts.no_emu.tabs', target);
                        return true;
                    }
                });
            }
            set tabs(tabs) {
                this.ipcRendererService.send('write-settings', 'option.shortcuts.no_emu.tabs', tabs);
                this._tabs = tabs;
            }
        }
        Shortcuts.NoEmu = NoEmu;
        class Diver {
            constructor(ipcRendererService) {
                this.ipcRendererService = ipcRendererService;
                this.end_turn = this.ipcRendererService.sendSync('read-settings', 'option.shortcuts.diver.end_turn');
                this.open_chat = this.ipcRendererService.sendSync('read-settings', 'option.shortcuts.diver.open_chat');
            }
            get end_turn() {
                return this._end_turn;
            }
            set end_turn(end_turn) {
                this.ipcRendererService.send('write-settings', 'option.shortcuts.diver.end_turn', end_turn);
                this._end_turn = end_turn;
            }
            get open_chat() {
                return this._open_chat;
            }
            set open_chat(open_chat) {
                this.ipcRendererService.send('write-settings', 'option.shortcuts.diver.open_chat', open_chat);
                this._open_chat = open_chat;
            }
        }
        Shortcuts.Diver = Diver;
    })(Shortcuts = Option.Shortcuts || (Option.Shortcuts = {}));
    class General {
        constructor(ipcRendererService) {
            this.ipcRendererService = ipcRendererService;
            this.hidden_shop = this.ipcRendererService.sendSync('read-settings', 'option.general.hidden_shop');
            this.hidden_tabs = this.ipcRendererService.sendSync('read-settings', 'option.general.hidden_tabs');
            this.resolution = this.ipcRendererService.sendSync('read-settings', 'option.general.resolution');
            this.local_content = this.ipcRendererService.sendSync('read-settings', 'option.general.local_content');
        }
        get hidden_shop() {
            return this._hidden_shop;
        }
        set hidden_shop(hidden_shop) {
            this.ipcRendererService.send('write-settings', 'option.general.hidden_shop', hidden_shop);
            this._hidden_shop = hidden_shop;
        }
        get hidden_tabs() {
            return this._hidden_tabs;
        }
        set hidden_tabs(hidden_tabs) {
            this.ipcRendererService.send('write-settings', 'option.general.hidden_tabs', hidden_tabs);
            this._hidden_tabs = hidden_tabs;
        }
        get resolution() {
            return this._resolution;
        }
        set resolution(resolution) {
            this.ipcRendererService.send('write-settings', 'option.general.resolution', resolution);
            this._resolution = resolution;
        }
        get local_content() {
            return this._local_content;
        }
        set local_content(local_content) {
            this.ipcRendererService.send('write-settings', 'option.general.local_content', local_content);
            this._local_content = local_content;
        }
    }
    Option.General = General;
    class Notification {
        constructor(ipcRendererService) {
            this.ipcRendererService = ipcRendererService;
            this.fight_turn = this.ipcRendererService.sendSync('read-settings', 'option.notification.fight_turn');
            this.private_message = this.ipcRendererService.sendSync('read-settings', 'option.notification.private_message');
            this.tax_collector = this.ipcRendererService.sendSync('read-settings', 'option.notification.tax_collector');
            this.kolizeum = this.ipcRendererService.sendSync('read-settings', 'option.notification.kolizeum');
            this.party_invitation = this.ipcRendererService.sendSync('read-settings', 'option.notification.party_invitation');
            this.aggression = this.ipcRendererService.sendSync('read-settings', 'option.notification.aggression');
            this.focus_fight_turn = this.ipcRendererService.sendSync('read-settings', 'option.notification.focus_fight_turn');
        }
        get private_message() {
            return this._private_message;
        }
        set private_message(private_message) {
            this.ipcRendererService.send('write-settings', 'option.notification.private_message', private_message);
            this._private_message = private_message;
        }
        get fight_turn() {
            return this._fight_turn;
        }
        set fight_turn(fight_turn) {
            this.ipcRendererService.send('write-settings', 'option.notification.fight_turn', fight_turn);
            this._fight_turn = fight_turn;
        }
        get tax_collector() {
            return this._tax_collector;
        }
        set tax_collector(tax_collector) {
            this.ipcRendererService.send('write-settings', 'option.notification.tax_collector', tax_collector);
            this._tax_collector = tax_collector;
        }
        get kolizeum() {
            return this._kolizeum;
        }
        set kolizeum(kolizeum) {
            this.ipcRendererService.send('write-settings', 'option.notification.kolizeum', kolizeum);
            this._kolizeum = kolizeum;
        }
        get party_invitation() {
            return this._party_invitation;
        }
        set party_invitation(party_invitation) {
            this.ipcRendererService.send('write-settings', 'option.notification.party_invitation', party_invitation);
            this._party_invitation = party_invitation;
        }
        get aggression() {
            return this._aggression;
        }
        set aggression(aggression) {
            this.ipcRendererService.send('write-settings', 'option.notification.aggression', aggression);
            this._aggression = aggression;
        }
        get focus_fight_turn() {
            return this._focus_fight_turn;
        }
        set focus_fight_turn(focus_fight_turn) {
            this.ipcRendererService.send('write-settings', 'option.notification.focus_fight_turn', focus_fight_turn);
            this._focus_fight_turn = focus_fight_turn;
        }
    }
    Option.Notification = Notification;
    class VIP {
        constructor(ipcRendererService) {
            this.ipcRendererService = ipcRendererService;
            this.general = new VIP.General(ipcRendererService);
            this.autogroup = new VIP.AutoGroup(ipcRendererService);
            this.multiaccount = new VIP.MultiAccount(ipcRendererService);
        }
    }
    Option.VIP = VIP;
    (function (VIP) {
        class General {
            constructor(ipcRendererService) {
                this.ipcRendererService = ipcRendererService;
                this.disable_inactivity = this.ipcRendererService.sendSync('read-settings', 'option.vip.general.disable_inactivity');
                this.health_bar = this.ipcRendererService.sendSync('read-settings', 'option.vip.general.health_bar');
                this.health_bar_shortcut = this.ipcRendererService.sendSync('read-settings', 'option.vip.general.health_bar_shortcut');
                this.estimator = this.ipcRendererService.sendSync('read-settings', 'option.vip.general.estimator');
            }
            get estimator() {
                return this._estimator;
            }
            set estimator(estimator) {
                this.ipcRendererService.send('write-settings', 'option.vip.general.estimator', estimator);
                this._estimator = estimator;
            }
            get disable_inactivity() {
                return this._disable_inactivity;
            }
            set disable_inactivity(disable_inactivity) {
                this.ipcRendererService.send('write-settings', 'option.vip.general.disable_inactivity', disable_inactivity);
                this._disable_inactivity = disable_inactivity;
            }
            get health_bar() {
                return this._health_bar;
            }
            set health_bar(health_bar) {
                this.ipcRendererService.send('write-settings', 'option.vip.general.health_bar', health_bar);
                this._health_bar = health_bar;
            }
            get health_bar_shortcut() {
                return this._health_bar_shortcut;
            }
            set health_bar_shortcut(health_bar_shortcut) {
                this.ipcRendererService.send('write-settings', 'option.vip.general.health_bar_shortcut', health_bar_shortcut);
                this._health_bar_shortcut = health_bar_shortcut;
            }
        }
        VIP.General = General;
        class AutoGroup {
            constructor(ipcRendererService) {
                this.ipcRendererService = ipcRendererService;
                this.active = this.ipcRendererService.sendSync('read-settings', 'option.vip.auto_group.active');
                this.leader = this.ipcRendererService.sendSync('read-settings', 'option.vip.auto_group.leader');
                this.members = this.ipcRendererService.sendSync('read-settings', 'option.vip.auto_group.members');
                this.follow_leader = this.ipcRendererService.sendSync('read-settings', 'option.vip.auto_group.follow_leader');
                this.leader = this.ipcRendererService.sendSync('read-settings', 'option.vip.auto_group.leader');
                this.ready = this.ipcRendererService.sendSync('read-settings', 'option.vip.auto_group.ready');
                this.delay = this.ipcRendererService.sendSync('read-settings', 'option.vip.auto_group.delay');
                this.fight = this.ipcRendererService.sendSync('read-settings', 'option.vip.auto_group.fight');
                this.random_move = this.ipcRendererService.sendSync('read-settings', 'option.vip.auto_group.random_move');
            }
            get active() {
                return this._active;
            }
            set active(active) {
                this.ipcRendererService.send('write-settings', 'option.vip.auto_group.active', active);
                this._active = active;
            }
            get leader() {
                return this._leader;
            }
            set leader(leader) {
                this.ipcRendererService.send('write-settings', 'option.vip.auto_group.leader', leader);
                this._leader = leader;
            }
            get members() {
                return this._members;
            }
            set members(members) {
                this.ipcRendererService.send('write-settings', 'option.vip.auto_group.members', members);
                this._members = members;
            }
            get follow_leader() {
                return this._follow_leader;
            }
            set follow_leader(follow_leader) {
                this.ipcRendererService.send('write-settings', 'option.vip.auto_group.follow_leader', follow_leader);
                this._follow_leader = follow_leader;
            }
            get ready() {
                return this._ready;
            }
            set ready(ready) {
                this.ipcRendererService.send('write-settings', 'option.vip.auto_group.ready', ready);
                this._ready = ready;
            }
            get delay() {
                return this._delay;
            }
            set delay(delay) {
                this.ipcRendererService.send('write-settings', 'option.vip.auto_group.delay', delay);
                this._delay = delay;
            }
            get fight() {
                return this._fight;
            }
            set fight(fight) {
                this.ipcRendererService.send('write-settings', 'option.vip.auto_group.fight', fight);
                this._fight = fight;
            }
            get random_move() {
                return this._random_move;
            }
            set random_move(random_move) {
                this.ipcRendererService.send('write-settings', 'option.vip.auto_group.random_move', random_move);
                this._random_move = random_move;
            }
        }
        VIP.AutoGroup = AutoGroup;
        class MultiAccount {
            constructor(ipcRendererService) {
                this.ipcRendererService = ipcRendererService;
                this.active = this.ipcRendererService.sendSync('read-settings', 'option.vip.multi_account.active');
                this.master_password = this.ipcRendererService.sendSync('read-settings', 'option.vip.multi_account.master_password');
                this.windows = this.ipcRendererService.sendSync('read-settings', 'option.vip.multi_account.windows');
            }
            get active() {
                return this._active;
            }
            set active(active) {
                this.ipcRendererService.send('write-settings', 'option.vip.multi_account.active', active);
                this._active = active;
            }
            get master_password() {
                return this._master_password;
            }
            set master_password(active) {
                this.ipcRendererService.send('write-settings', 'option.vip.multi_account.master_password', active);
                this._master_password = active;
            }
            get windows() {
                return this._windows;
            }
            set windows(windows) {
                this.ipcRendererService.send('write-settings', 'option.vip.multi_account.windows', windows);
                this._windows = windows;
            }
        }
        VIP.MultiAccount = MultiAccount;
    })(VIP = Option.VIP || (Option.VIP = {}));
})(Option = exports.Option || (exports.Option = {}));
let SettingsService = class SettingsService {
    constructor(ipcRendererService) {
        this.ipcRendererService = ipcRendererService;
        let init = () => {
            this.option = new Option(ipcRendererService);
            this._appVersion = this.ipcRendererService.sendSync('read-settings', 'appVersion');
            this._buildVersion = this.ipcRendererService.sendSync('read-settings', 'buildVersion');
            this._alertCounter = this.ipcRendererService.sendSync('read-settings', 'alertCounter');
            this._language = this.ipcRendererService.sendSync('read-settings', 'language');
            this._vip_id = this.ipcRendererService.sendSync('read-settings', 'vip_id');
            this._last_news = this.ipcRendererService.sendSync('read-settings', 'last_news');
        };
        init();
        this.ipcRendererService.on('reload-settings', () => {
            console.log('receive->reload-settings');
            init();
            console.log('emit->reload-settings-done');
            this.ipcRendererService.send('reload-settings-done');
        });
    }
    get last_news() {
        return this._last_news;
    }
    set last_news(last_news) {
        this.ipcRendererService.send('write-settings', 'last_news', last_news);
        this._last_news = last_news;
    }
    get vip_id() {
        return this._vip_id;
    }
    set vip_id(vip_id) {
        this.ipcRendererService.send('write-settings', 'vip_id', vip_id);
        this._vip_id = vip_id;
    }
    get alertCounter() {
        return this._alertCounter;
    }
    set alertCounter(alertCounter) {
        this.ipcRendererService.send('write-settings', 'alertCounter', alertCounter);
        this._alertCounter = alertCounter;
    }
    get buildVersion() {
        return this._buildVersion;
    }
    set buildVersion(buildVersion) {
        this.ipcRendererService.send('write-settings', 'buildVersion', buildVersion);
        this._buildVersion = buildVersion;
    }
    get appVersion() {
        return this._appVersion;
    }
    set appVersion(appVersion) {
        this.ipcRendererService.send('write-settings', 'appVersion', appVersion);
        this._appVersion = appVersion;
    }
    get language() {
        return this._language;
    }
    set language(language) {
        this.ipcRendererService.send('write-settings', 'language', language);
        this._language = language;
    }
};
SettingsService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [ipcrenderer_service_1.IpcRendererService])
], SettingsService);
exports.SettingsService = SettingsService;

//# sourceMappingURL=settings.service.js.map
