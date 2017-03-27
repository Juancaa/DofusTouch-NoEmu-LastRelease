"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Bar {
    constructor(fighter, container, wGame) {
        this.fighter = fighter;
        this.wGame = wGame;
        this.container = container;
        this.createBar();
    }
    getId() {
        return this.fighter.id;
    }
    update() {
        let fighter = this.wGame.gui.fightManager.getFighter(this.fighter.id);
        if (this.wGame.gui.fightManager.isInBattle()) {
            if (fighter.data.alive) {
                if (!this.lifeBar || !this.lifeBarContainer || !this.lifePointsText) {
                    this.createBar();
                }
                let life = fighter.data.stats.lifePoints / fighter.data.stats.maxLifePoints;
                let shield = fighter.data.stats.shieldPoints / fighter.data.stats.maxLifePoints;
                this.lifeBar.style.width = Math.round(life * (shield > 0 ? 50 : 100)) + '%';
                this.shieldBar.style.width = Math.round(shield * 50) + '%';
                this.lifePointsText.innerHTML = fighter.data.stats.lifePoints + fighter.data.stats.shieldPoints;
                if (shield > 0) {
                    this.lifeBar.style.right = '50%';
                }
                else {
                    this.lifeBar.style.right = '';
                }
                let invisible = false;
                for (let idB in fighter.buffs) {
                    if (fighter.buffs[idB].effect.effectId == 150)
                        invisible = true;
                }
                let cellId = fighter.data.disposition.cellId;
                if (cellId && (!invisible || this.wGame.gui.fightManager.isFighterOnUsersTeam(fighter.id))) {
                    try {
                        let scenePos = this.wGame.isoEngine.mapRenderer.getCellSceneCoordinate(cellId);
                        let pos = this.wGame.isoEngine.mapScene.convertSceneToCanvasCoordinate(scenePos.x, scenePos.y);
                        this.lifeBarContainer.style.left = (pos.x - this.lifeBarContainer.offsetWidth / 2) + 'px';
                        this.lifeBarContainer.style.top = (pos.y) + 'px';
                        this.lifeBarContainer.style.opacity = '';
                        this.lifePointsText.style.opacity = '';
                        if (this.container.getShowLifePoints()) {
                            this.lifePointsText.style.display = '';
                            this.lifePointsText.style.left = (pos.x - this.lifeBarContainer.offsetWidth / 2) + 'px';
                            this.lifePointsText.style.top = (pos.y) + 'px';
                        }
                        else {
                            this.lifePointsText.style.display = 'none';
                        }
                    }
                    catch (e) {
                        console.log(cellId);
                        console.error(e);
                    }
                }
                else if (invisible) {
                    this.lifeBarContainer.style.opacity = '0.5';
                    this.lifePointsText.style.opacity = '0.5';
                }
            }
        }
    }
    createBar() {
        let life = this.fighter.data.stats.lifePoints / this.fighter.data.stats.maxLifePoints;
        let cellId = this.fighter.data.disposition.cellId;
        let scenePos = this.wGame.isoEngine.mapRenderer.getCellSceneCoordinate(cellId);
        let pos = this.wGame.isoEngine.mapScene.convertSceneToCanvasCoordinate(scenePos.x, scenePos.y);
        this.lifeBarContainer = document.createElement('div');
        this.lifeBarContainer.id = 'fighterLifeBarContainer' + this.fighter.id;
        this.lifeBarContainer.className = 'lifeBarContainer';
        if (this.fighter.data.teamId == 0)
            this.lifeBarContainer.style.borderColor = 'red';
        else
            this.lifeBarContainer.style.borderColor = '#3ad';
        this.lifeBar = document.createElement('div');
        this.lifeBar.id = 'fighterLifeBar' + this.fighter.id;
        this.lifeBar.className = 'lifeBar';
        if (this.fighter.data.teamId == 0)
            this.lifeBar.style.backgroundColor = 'red';
        else
            this.lifeBar.style.backgroundColor = '#3ad';
        this.lifeBarContainer.appendChild(this.lifeBar);
        this.shieldBar = document.createElement('div');
        this.shieldBar.id = 'fighterShieldBar' + this.fighter.id;
        this.shieldBar.className = 'shieldBar';
        this.lifeBarContainer.appendChild(this.shieldBar);
        this.lifePointsText = document.createElement('div');
        this.lifePointsText.id = 'fighterLifePoints' + this.fighter.id;
        this.lifePointsText.className = 'lifePointsText';
        this.wGame.document.getElementById('lifeBars').appendChild(this.lifeBarContainer);
        this.wGame.document.getElementById('lifeBars').appendChild(this.lifePointsText);
    }
    destroy() {
        this.lifePointsText.parentElement.removeChild(this.lifePointsText);
        this.lifeBar.parentElement.removeChild(this.lifeBar);
        this.lifeBarContainer.parentElement.removeChild(this.lifeBarContainer);
    }
}
exports.Bar = Bar;

//# sourceMappingURL=bar.js.map
