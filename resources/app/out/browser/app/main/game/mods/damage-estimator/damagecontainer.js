"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const estimator_1 = require("./estimator");
class DamageContainer {
    constructor(wGame) {
        this.displayed = false;
        this.enabled = true;
        this.isInFight = false;
        this.estimators = {};
        this.wGame = wGame;
        this.container = document.createElement('div');
        this.container.id = 'damage-estimator';
        this.container.style.position = 'absolute';
        this.container.style.top = '0';
        this.container.style.left = '0';
        this.container.style.zIndex = '1';
        this.container.style.width = '100%';
        this.container.style.height = '100%';
        this.container.style.pointerEvents = 'none';
        this.container.style.visibility = 'hidden';
        this.wGame.foreground.rootElement.appendChild(this.container);
    }
    toggle() {
        this.enabled = !this.enabled;
    }
    show(spell) {
        this.displayed = true;
        this.container.style.visibility = 'visible';
        let fighters = this.wGame.gui.fightManager.getFighters();
        for (let index in fighters) {
            let fighter = this.wGame.gui.fightManager.getFighter(fighters[index]);
            if (fighter.data.alive && fighter.id !== this.wGame.gui.playerData.characters.mainCharacterId) {
                this.estimators[fighter.id] = new estimator_1.Estimator(fighter, spell, this.wGame);
            }
        }
    }
    hide() {
        if (this.displayed) {
            this.displayed = false;
            this.container.style.visibility = 'hidden';
            for (let fighterId in this.estimators) {
                this.destroyEstimator(fighterId);
            }
            this.estimators = [];
            this.wGame.document.getElementById(this.container.id).innerHTML = '';
            clearInterval(this.updateInterval);
        }
    }
    update(spell) {
        if (this.isInFight) {
            let fighters = this.wGame.gui.fightManager.getFighters();
            for (let index in fighters) {
                let fighter = this.wGame.gui.fightManager.getFighter(fighters[index]);
                if (fighter.data.alive && fighter.id !== this.wGame.gui.playerData.characters.mainCharacterId) {
                    if (this.estimators[fighter.id])
                        this.estimators[fighter.id].update(spell);
                    else
                        this.estimators[fighter.id] = new estimator_1.Estimator(fighter, spell, this.wGame);
                }
            }
        }
    }
    destroyEstimators() {
        this.estimators = [];
        this.container.innerHTML = '';
    }
    destroyEstimator(fighterId) {
        if (this.estimators[fighterId]) {
            this.estimators[fighterId].destroy();
            delete this.estimators[fighterId];
        }
    }
    display(spell) {
        this.isInFight = true;
        this.show(spell);
    }
    fightEnded() {
        this.isInFight = false;
        if (this.enabled)
            this.hide();
    }
    destroy() {
        this.estimators = [];
        this.container.parentElement.removeChild(this.container);
    }
}
exports.DamageContainer = DamageContainer;

//# sourceMappingURL=damagecontainer.js.map
