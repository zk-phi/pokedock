import { POKEMONS, POKEMON_NAMES } from "../constants/pokemons";
import { optimizePokemon } from "../utils/optimizer";
import { computeDefaultEffectiveness } from "../utils/effectiveness";

const ROBUSTNESSES = POKEMON_NAMES.flatMap((name) => {
  const baseSettings = {
    name,
    attributes: POKEMONS[name].types,
    teraAttribute: POKEMONS[name].types[0],
    effectiveness: computeDefaultEffectiveness(POKEMONS[name].types),
    teraEffectiveness: computeDefaultEffectiveness([POKEMONS[name].types[0]]),
    baseStats: POKEMONS[name].stats,
    iv: { h: 31, a: 31, b: 31, c: 31, d: 31, s: 31 } as Values,
    ev: { h: 0, a: 0, b: 0, c: 0, d: 0, s: 0 } as Values,
    n: { a: 1, b: 1, c: 1, d: 1, s: 1 } as NValues,
    bonus: { h: 1, a: 1, b: 1, c: 1, d: 1, s: 1 } as Values,
    optimizationStrategy: "" as OptimizationStrategy,
    bdBalance: 0.5,
    moves: [],
  };
  return [
    optimizePokemon({
      ...baseSettings,
      tag: "H4",
      ev: { h: 4, a: 0, b: 0, c: 0, d: 0, s: 0 },
    }),
    optimizePokemon({
      ...baseSettings,
      tag: "H252",
      ev: { h: 252, a: 0, b: 0, c: 0, d: 0, s: 0 },
    }),
    optimizePokemon({
      ...baseSettings,
      tag: "耐久特化 (物理)",
      optimizationStrategy: "hbd" as OptimizationStrategy,
      bdBalance: 0,
    }),
    optimizePokemon({
      ...baseSettings,
      tag: "耐久特化 (特殊)",
      optimizationStrategy: "hbd" as OptimizationStrategy,
      bdBalance: 1,
    }),
    optimizePokemon({
      ...baseSettings,
      tag: "耐久特化 (総合)",
      optimizationStrategy: "hbd" as OptimizationStrategy,
    }),
  ];
});

type RobustnessRow = {
  name: string,
  tag: string,
  effectiveness: number,
  minDamage: number,
  maxDamage: number,
  minTimes: number,
  probablity: number,
  moveIndex: number,
};
