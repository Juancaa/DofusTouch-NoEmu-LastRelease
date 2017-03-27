"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RapidExchange {
    constructor(wGame) {
        this.keyPressed = false;
        this.supportedWindows = ["exchangeInventory", "exchangeStorage", "tradeWithPlayerAndNPCInventory"];
        this.wGame = wGame;
        let getWindowsAndStartup = () => {
            let windows = this.wGame.gui.windowsContainer.getChildren();
            windows.forEach((window) => {
                if (this.supportedWindows.includes(window.id))
                    this[window.id] = window;
            });
            this.setKeyListenner();
            this.setInventoryEventListener();
        };
        this.wGame.gui.on('connected', getWindowsAndStartup);
    }
    setKeyListenner() {
        this.wGame.document.onkeydown = (event) => {
            if (event.keyCode == 17)
                this.keyPressed = true;
        };
        this.wGame.document.onkeyup = (event) => {
            if (event.keyCode == 17)
                this.keyPressed = false;
        };
    }
    setInventoryEventListener() {
        if (this.exchangeInventory)
            this.exchangeInventory.on('slot-doubletap', (slot, x, y, storage) => {
                this.moveItem(slot.itemInstance, "exchangeInventory", false);
            });
        if (this.exchangeStorage)
            this.exchangeStorage.on('slot-doubletap', (slot, x, y, storage) => {
                this.moveItem(slot.itemInstance, "exchangeStorage", true);
            });
        if (this.tradeWithPlayerAndNPCInventory) {
            this.tradeWithPlayerAndNPCInventory.on('slot-doubletap', (slot) => {
                this.moveItem(slot.itemInstance, "tradeWithPlayerAndNPCInventory", false);
            });
        }
        this.wGame.gui.on('ExchangeObjectAddedMessage', (msg) => {
            if (msg.remote)
                return;
            var UID = msg.object.objectUID;
            var quantity = msg.object.quantity;
            let remove = () => {
                this.moveItem({ objectUID: UID, quantity: quantity }, "tradeWithPlayer", true);
            };
            let myTradeSpace = this.getWindow("tradeWithPlayer");
            setTimeout(() => {
                myTradeSpace._allSlots.getChild('slot' + UID).on('doubletap', remove);
            }, 500);
        });
    }
    moveItem(itemInstance, inventoryId, toStorage) {
        if (itemInstance.quantity > 1 && this.keyPressed) {
            this.wGame.dofus.sendMessage('ExchangeObjectMoveMessage', {
                objectUID: itemInstance.objectUID,
                quantity: toStorage ? -itemInstance.quantity : itemInstance.quantity
            });
            this.hideMinMaxSelector(inventoryId);
        }
    }
    getWindow(id) {
        let windows = this.wGame.gui.windowsContainer.getChildren();
        let window = null;
        for (let i in windows) {
            if (windows[i].id === id) {
                window = windows[i];
                break;
            }
        }
        if (!window)
            return null;
        if (window._myTradeSpace)
            return window._myTradeSpace;
        return window;
    }
    hideMinMaxSelector(id) {
        let window = this.getWindow(id);
        if (!window)
            return;
        switch (id) {
            case "exchangeInventory":
            case "exchangeStorage":
                window.closeMinMaxSelector();
                break;
            case "tradeWithPlayerAndNPCInventory":
            case "tradeWithPlayer":
                for (let i in window._childrenList) {
                    if (window._childrenList[i].rootElement && window._childrenList[i].rootElement.className == "minMaxSelector") {
                        window._childrenList[i].hide();
                    }
                }
        }
    }
}
exports.RapidExchange = RapidExchange;

//# sourceMappingURL=rapid-exchange.js.map
