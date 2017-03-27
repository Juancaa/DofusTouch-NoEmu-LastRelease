"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const eventemitter3_1 = require("eventemitter3");
const { remote } = global.nodeRequire('electron');
class Notifications extends eventemitter3_1.EventEmitter {
    constructor(wGame, params, translate) {
        super();
        this.events = [];
        this.wGame = wGame;
        this.params = params;
        this.translate = translate;
        let onCharacterSelectedSuccess = () => {
            let onChatServerMessage = (msg) => {
                this.sendMPNotif(msg);
            };
            let onGameFightTurnStartMessage = (actor) => {
                this.sendFightTurnNotif(actor);
            };
            let onTaxCollectorAttackedMessage = (tc) => {
                this.sendTaxCollectorNotif(tc);
            };
            let onGameRolePlayArenaFightPropositionMessage = (tc) => {
                this.sendKolizeumNotif(tc);
            };
            let onPartyInvitationMessage = (tc) => {
                this.sendPartyInvitationNotif(tc);
            };
            let onGameRolePlayAggressionMessage = (tc) => {
                this.sendAggressionNotif(tc);
            };
            this.wGame.dofus.connectionManager.on('ChatServerMessage', onChatServerMessage);
            this.wGame.gui.on('GameFightTurnStartMessage', onGameFightTurnStartMessage);
            this.wGame.dofus.connectionManager.on('TaxCollectorAttackedMessage', onTaxCollectorAttackedMessage);
            this.wGame.dofus.connectionManager.on('GameRolePlayArenaFightPropositionMessage', onGameRolePlayArenaFightPropositionMessage);
            this.wGame.dofus.connectionManager.on('PartyInvitationMessage', onPartyInvitationMessage);
            this.wGame.dofus.connectionManager.on('GameRolePlayAggressionMessage', onGameRolePlayAggressionMessage);
            let onDisconnect = () => {
                this.wGame.dofus.connectionManager.removeListener('ChatServerMessage', onChatServerMessage);
                this.wGame.gui.removeListener('GameFightTurnStartMessage', onGameFightTurnStartMessage);
                this.wGame.dofus.connectionManager.removeListener('TaxCollectorAttackedMessage', onTaxCollectorAttackedMessage);
                this.wGame.dofus.connectionManager.removeListener('GameRolePlayArenaFightPropositionMessage', onGameRolePlayArenaFightPropositionMessage);
                this.wGame.dofus.connectionManager.removeListener('PartyInvitationMessage', onPartyInvitationMessage);
                this.wGame.dofus.connectionManager.removeListener('GameRolePlayAggressionMessage', onGameRolePlayAggressionMessage);
            };
            this.wGame.gui.on("disconnect", onDisconnect);
            this.events.push(() => {
                onDisconnect();
                this.wGame.gui.removeListener("disconnect", onDisconnect);
            });
        };
        this.wGame.gui.playerData.on("characterSelectedSuccess", onCharacterSelectedSuccess);
        this.events.push(() => {
            this.wGame.gui.playerData.removeListener("characterSelectedSuccess", onCharacterSelectedSuccess);
        });
        if (this.wGame.gui.isConnected) {
            onCharacterSelectedSuccess();
        }
    }
    reset() {
        this.events.forEach((event) => {
            event();
        });
        this.events = [];
    }
    sendMPNotif(msg) {
        if (!this.wGame.document.hasFocus() && this.params.private_message) {
            if (msg.channel == 9) {
                this.emit('newNotification');
                let mpNotif = new Notification(this.translate.instant('app.notifications.private-message', { character: msg.senderName }), {
                    body: msg.content
                });
                mpNotif.onclick = () => {
                    remote.getCurrentWindow().focus();
                    this.emit('focusTab');
                };
            }
        }
    }
    sendFightTurnNotif(actor) {
        if (!this.wGame.document.hasFocus()
            && this.wGame.gui.playerData.characterBaseInformations.id == actor.id) {
            if (this.params.fight_turn) {
                this.emit('newNotification');
                let turnNotif = new Notification(this.translate.instant('app.notifications.fight-turn', { character: this.wGame.gui.playerData.characterBaseInformations.name }));
                turnNotif.onclick = () => {
                    remote.getCurrentWindow().focus();
                    this.emit('focusTab');
                };
            }
            if (this.params.focus_fight_turn) {
                remote.getCurrentWindow().focus();
                this.emit('focusTab');
            }
        }
    }
    sendKolizeumNotif(msg) {
        if (!this.wGame.document.hasFocus()
            && this.params.fight_turn) {
            this.emit('newNotification');
            let kolizeumNotif = new Notification(this.translate.instant('app.notifications.kolizeum'));
            kolizeumNotif.onclick = () => {
                remote.getCurrentWindow().focus();
                this.emit('focusTab');
            };
        }
    }
    sendTaxCollectorNotif(tc) {
        if (!this.wGame.document.hasFocus() && this.params.tax_collector) {
            this.emit('newNotification');
            let guildName = tc.guild.guildName;
            let x = tc.worldX;
            let y = tc.worldY;
            let zoneName = tc.enrichData.subAreaName;
            let tcName = tc.enrichData.firstName + " " + tc.enrichData.lastName;
            let taxCollectorNotif = new Notification(this.translate.instant('app.notifications.tax-collector'), {
                body: zoneName + ' [' + x + ', ' + y + '] : ' + guildName + ', ' + tcName
            });
            taxCollectorNotif.onclick = () => {
                remote.getCurrentWindow().focus();
                this.emit('focusTab');
            };
        }
    }
    sendPartyInvitationNotif(tc) {
        if (!this.wGame.document.hasFocus() && this.params.party_invitation) {
            this.emit('newNotification');
            let fromName = tc.fromName;
            let partyInvitationNotif = new Notification(this.translate.instant('app.notifications.party-invitation', { character: tc.fromName }));
            partyInvitationNotif.onclick = () => {
                remote.getCurrentWindow().focus();
                this.emit('focusTab');
            };
        }
    }
    sendAggressionNotif(tc) {
        if (!this.wGame.document.hasFocus()
            && this.params.aggression
            && tc.defenderId == this.wGame.gui.playerData.characterBaseInformations.id) {
            this.emit('newNotification');
            let aggressionNotif = new Notification(this.translate.instant('app.notifications.aggression'));
            aggressionNotif.onclick = () => {
                remote.getCurrentWindow().focus();
                this.emit('focusTab');
            };
        }
    }
}
exports.Notifications = Notifications;

//# sourceMappingURL=notifications.js.map
