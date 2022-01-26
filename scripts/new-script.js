import {RendererGame, RendererTransformers} from "./visualisation.module.js";
import {Weapon, Autobot, Deceptikon, Arena, BattleInterval} from "./gameLogic.module.js";

const autobots = [
    new Autobot(`OptimusPrime`, new Weapon(100, 1000), new RendererTransformers(`./css/images/side1.png`)),
    new Autobot(`OptimusPrime2`, new Weapon(100, 1000), new RendererTransformers(`./css/images/side1.png`)),
    new Autobot(`OptimusPrime3`, new Weapon(100, 1000), new RendererTransformers(`./css/images/side1.png`)),
    new Autobot(`OptimusPrime4`, new Weapon(100, 1000), new RendererTransformers(`./css/images/side1.png`)),
    new Autobot(`OptimusPrime5`, new Weapon(100, 1000), new RendererTransformers(`./css/images/side1.png`))
];
const deceptikons = [
    new Deceptikon(`Megatron`, new RendererTransformers(`./css/images/side2.png`), 10000)
]

const arena = new Arena(
    autobots,
    deceptikons,
    new RendererGame(document.querySelector(`.arena-side-1`), `Автоботы`),
    new RendererGame(document.querySelector(`.arena-side-2`), `Десептиконы`),
    new BattleInterval()
);
arena.preparationForBattle();
arena.battle();




