"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const eventemitter3_1 = require("eventemitter3");
class AutoGroup {
    constructor(wGame, params, ipcRendererService) {
        this.lock = false;
        this.wGame = wGame;
        this.params = params;
        this.ipcRendererService = ipcRendererService;
        this.events = [];
        if (this.params.active) {
            console.info('- Auto-Group enable');
            if (!AutoGroup.resetCounter) {
                AutoGroup.resetCounter = () => {
                    console.info('reset counter');
                    AutoGroup.counter = 1;
                };
                this.ipcRendererService.on('auto-group-reset-counter', AutoGroup.resetCounter);
                this.events.push(() => {
                    this.ipcRendererService.removeListener('auto-group-reset-counter', AutoGroup.resetCounter);
                });
            }
            this.autoAcceptPartyInvitation(this.wGame.gui.isConnected);
            if (this.params.follow_leader)
                this.followLeader(this.wGame.gui.isConnected);
            if (this.params.fight)
                this.autoEnterFight(this.wGame.gui.isConnected);
            this.autoMasterParty(this.wGame.gui.isConnected);
        }
    }
    autoMasterParty(skipLogin = false) {
        let onCharacterSelectedSuccess = () => {
            try {
                setTimeout(() => {
                    if (this.params.leader == this.wGame.gui.playerData.characterBaseInformations.name) {
                        console.info('start master party');
                        let idInt = setInterval(() => {
                            this.masterParty(this.params.members.split(';'));
                        }, 6000);
                        this.events.push(() => {
                            clearInterval(idInt);
                        });
                        this.wGame.gui.on("disconnect", () => {
                            clearInterval(idInt);
                        });
                    }
                }, 3000);
            }
            catch (e) {
                console.log(e);
            }
        };
        if (skipLogin) {
            onCharacterSelectedSuccess();
        }
        this.wGame.gui.playerData.on("characterSelectedSuccess", onCharacterSelectedSuccess);
        this.events.push(() => {
            this.wGame.gui.playerData.removeListener("characterSelectedSuccess", onCharacterSelectedSuccess);
        });
    }
    inviteToParty(name) {
        this.wGame.dofus.sendMessage("PartyInvitationRequestMessage", { name: name });
    }
    acceptPartyInvitation(partyId) {
        this.wGame.dofus.sendMessage("PartyAcceptInvitationMessage", { partyId: partyId });
    }
    autoAcceptPartyInvitation(skipLogin = false) {
        let onCharacterSelectedSuccess = () => {
            try {
                let onPartyInvitationMessage = (msg) => {
                    if (this.params.leader === msg.fromName) {
                        this.acceptPartyInvitation(msg.partyId);
                    }
                };
                setTimeout(() => {
                    this.wGame.dofus.connectionManager.on('PartyInvitationMessage', onPartyInvitationMessage);
                    this.events.push(() => {
                        this.wGame.dofus.connectionManager.removeListener('PartyInvitationMessage', onPartyInvitationMessage);
                    });
                    this.wGame.gui.on("disconnect", () => {
                        this.wGame.dofus.connectionManager.removeListener('PartyInvitationMessage', onPartyInvitationMessage);
                    });
                }, 2000);
            }
            catch (e) {
                console.log(e);
            }
        };
        if (skipLogin) {
            onCharacterSelectedSuccess();
        }
        this.wGame.gui.playerData.on("characterSelectedSuccess", onCharacterSelectedSuccess);
        this.events.push(() => {
            this.wGame.gui.playerData.removeListener("characterSelectedSuccess", onCharacterSelectedSuccess);
        });
    }
    getPartyMembers() {
        let party = [];
        if (Object.keys(this.wGame.gui.playerData.partyData._partyFromId).length !== 0) {
            let partyMembers = this.wGame.gui.playerData.partyData._partyFromId[Object.keys(this.wGame.gui.playerData.partyData._partyFromId)[0]]._members;
            for (let player in partyMembers) {
                party.push(partyMembers[player].name);
            }
        }
        return party;
    }
    masterParty(nameList) {
        let partyMembers = this.getPartyMembers();
        nameList.forEach((name) => {
            if (!partyMembers.includes(name)) {
                this.wGame.dofus.sendMessage('BasicWhoIsRequestMessage', {
                    search: name,
                    verbose: true
                });
                this.wGame.dofus.connectionManager.once('BasicWhoIsMessage', (msg) => {
                    if (msg.playerState == 1) {
                        this.inviteToParty(name);
                    }
                });
            }
        });
    }
    reset() {
        this.events.forEach((event) => {
            event();
        });
        this.events = [];
    }
    isBorder(cellId) {
        if (0 <= cellId && cellId <= 13 ||
            15 <= cellId && cellId <= 26) {
            return "top";
        }
        if (546 <= cellId && cellId <= 559 ||
            533 <= cellId && cellId <= 545) {
            return "bottom";
        }
        if (cellId % 28 == 0 ||
            cellId % 28 == 14) {
            return "left";
        }
        if (cellId % 28 == 27 ||
            cellId % 28 == 13) {
            return "right";
        }
        return false;
    }
    getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    followFunc(msg) {
        if (Object.keys(this.wGame.gui.playerData.partyData._partyFromId).length !== 0) {
            let party = this.wGame.gui.playerData.partyData._partyFromId[Object.keys(this.wGame.gui.playerData.partyData._partyFromId)[0]];
            if (party._leaderId === msg.actorId && party._leaderId !== this.wGame.gui.playerData.id) {
                let event = new eventemitter3_1.EventEmitter();
                let onGameContextRemoveElementMessage = (msg) => {
                    if (!this.lock && msg.id === party._leaderId) {
                        event.once('finish', (cellId) => {
                            this.wGame.isoEngine._movePlayerOnMap(cellId, false, null);
                        });
                    }
                };
                this.wGame.dofus.connectionManager.once('GameContextRemoveElementMessage', onGameContextRemoveElementMessage);
                let lastCellId = msg.keyMovements[msg.keyMovements.length - 1];
                let direction = this.isBorder(lastCellId);
                let delay = 0;
                let max = 15;
                let min = -15;
                if (this.params.delay > 0) {
                    delay = (this.params.delay + this.params.delay * (Math.floor(Math.random() * (max - min + 1)) + min) * 0.01) * 1000;
                    if (this.params.leader)
                        delay = delay * AutoGroup.counter++;
                }
                setTimeout(() => {
                    if (!this.lock) {
                        let cellDirection = lastCellId;
                        if (direction) {
                            this.wGame.isoEngine.gotoNeighbourMap(direction, lastCellId, 144, 4);
                            this.wGame.dofus.connectionManager.removeListener('GameContextRemoveElementMessage', onGameContextRemoveElementMessage);
                        }
                        else {
                            if (this.params.random_move) {
                                let steps = [-15, -1, 13, 28, 14, 1, -14, -28];
                                let step = steps[this.getRandomInt(0, 7)];
                                cellDirection = lastCellId + step;
                            }
                            this.wGame.isoEngine._movePlayerOnMap(cellDirection, false, () => {
                                event.emit('finish', lastCellId);
                                setTimeout(() => {
                                    this.wGame.dofus.connectionManager.removeListener('GameContextRemoveElementMessage', onGameContextRemoveElementMessage);
                                }, 500);
                            });
                        }
                    }
                }, delay);
            }
            else if (party._leaderId === msg.actorId && party._leaderId === this.wGame.gui.playerData.id) {
                this.ipcRendererService.send('auto-group-reset-counter');
            }
        }
    }
    followInteractivFunc(msg) {
        if (Object.keys(this.wGame.gui.playerData.partyData._partyFromId).length !== 0) {
            let party = this.wGame.gui.playerData.partyData._partyFromId[Object.keys(this.wGame.gui.playerData.partyData._partyFromId)[0]];
            if (party._leaderId === msg.entityId && party._leaderId !== this.wGame.gui.playerData.id) {
                this.lock = true;
                let delay = 0;
                let max = 15;
                let min = -15;
                if (this.params.delay > 0) {
                    delay = (this.params.delay + this.params.delay * (Math.floor(Math.random() * (max - min + 1)) + min) * 0.01) * 1000;
                    if (this.params.leader)
                        delay = delay * AutoGroup.counter++;
                }
                let interactive = this.wGame.isoEngine.mapRenderer.interactiveElements[msg.elemId];
                let skillId = msg.skillId;
                let skillInstanceUid = null;
                for (let id in interactive.enabledSkills) {
                    if (interactive.enabledSkills[id].skillId == skillId) {
                        skillInstanceUid = interactive.enabledSkills[id].skillInstanceUid;
                        break;
                    }
                }
                setTimeout(() => {
                    this.wGame.isoEngine.useInteractive(msg.elemId, skillInstanceUid);
                    this.lock = false;
                }, delay);
            }
            else {
                this.ipcRendererService.send('auto-group-reset-counter');
            }
        }
    }
    followLeader(skipLogin = false) {
        let onCharacterSelectedSuccess = () => {
            try {
                let onGameMapMovementMessage = (msg) => {
                    this.followFunc(msg);
                };
                let onInteractiveUsedMessage = (msg) => {
                    this.followInteractivFunc(msg);
                };
                setTimeout(() => {
                    this.wGame.dofus.connectionManager.on('GameMapMovementMessage', onGameMapMovementMessage);
                    this.wGame.dofus.connectionManager.on('InteractiveUsedMessage', onInteractiveUsedMessage);
                    this.events.push(() => {
                        this.wGame.dofus.connectionManager.removeListener('GameMapMovementMessage', onGameMapMovementMessage);
                        this.wGame.dofus.connectionManager.removeListener('InteractiveUsedMessage', onInteractiveUsedMessage);
                    });
                    this.wGame.gui.on("disconnect", () => {
                        this.wGame.dofus.connectionManager.removeListener('GameMapMovementMessage', onGameMapMovementMessage);
                        this.wGame.dofus.connectionManager.removeListener('InteractiveUsedMessage', onInteractiveUsedMessage);
                    });
                }, 2000);
            }
            catch (e) {
                console.log(e);
            }
        };
        if (skipLogin) {
            onCharacterSelectedSuccess();
        }
        this.wGame.gui.playerData.on("characterSelectedSuccess", onCharacterSelectedSuccess);
        this.events.push(() => {
            this.wGame.gui.playerData.removeListener("characterSelectedSuccess", onCharacterSelectedSuccess);
        });
    }
    autoEnterFight(skipLogin = false) {
        let onCharacterSelectedSuccess = () => {
            try {
                let joinFight = (fightId, fighterId) => {
                    return new Promise((resolve, reject) => {
                        this.wGame.dofus.sendMessage("GameFightJoinRequestMessage", { fightId, fighterId });
                        setTimeout(() => {
                            resolve();
                        }, 1500);
                    });
                };
                let ready = () => {
                    return new Promise((resolve, reject) => {
                        this.wGame.dofus.sendMessage("GameFightReadyMessage", { isReady: true });
                        setTimeout(() => {
                            resolve();
                        }, 200);
                    });
                };
                let onPartyMemberInFightMessage = (e) => {
                    if (this.wGame.isoEngine.mapRenderer.mapId === e.fightMap.mapId) {
                        joinFight(e.fightId, e.memberId)
                            .then(() => {
                            if (this.params.ready)
                                return ready();
                            else
                                return;
                        });
                    }
                };
                setTimeout(() => {
                    this.wGame.dofus.connectionManager.on("PartyMemberInFightMessage", onPartyMemberInFightMessage);
                    this.events.push(() => {
                        this.wGame.dofus.connectionManager.removeListener("PartyMemberInFightMessage", onPartyMemberInFightMessage);
                    });
                    this.wGame.gui.on("disconnect", () => {
                        this.wGame.dofus.connectionManager.removeListener('PartyMemberInFightMessage', onPartyMemberInFightMessage);
                    });
                }, 2000);
            }
            catch (e) {
                console.log(e);
            }
        };
        if (skipLogin) {
            onCharacterSelectedSuccess();
        }
        this.wGame.gui.playerData.on("characterSelectedSuccess", onCharacterSelectedSuccess);
        this.events.push(() => {
            this.wGame.gui.playerData.removeListener("characterSelectedSuccess", onCharacterSelectedSuccess);
        });
    }
}
AutoGroup.counter = 1;
AutoGroup.resetCounter = null;
exports.AutoGroup = AutoGroup;

//# sourceMappingURL=autogroup.js.map
