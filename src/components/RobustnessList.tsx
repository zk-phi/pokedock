/* 技をどっち側で入れさせるか問題があるな */

import { POKEMONS, POKEMON_NAMES } from "../constants/pokemons";
import { optimizePokemon } from "../utils/optimizer";
import { computeDefaultEffectiveness } from "../utils/effectiveness";

const genRobustnessList = (balance: number) => {
  const valueKey = balance < 0.5 ? "hb" : "hd";
  return POKEMON_NAMES.flatMap((name) => {
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
    };
    return [
      optimizePokemon({
        ...baseSettings,
        tag: "HB4振り",
        ev: { h: 0, a: 252, b: 0, c: 0, d: 0, s: 252 },
        n:  {       a: 1.1, b: 1, c: 1, d: 1, s: 1   },
        optimizationStrategy: "hbd" as OptimizationStrategy,
        bdBalance: balance,
      }),
      optimizePokemon({
        ...baseSettings,
        tag: "H252振り",
        ev: { h: 252, a: 252, b: 0, c: 0, d: 0, s: 4 },
        n:  {         a: 1.1, b: 1, c: 1, d: 1, s: 1 },
      }),
      optimizePokemon({
        ...baseSettings,
        tag: "HBD508振り",
        optimizationStrategy: "hbd" as OptimizationStrategy,
      }),
      optimizePokemon({
        ...baseSettings,
        tag: "HB504振り",
        ev: { h: 0, a: 4, b: 0, c: 0, d: 0, s: 0 },
        optimizationStrategy: "hbd" as OptimizationStrategy,
        bdBalance: balance,
      }),
    ];
  }).filter((_, ix, arr) => (
    ix === 0 || arr[ix].computedWithBonus[valueKey] > arr[ix - 1].computedWithBonus[valueKey]
  ))
};

const ROBUSTNESS_LIST = { b: genRobustnessList(0), d: genRobustnessList(1) };
