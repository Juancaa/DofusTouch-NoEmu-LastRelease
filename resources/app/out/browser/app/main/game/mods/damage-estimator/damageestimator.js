"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const shortcuts_1 = require("../../../../shortcuts/shortcuts");
const damagecontainer_1 = require("./damagecontainer");
class DamageEstimator {
    constructor(wGame, params) {
        this.wGame = wGame;
        this.params = params;
        this.events = [];
        if (this.params.estimator) {
            console.info('- enable Damage-Estimator');
            this.shortcuts = new shortcuts_1.ShortCuts(this.wGame);
            this.damageContainer = new damagecontainer_1.DamageContainer(this.wGame);
            this.setSpellSelected();
            this.setSpellSlotDeselected();
            this.damageContainer.toggle();
        }
    }
    removeOnDeath() {
        let onDeath = (e) => {
            try {
                this.damageContainer.destroyEstimator(e.targetId);
            }
            catch (ex) {
                console.log(ex);
            }
        };
        this.wGame.gui.on('GameActionFightDeathMessage', onDeath);
        this.events.push(() => {
            this.wGame.gui.removeListener('GameActionFightDeathMessage', onDeath);
        });
    }
    setSpellSlotDeselected() {
        let onSpellSlotDeselected = () => {
            try {
                console.log('onSpellSlotDeselected');
                this.damageContainer.destroyEstimators();
            }
            catch (ex) {
                console.log(ex);
            }
        };
        this.wGame.gui.on('spellSlotDeselected', onSpellSlotDeselected);
        this.events.push(() => {
            this.wGame.gui.removeListener('spellSlotSelected', onSpellSlotDeselected);
        });
    }
    setSpellSelected() {
        let onSpellSelected = (spellId) => {
            try {
                console.log('onSpellSelected');
                let spell = this.wGame.gui.playerData.characters.mainCharacter.spellData.spells[spellId];
                this.damageContainer.display(spell);
            }
            catch (ex) {
                console.log(ex);
            }
        };
        this.wGame.gui.on('spellSlotSelected', onSpellSelected);
        this.events.push(() => {
            this.wGame.gui.removeListener('spellSlotSelected', onSpellSelected);
        });
    }
    stopOnFightEnd() {
        let onFightEnd = (e) => {
            try {
                this.damageContainer.fightEnded();
            }
            catch (ex) {
                console.log(ex);
            }
        };
        this.wGame.dofus.connectionManager.on('GameFightEndMessage', onFightEnd);
        this.events.push(() => {
            this.wGame.dofus.connectionManager.removeListener('GameFightEndMessage', onFightEnd);
        });
    }
    reset() {
        if (this.params.estimator) {
            this.shortcuts.unBindAll();
            this.damageContainer.destroy();
            this.events.forEach((event) => {
                event();
            });
            this.events = [];
        }
    }
}
exports.DamageEstimator = DamageEstimator;

//# sourceMappingURL=damageestimator.js.map
