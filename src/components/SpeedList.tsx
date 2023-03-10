import { useState } from "preact/hooks";
import { computed } from "@preact/signals";
import { POKEMONS, POKEMON_NAMES } from "../constants/pokemons";
import { computeDefaultEffectiveness } from "../utils/effectiveness";
import { optimizePokemon } from "../utils/optimizer";
import { isPickedUp } from "../store/localstorage";

type FilterFn = (pokemon: Pokemon) => boolean;

const FILTER_NAMES = [
  "すべて",
];

const FILTERS: Record<string, FilterFn> = {
  "すべて": (pokemon: Pokemon) => true,
};

const SPEEDS = computed(() => (
  POKEMON_NAMES.filter((name) => (
    isPickedUp.value[name]
  )).flatMap((name) => {
    const baseSettings = {
      name,
      attributes: POKEMONS[name].attributes,
      teraAttribute: POKEMONS[name].attributes[0],
      effectiveness: computeDefaultEffectiveness(POKEMONS[name].attributes),
      teraEffectiveness: computeDefaultEffectiveness([POKEMONS[name].attributes[0]]),
      baseStats: POKEMONS[name].baseStats,
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
        tag: "最遅",
        iv: { h: 31, a: 31, b: 31, c: 31, d: 31, s: 0   },
        n:  {        a: 1,  b: 1,  c: 1,  d: 1,  s: 0.9 },
      }),
      optimizePokemon({
        ...baseSettings,
        tag: "無振り",
      }),
      optimizePokemon({
        ...baseSettings,
        tag: "準速",
        ev: { h: 0, a: 0, b: 0, c: 0, d: 0, s: 252 },
      }),
      optimizePokemon({
        ...baseSettings,
        tag: "最速",
        ev: { h: 0, a: 0, b: 0, c: 0, d: 0, s: 252 },
        n:  {       a: 1, b: 1, c: 1, d: 1, s: 1.1 },
      }),
    ];
  }).sort((a, b) => (
    b.computedWithBonus.s - a.computedWithBonus.s
  ))
));

const Cell = ({ pokemon, value }: {
  pokemon?: Pokemon | null,
  value: number,
}) => {
  const color = !pokemon ? (
    "inherit"
  ) : pokemon.computedWithBonus.s > value ? (
    "#ff000030"
  ) : pokemon.computedWithBonus.s < value ? (
    "#0000ff30"
  ) : (
    "inherit"
  );
  return (
    <td style={{ background: color }}>
      { value }
    </td>
  );
};

export const SpeedList = ({ pokemon }: {
  pokemon?: Pokemon | null,
}) => {
  const [filter, setFilter] = useState(FILTER_NAMES[0]);
  const list = SPEEDS.value.filter(FILTERS[filter]);

  const onSelectFilter = (e: Event) => {
    const value = (e.target as HTMLSelectElement).value;
    setFilter(value);
  };

  return <>
    <h2>素早さ調整ツール</h2>
    { pokemon && (
      <p>{ pokemon.name }が抜かれているポケモンは青で表示されます。</p>
    ) }
    <p>スカーフや竜舞を積んだ後の素早さは「＋１」を参照してください。</p>
    <p>
      フィルタ：
      <select value={ filter } onInput={ onSelectFilter }>
        { FILTER_NAMES.map((name) => <option value={ name }>{ name }</option>) }
      </select>
    </p>
    <table>
      <tr>
        <td>ポケモン</td>
        <td>実数値</td>
        <td>＋１</td>
        <td>＋２</td>
      </tr>
      { list.map(({ name, tag, optimized: { ev, n }, computedWithBonus }) => (
        <tr>
          <td>
            { name } <small>{ tag }</small><br />
            <small>S{ ev.s }{ n.s > 1 ? "↑" : n.s < 1 ? "↓" : "" }</small>
          </td>
          <Cell pokemon={ pokemon } value={ computedWithBonus.s } />
          <Cell pokemon={ pokemon } value={ Math.floor(computedWithBonus.s * 1.5) } />
          <Cell pokemon={ pokemon } value={ Math.floor(computedWithBonus.s * 2) } />
        </tr>
      )) }
    </table>
  </>;
};
