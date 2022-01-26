export class Weapon {
    constructor(damage = 5, speed = 1000) {
        this.damage = damage;
        this.speed = speed
    }

    fight() {
        return {
            damage: this.damage,
            speed: this.speed
        }
    }
}


class Transformers {

    constructor(name, visualisation, health = 100) {

        this.name = name;
        this.visualisation = visualisation;
        this.health = health;
    }

    atack() {
    }

    hit(fight) {
        this.health = this.health - fight.damage;
    }

}

export class Autobot extends Transformers {
    constructor(name, weapon, visualisation) {
        super(name, visualisation);
        this.weapon = weapon;
    }

    attack() {
        return this.weapon.fight()
    }
}

export class Deceptikon extends Transformers {
    attack() {
        return {damage: 5, speed: 1000}
    }
}

export class Arena {
    constructor(arrayFighters1, arrayFighters2, rendererArena1, rendererArena2, battleInterval) {
        this.arrayFighters1 = arrayFighters1;
        this.arrayFighters2 = arrayFighters2;
        this.fallenFighters1 = [];
        this.fallenFighters2 = [];
        this.rendererArena1 = rendererArena1;
        this.rendererArena2 = rendererArena2;
        this.battleInterval = battleInterval;
        this.sideMove = this.sideMove.bind(this);
        this.victory = this.victory.bind(this);
    }

    preparationForBattle() {
        if (!this.arrayFighters1[0] || !this.arrayFighters2[0]) throw new Error(`стороны конфликта не были представлены`);
        this.rendererArena1.renderFighter(this.arrayFighters1);
        this.rendererArena2.renderFighter(this.arrayFighters2);
    }

    battle() {

        this.battleInterval.interval1 = this.battleInterval.setBattleInterval(this.sideMove, this.arrayFighters1[0].attack().speed, this.arrayFighters1, this.arrayFighters2, this.rendererArena2, this.fallenFighters2);
        this.battleInterval.interval2 = this.battleInterval.setBattleInterval(this.sideMove, this.arrayFighters2[0].attack().speed, this.arrayFighters2, this.arrayFighters1, this.rendererArena1, this.fallenFighters1);

    }

    sideMove(side1, side2, rendererArena, fallenFighters) {
        if (side1[0] && side2[0]) {
            const firstFighter = side2[0];
            side2[0].hit(side1[0].attack());
            rendererArena.renderFighter(side2);
            this.deathOfAFighter(side2, fallenFighters, rendererArena);
            rendererArena.renderHit(firstFighter === side2[0]);
        }
    }


    deathOfAFighter(side, fallenFighters, arenaSide) {
        if (side[0].health <= 0) {
            fallenFighters.push(side[0]);
            side.shift();
            arenaSide.renderFighter(side);


            //интервальные дела
            this.battleInterval.stopInterval();
            this.victory();
            if (this.arrayFighters1[0] && this.arrayFighters2[0]) {
                this.battle();
            }

        }
    }

    victory() {
        if (!this.arrayFighters1[0] && !this.arrayFighters2[0]) {
            this.battleInterval.stopInterval();
            console.log(`ничья!`);
        }

        if (!this.arrayFighters1[0]) {
            this.battleInterval.stopInterval();
            this.rendererArena2.renderVictoryMessage(this.fallenFighters2)
            console.log(`сторона 1 проиграла, для победы над свои жизни отдали ${this.fallenFighters2.length} трансформеров`);
        }
        if (!this.arrayFighters2[0]) {
            this.battleInterval.stopInterval();
            this.rendererArena1.renderVictoryMessage(this.fallenFighters1)
            console.log(`сторона 2 проиграла, для победы над свои жизни отдали ${this.fallenFighters1.length} трансформеров`);
        }
        return false
    }

}

export class BattleInterval {

    constructor() {
        this.interval1;
        this.interval2;
    }
    setBattleInterval(func, timer, arrayFighters1, arrayFighters2, rendererArena, fallenFighters) {
        return setInterval(() => {
            func(arrayFighters1, arrayFighters2, rendererArena, fallenFighters)
        }, timer)
    }
    stopInterval() {
        clearInterval(this.interval1);
        clearInterval(this.interval2);
    }
}