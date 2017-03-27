"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bar_1 = require("./bar");
class BarContainer {
    constructor(wGame) {
        this.displayed = false;
        this.enabled = true;
        this.showLifePoints = true;
        this.isInFight = false;
        this.bars = {};
        this.wGame = wGame;
        this.container = document.createElement('div');
        this.container.id = 'lifeBars';
        this.container.className = 'lifeBarsContainer';
        this.wGame.foreground.rootElement.appendChild(this.container);
        if (this.wGame.gui.fightManager.isInBattle())
            this.fightStarted();
    }
    toggle() {
        if (!this.enabled) {
            this.enabled = true;
            this.showLifePoints = true;
        }
        else {
            if (this.showLifePoints)
                this.showLifePoints = false;
            else
                this.enabled = false;
        }
        if (this.isInFight) {
            if (this.enabled)
                this.show();
            else
                this.hide();
        }
    }
    show() {
        if (!this.displayed) {
            this.displayed = true;
            this.container.style.visibility = 'visible';
            let fighters = this.wGame.gui.fightManager.getFighters();
            for (let index in fighters) {
                let fighter = this.wGame.gui.fightManager.getFighter(fighters[index]);
                if (fighter.data.alive) {
                    this.bars[fighter.id] = new bar_1.Bar(fighter, this, this.wGame);
                }
            }
            this.updateInterval = setInterval(() => {
                this.update();
            }, 400);
        }
    }
    hide() {
        if (this.displayed) {
            this.displayed = false;
            this.container.style.visibility = '';
            for (let fighterId in this.bars) {
                this.destroyBar(fighterId);
            }
            this.bars = [];
            this.wGame.document.getElementById('lifeBars').innerHTML = '';
            clearInterval(this.updateInterval);
        }
    }
    update() {
        if (this.isInFight) {
            let fighters = this.wGame.gui.fightManager.getFighters();
            for (let index in fighters) {
                let fighter = this.wGame.gui.fightManager.getFighter(fighters[index]);
                if (fighter.data.alive) {
                    if (this.bars[fighter.id])
                        this.bars[fighter.id].update();
                    else
                        this.bars[fighter.id] = new bar_1.Bar(fighter, this, this.wGame);
                }
            }
        }
    }
    destroyBar(fighterId) {
        if (this.bars[fighterId]) {
            this.bars[fighterId].destroy();
            delete this.bars[fighterId];
        }
    }
    fightStarted() {
        this.isInFight = true;
        if (this.enabled)
            this.show();
    }
    fightEnded() {
        this.isInFight = false;
        if (this.enabled)
            this.hide();
    }
    getShowLifePoints() {
        return this.showLifePoints;
    }
    destroy() {
        this.hide();
        this.container.parentElement.removeChild(this.container);
    }
}
exports.BarContainer = BarContainer;

//# sourceMappingURL=barcontainer.js.map
