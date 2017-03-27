"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultSettings = {
    language: null,
    buildVersion: null,
    appVersion: null,
    alertCounter: 0,
    vip_id: null,
    last_news: null,
    appPreferences: null,
    option: {
        general: {
            hidden_shop: false,
            hidden_tabs: false,
            stay_connected: true,
            resolution: {
                x: 1280,
                y: 720
            },
            local_content: false,
        },
        shortcuts: {
            no_emu: {
                new_tab: "ctrl+t",
                new_window: "ctrl+n",
                next_tab: "right",
                prev_tab: "left",
                activ_tab: "",
                tabs: [
                    "f1",
                    "f2",
                    "f3",
                    "f4",
                    "f5",
                    "f6",
                    "f7",
                    "f8",
                    "f9",
                    "f10"
                ]
            },
            diver: {
                end_turn: "backspace",
                open_chat: "return"
            },
            spell: [
                "",
                "1",
                "2",
                "3",
                "4",
                "5",
                "6",
                "7",
                "8",
                "9",
                "0",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                ""
            ],
            item: [
                "ctrl+1",
                "ctrl+2",
                "ctrl+3",
                "ctrl+4",
                "ctrl+5",
                "ctrl+6",
                "ctrl+7",
                "ctrl+8",
                "ctrl+9",
                "ctrl+0",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                ""
            ],
            interface: {
                carac: "c",
                spell: "s",
                bag: "i",
                bidhouse: "h",
                map: "m",
                friend: "f",
                book: "q",
                guild: "g",
                conquest: "k",
                job: "j",
                alliance: "",
                mount: "n",
                directory: "",
                alignement: "",
                bestiary: "b",
                title: "n",
                achievement: "u",
                almanax: "x",
                spouse: "l",
                shop: "v",
                goultine: "r"
            }
        },
        notification: {
            private_message: true,
            fight_turn: true,
            tax_collector: true,
            kolizeum: true,
            party_invitation: true,
            aggression: true,
            focus_fight_turn: true,
        },
        vip: {
            general: {
                disable_inactivity: false,
                health_bar: true,
                health_bar_shortcut: 'p',
                estimator: true
            },
            auto_group: {
                active: false,
                leader: null,
                members: null,
                follow_leader: false,
                random_move: true,
                ready: false,
                delay: 1,
                fight: false,
            },
            multi_account: {
                active: false,
                master_password: "",
                windows: [[]],
            }
        }
    }
};

//# sourceMappingURL=default.settings.js.map
