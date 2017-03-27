"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const shortcuts_1 = require("../../../../shortcuts/shortcuts");
const barcontainer_1 = require("./barcontainer");
class HealthBar {
    constructor(wGame, params) {
        this.fightJustStarted = false;
        this.wGame = wGame;
        this.params = params;
        this.events = [];
        if (this.params.health_bar) {
            console.info('- enable Health-Bar');
            let onCharacterSelectedSuccess = () => {
                let healthbarCss = document.createElement('style');
                healthbarCss.id = 'healthbarCss';
                healthbarCss.innerHTML = `
                .lifeBarsContainer {
                    position: absolute;
                    top: 0;
                    left: 0;
                    pointer-events: none;
                    z-index: 1;
                    visibility: hidden;
                }

                .lifeBarContainer {
                    box-sizing: border-box;
                    border: 1px gray solid;
                    background-color: #222;
                    height: 6px;
                    width: 80px;
                    position: absolute;
                    border-radius: 3px;
                    overflow: hidden;
                    transition-duration: 500ms;
                    margin-top: 10px;
                }

                .lifeBar {
                    transition-duration: 300ms;
                    height: 100%;
                    width: 0%;
                    background-color: #333;
                }

                .shieldBar {
                    transition-duration: 300ms;
                    height: 100%;
                    width: 0%;
                    margin-left: 50%;
                    background-color: #944ae0;
                    position: absolute;
                    top: 0;
                }

                .lifePointsText {
                    font-size: 12px;
                    position: absolute;
                    width: 80px;
                    color: white;
                    text-shadow: 0px 0px 5px rgba(0, 0, 0, 0.9);
                    transition-duration: 500ms;
                    margin-top: 16px;
                    margin-left: 2px;
                }`;
                this.wGame.document.getElementsByTagName('head')[0].appendChild(healthbarCss);
                this.shortcuts = new shortcuts_1.ShortCuts(this.wGame);
                this.barContainer = new barcontainer_1.BarContainer(this.wGame);
                this.removeOnDeath();
                this.setFightStart();
                this.displayOnStart();
                this.stopOnFightEnd();
                this.shortcuts.bind(this.params.health_bar_shortcut, () => {
                    console.log('start health bar');
                    this.barContainer.toggle();
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
    }
    removeOnDeath() {
        let onDeath = (e) => {
            try {
                this.barContainer.destroyBar(e.targetId);
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
    setFightStart() {
        let onFightStart = (e) => {
            try {
                this.fightJustStarted = true;
            }
            catch (ex) {
                console.log(ex);
            }
        };
        this.wGame.dofus.connectionManager.on('GameFightStartingMessage', onFightStart);
        this.events.push(() => {
            this.wGame.dofus.connectionManager.removeListener('GameFightStartingMessage', onFightStart);
        });
    }
    displayOnStart() {
        let onNewRound = (e) => {
            try {
                if (this.fightJustStarted) {
                    this.fightJustStarted = false;
                    this.barContainer.fightStarted();
                }
            }
            catch (ex) {
                console.log(ex);
            }
        };
        this.wGame.dofus.connectionManager.on('GameFightNewRoundMessage', onNewRound);
        this.events.push(() => {
            this.wGame.dofus.connectionManager.removeListener('GameFightNewRoundMessage', onNewRound);
        });
    }
    stopOnFightEnd() {
        let onFightEnd = (e) => {
            try {
                this.barContainer.fightEnded();
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
        if (this.params.health_bar) {
            this.shortcuts.unBindAll();
            this.barContainer.destroy();
            this.events.forEach((event) => {
                event();
            });
            this.events = [];
            let healthbarCss = this.wGame.document.getElementById('healthbarCss');
            healthbarCss.parentElement.removeChild(healthbarCss);
        }
    }
}
exports.HealthBar = HealthBar;

//# sourceMappingURL=healthbar.js.map
