"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class HideShop {
    constructor(wGame, hidden_shop) {
        this.wGame = wGame;
        this.hidden_shop = hidden_shop;
        this.events = [];
        let toggle = () => {
            if (this.hidden_shop)
                this.wGame.gui.shopFloatingToolbar.hide();
            else
                this.wGame.gui.shopFloatingToolbar.show();
        };
        let run = () => {
            this.wGame.gui.fightManager.on('fightEnd', toggle);
            this.events.push(() => {
                this.wGame.gui.fightManager.removeListener("fightEnd", toggle);
            });
            setTimeout(toggle, 1000);
        };
        if (this.wGame.gui.isConnected)
            run();
        else {
            this.wGame.gui.on('connected', run);
            this.events.push(() => {
                this.wGame.gui.removeListener("connected", run);
            });
        }
    }
    reset() {
        this.events.forEach((event) => {
            event();
        });
    }
}
exports.HideShop = HideShop;

//# sourceMappingURL=hide-shop.js.map
