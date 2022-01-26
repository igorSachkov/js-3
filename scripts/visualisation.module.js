export class RendererGame {
    constructor(arenaSide, sideName) {
        this.arenaSide = arenaSide;
        this.sideName = sideName;
    }

    renderFighter(arrayFighters) {

        this.arenaSide.innerHTML = ``;
        for (let fighter of arrayFighters) {
            const bot = document.createElement(`div`);
            bot.classList.add(`bot`);
            const healthBar = document.createElement(`span`);
            healthBar.textContent = `${fighter.health} hp`;
            bot.append(healthBar);
            bot.style.backgroundImage = `url('${fighter.visualisation.fighterImage}')`;
            this.arenaSide.append(bot);
        }
    }

    renderHit(boolean) {
        if (this.arenaSide.firstChild && boolean) {
            this.arenaSide.firstChild.classList.add(`hit`)
            setTimeout(() => this.arenaSide.firstChild.classList.remove(`hit`), 200)
        }


    }

    renderVictoryMessage(fallenFighters) {
        const victoryMessage = document.createElement(`h2`);
        victoryMessage.innerHTML = `Команда ${this.sideName} победила! Для победы нужен ${fallenFighters.length + 1} трансформер`
        document.body.append(victoryMessage);

    }
}

export class RendererTransformers {
    constructor(fighterImage) {
        this.fighterImage = fighterImage;
    }
}