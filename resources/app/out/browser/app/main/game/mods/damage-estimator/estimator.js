"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Estimator {
    constructor(fighter, spell, wGame) {
        this.fighter = fighter;
        this.wGame = wGame;
        this.spell = spell;
        this.createEstimator();
    }
    update(spell) {
        this.spell = spell;
        let fighter = this.wGame.gui.fightManager.getFighter(this.fighter.id);
        if (this.wGame.isoEngine.mapRenderer.isFightMode) {
            if (fighter.data.alive) {
                if (!this.estimatorContainer) {
                    this.createEstimator();
                }
                let invisible = false;
                for (let idB in fighter.buffs) {
                    if (fighter.buffs[idB].effect.effectId == 150)
                        invisible = true;
                }
                let cellId = fighter.data.disposition.cellId;
                if (cellId && !invisible) {
                    let scenePos = this.wGame.isoEngine.mapRenderer.getCellSceneCoordinate(cellId);
                    let pos = this.wGame.isoEngine.mapScene.convertSceneToCanvasCoordinate(scenePos.x, scenePos.y);
                    this.estimatorContainer.style.left = (pos.x - 40) + 'px';
                    this.estimatorContainer.style.top = (pos.y - 80) + 'px';
                }
            }
        }
    }
    createEstimator() {
        let cellId = this.fighter.data.disposition.cellId;
        let scenePos = this.wGame.isoEngine.mapRenderer.getCellSceneCoordinate(cellId);
        let pos = this.wGame.isoEngine.mapScene.convertSceneToCanvasCoordinate(scenePos.x, scenePos.y);
        if (this.wGame.document.getElementById('estimatorContainer' + this.fighter.id)) {
            this.estimatorContainer = this.wGame.document.getElementById('estimatorContainer' + this.fighter.id);
        }
        else {
            this.estimatorContainer = document.createElement('div');
            this.estimatorContainer.id = 'estimatorContainer' + this.fighter.id;
        }
        this.estimatorContainer.style.cssText = 'padding:3px; box-sizing: border-box; border: 1px gray solid; background-color: #222;color: white; position: absolute; border-radius: 3px; overflow: hidden; transition-duration: 500ms;';
        this.estimatorContainer.style.left = (pos.x - 40) + 'px';
        this.estimatorContainer.style.top = (pos.y - 80) + 'px';
        this.estimatorContainer.innerHTML = '';
        let estimations = this.getEstimations(this.spell, this.fighter);
        estimations.forEach((estimation) => {
            let displayDammage = document.createElement('div');
            displayDammage.innerHTML = `(${estimation.min} - ${estimation.max})`;
            switch (estimation.element) {
                case 'water':
                    displayDammage.style.color = '#668cff';
                    break;
                case 'fire':
                    displayDammage.style.color = '#ff5c33';
                    break;
                case 'air':
                    displayDammage.style.color = '#00e68a';
                    break;
                case 'earth':
                    displayDammage.style.color = '#cc8800';
                    break;
                case 'heal':
                    displayDammage.style.color = '#cc0080';
                    break;
            }
            console.log(estimation.element);
            this.estimatorContainer.appendChild(displayDammage);
        });
        this.wGame.document.getElementById('damage-estimator').appendChild(this.estimatorContainer);
    }
    destroy() {
        this.estimatorContainer.parentElement.removeChild(this.estimatorContainer);
    }
    getEstimations(spell, fighter) {
        let estimations = [];
        for (var effectId in spell.spellLevel.effects) {
            let effect = spell.spellLevel.effects[effectId];
            if (effect._type == "EffectInstanceDice") {
                let element = this.effectIdToElement(effect.effectId);
                if (element != "undefined") {
                    let min = this.getMinDamageDealed(element, fighter, effect);
                    let max = this.getMaxDamageDealed(element, fighter, effect);
                    estimations.push({
                        element: element,
                        min: Math.max(0, min),
                        max: Math.max(0, max),
                        isHeal: false,
                    });
                }
            }
            else {
                console.log("Quel cet effet mystique ?" + effect._type);
                console.log(effect);
                console.log("De ce sort:");
                console.log(spell);
            }
        }
        return estimations;
    }
    getFactor(element) {
        let carac = 0;
        switch (element) {
            case 'air':
                carac = this.getAgility();
                break;
            case 'fire':
                carac = this.getIntelligence();
                break;
            case 'earth':
            case 'neutral':
                carac = this.getStrength();
                break;
            case 'water':
                carac = this.getChance();
                break;
            default:
                break;
        }
        return (this.getPower() + carac + 100) / 100;
    }
    getFixDamages(element) {
        let elementalDamages = 0;
        switch (element) {
            case 'air':
                elementalDamages = this.getAirDamage();
                break;
            case 'fire':
                elementalDamages = this.getFireDamage();
                break;
            case 'earth':
                elementalDamages = this.getEarthDamage();
                break;
            case 'water':
                elementalDamages = this.getWaterDamage();
                break;
            case 'neutral':
                elementalDamages = this.getNeutralDamage();
                break;
            default:
                break;
        }
        return this.getFullCharaBonus(this.wGame.gui.playerData.characters.mainCharacter.characteristics.allDamagesBonus) + elementalDamages;
    }
    getMinBrutDamages(element, effect) {
        return Math.trunc(this.getFactor(element) * effect.diceNum + this.getFixDamages(element));
    }
    getMaxBrutDamages(element, effect) {
        return Math.trunc(this.getFactor(element) * effect.diceSide + this.getFixDamages(element));
    }
    effectIdToElement(effectId) {
        switch (effectId) {
            case 96:
            case 91:
                return 'water';
            case 97:
            case 92:
                return 'earth';
            case 98:
            case 93:
                return 'air';
            case 99:
            case 94:
                return 'fire';
            case 100:
                return 'neutral';
            case 108:
                return 'heal';
            case 101:
            case 116:
            default:
                console.log("effectId inconnu:" + effectId);
                return 'undefined';
        }
    }
    getMaxDamageDealed(element, fighter, effect) {
        if (element != "heal")
            return Math.trunc((this.getMaxBrutDamages(element, effect) - this.getResFix(element, fighter)) * (100 - this.getPercentRes(element, fighter)) / 100);
        else
            return this.getMaxHeal(element, fighter, effect);
    }
    getMinDamageDealed(element, fighter, effect) {
        if (element != "heal")
            return Math.trunc((this.getMinBrutDamages(element, effect) - this.getResFix(element, fighter)) * (100 - this.getPercentRes(element, fighter)) / 100);
        else
            return this.getMinHeal(element, fighter, effect);
    }
    getMaxHeal(element, fighter, effect) {
        return Math.trunc(effect.diceSide * (100 + this.getIntelligence()) / 100 + this.getHealingBonus());
    }
    getMinHeal(element, fighter, effect) {
        return Math.trunc(effect.diceNum * (100 + this.getIntelligence()) / 100 + this.getHealingBonus());
    }
    getHealingBonus() {
        let h = this.wGame.gui.playerData.characters.mainCharacter.characteristics.healBonus;
        return this.getFullCharaBonus(h);
    }
    getFullCharaBonus(characteristic) {
        let sum = 0;
        if (typeof characteristic.base !== 'undefined') {
            sum += characteristic.base;
        }
        if (typeof characteristic.contextModif !== 'undefined') {
            sum += characteristic.contextModif;
        }
        if (typeof characteristic.objectsAndMountBonus !== 'undefined') {
            sum += characteristic.objectsAndMountBonus;
        }
        if (typeof characteristic.alignGiftBonus !== 'undefined') {
            sum += characteristic.alignGiftBonus;
        }
        return sum;
    }
    getPower() {
        let d = this.wGame.gui.playerData.characters.mainCharacter.characteristics.damagesBonusPercent;
        return this.getFullCharaBonus(d);
    }
    getFullCharaBonusElement(characteristic) {
        let total = this.getFullCharaBonus(characteristic);
        if (total < 0)
            total = 0;
        return total;
    }
    getAgility() {
        let a = this.wGame.gui.playerData.characters.mainCharacter.characteristics.agility;
        return this.getFullCharaBonusElement(a);
    }
    getChance() {
        let a = this.wGame.gui.playerData.characters.mainCharacter.characteristics.chance;
        return this.getFullCharaBonusElement(a);
    }
    getIntelligence() {
        let a = this.wGame.gui.playerData.characters.mainCharacter.characteristics.intelligence;
        return this.getFullCharaBonusElement(a);
    }
    getStrength() {
        let a = this.wGame.gui.playerData.characters.mainCharacter.characteristics.strength;
        return this.getFullCharaBonusElement(a);
    }
    getAirDamage() {
        let a = this.wGame.gui.playerData.characters.mainCharacter.characteristics.airDamageBonus;
        return this.getFullCharaBonus(a);
    }
    getFireDamage() {
        let a = this.wGame.gui.playerData.characters.mainCharacter.characteristics.fireDamageBonus;
        return this.getFullCharaBonus(a);
    }
    getEarthDamage() {
        let a = this.wGame.gui.playerData.characters.mainCharacter.characteristics.earthDamageBonus;
        return this.getFullCharaBonus(a);
    }
    getWaterDamage() {
        let a = this.wGame.gui.playerData.characters.mainCharacter.characteristics.waterDamageBonus;
        return this.getFullCharaBonus(a);
    }
    getNeutralDamage() {
        let a = this.wGame.gui.playerData.characters.mainCharacter.characteristics.neutralDamageBonus;
        return this.getFullCharaBonus(a);
    }
    getResFix(element, fighter) {
        return this.getResFixElement(element, fighter) + this.getResFixSpell(element, fighter);
    }
    getResFixElement(element, fighter) {
        let stats = fighter.data.stats;
        let res = 0;
        switch (element) {
            case 'air':
                res = stats.waterElementReduction;
                break;
            case 'fire':
                res = stats.fireElementReduction;
                break;
            case 'earth':
                res = stats.earthElementReduction;
                break;
            case 'water':
                res = stats.waterElementReduction;
                break;
            case 'neutral':
                res = stats.neutralElementReduction;
                break;
            default:
                break;
        }
        return res;
    }
    getResFixSpell(element, fighter) {
        let res = 0;
        for (var buff of fighter.buffs) {
            let caster = this.wGame.gui.fightManager.getFighter(buff.source);
            let lvl = caster.level;
            if (buff.effect.effect.characteristic == 16) {
                switch (buff.castingSpell.spell.id) {
                    case 1:
                        if (element = 'fire')
                            res += buff.effect.value * (100 + 5 * lvl) / 100;
                        break;
                    case 18:
                        console.log("armure aqueuse: " + element);
                        if (element = 'water')
                            res += buff.effect.value * (100 + 5 * lvl) / 100;
                        break;
                    case 6:
                        if (element = 'earth')
                            res += buff.effect.value * (100 + 5 * lvl) / 100;
                        break;
                    case 14:
                        if (element = 'air')
                            res += buff.effect.value * (100 + 5 * lvl) / 100;
                        break;
                    case 5:
                    case 127:
                        res += buff.effect.value * (100 + 5 * lvl) / 100;
                        break;
                    default:
                        console.log("Quel est ce buff: " + buff.effect.effectId + " - " + buff.effect.description);
                        console.log("catégorie: " + buff.effect.effect.category);
                        break;
                }
            }
        }
        return Math.trunc(res);
    }
    getPercentRes(element, fighter) {
        let stats = fighter.data.stats;
        let res = 0;
        switch (element) {
            case 'air':
                res = stats.waterElementResistPercent;
                break;
            case 'fire':
                res = stats.fireElementResistPercent;
                break;
            case 'earth':
                res = stats.earthElementResistPercent;
                break;
            case 'water':
                res = stats.waterElementResistPercent;
                break;
            case 'neutral':
                res = stats.neutralElementResistPercent;
                break;
            default:
                break;
        }
        if ((!fighter.isCreature) && res > 50)
            res = 50;
        return res;
    }
}
exports.Estimator = Estimator;

//# sourceMappingURL=estimator.js.map
