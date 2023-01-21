import { useState } from 'preact/hooks'
import { computed } from '@preact/signals';
import { POKEMONS, POKEMON_NAMES } from "../constants/pokemons";
import { optimizePokemon } from "../utils/optimizer";
import { computeDefaultEffectiveness } from "../utils/effectiveness";
import { isPickedUp } from "../store/localstorage";

type RobustnessRow = {
  name: string,
  tag: string,
  ev: Values,
  n: NValues,
  hb: number,
  hd: number,
  moveName: string,
  effectiveness: number,
  minDamageRatio: number,
  maxDamageRatio: number,
  minCount: number,
  percentile: number,
  gradient: string,
};

type FilterFn = (row: RobustnessRow) => boolean;

const FILTER_NAMES = [
  "すべて",
  "無効以外",
  "半減以下",
  "等倍",
  "等倍以上",
  "抜群以上",
];

const FILTERS: Record<string, FilterFn> = {
  "すべて": (row: RobustnessRow) => true,
  "無効以外": (row: RobustnessRow) => row.effectiveness > 0,
  "半減以下": (row: RobustnessRow) => row.effectiveness <= 0.5 && row.effectiveness > 0,
  "等倍": (row: RobustnessRow) => row.effectiveness === 1,
  "等倍以上": (row: RobustnessRow) => row.effectiveness >= 1,
  "抜群以上": (row: RobustnessRow) => row.effectiveness >= 2,
};

const ROBUSTNESSES = computed(() => (
  POKEMON_NAMES.filter((name) => (
    isPickedUp.value[name]
  )).flatMap((name) => {
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
        tag: "HB",
        ev: { h: 252, a: 0, b: 252, c: 0, d: 4, s: 0 },
        n: { a: 1, b: 1.1, c: 1, d: 1, s: 1 },
        optimizationStrategy: "" as OptimizationStrategy,
      }),
      optimizePokemon({
        ...baseSettings,
        tag: "HD",
        ev: { h: 252, a: 0, b: 4, c: 0, d: 252, s: 0 },
        n: { a: 1, b: 1, c: 1, d: 1.1, s: 1 },
        optimizationStrategy: "" as OptimizationStrategy,
      }),
      optimizePokemon({
        ...baseSettings,
        tag: "総合耐久",
        optimizationStrategy: "hbd" as OptimizationStrategy,
      }),
    ];
  })
));

const f = Math.floor;
const r = Math.round; // 正確には一部の計算には四捨五超入が使われる
const c = Math.ceil;

const evaluateMove = (atk: Pokemon, move: Move, def: Pokemon): RobustnessRow => {
  const {
    attributes,
    teraAttribute,
    bonus,
    computed: atkComputed,
  } = atk;
  const {
    name,
    tag,
    optimized: { ev, n },
    computed: defComputed,
    computedWithBonus: { hb, hd },
    effectiveness: defEffectiveness,
  } = def;
  const {
    name: moveName,
    attribute,
    category,
    strength,
    bonus: { rank, weather, other },
    terastal,
  } = move

  const effectiveness = defEffectiveness[attribute];
  const rankBonus = rank < 0 ? 1 / (1 - rank / 2) : 1 + rank / 2;
  const attrBonus = attributes.includes(attribute) ? (
    terastal && teraAttribute === attribute ? 2 : 1.5
  ) : (
    terastal && teraAttribute === attribute ? 1.5 : 1
  );
  const attackBonus = bonus[category === "物理" ? "a" : "c"];

  const defence = defComputed[category === "物理" ? "b" : "d"];
  const attack = f(atkComputed[category === "物理" ? "a" : "c"] * rankBonus);

  const maxPow = r(f(f(22 * strength * attack / defence) / 50 + 1) * weather);
  const minPow = f(maxPow * 0.85);
  const maxDamage = f(r(maxPow * attrBonus) * effectiveness);
  const minDamage = f(r(minPow * attrBonus) * effectiveness);
  const maxDamageWithBonus = r(r(maxDamage * attackBonus) * other);
  const minDamageWithBonus = r(r(minDamage * attackBonus) * other);
  const maxDamageRatio = maxDamageWithBonus / def.computedWithBonus.h;
  const minDamageRatio = minDamageWithBonus / def.computedWithBonus.h;
  const minCount = c(1 / maxDamageRatio);

  const percentile = f(
    (maxDamageRatio - 1 / minCount) / (maxDamageRatio - minDamageRatio) * 100
  );

  const gradient = (
    "linear-gradient(to right, " +
    "#ff000060 0%, " +
    "#ff000060 " + (minDamageRatio * 100) + "%, " +
    "#ff000030 " + (minDamageRatio * 100) + "%, " +
    "#ff000030 " + (maxDamageRatio * 100) + "%, " +
    "transparent " + (maxDamageRatio * 100) + "%" +
    ")"
  );

  return {
    name,
    tag,
    ev,
    n,
    hb,
    hd,
    moveName,
    effectiveness,
    minDamageRatio,
    maxDamageRatio,
    minCount,
    percentile,
    gradient,
  };
};

const evaluate = (atk: Pokemon, moves: Move[], def: Pokemon): RobustnessRow => (
  moves.map((move) => (
    evaluateMove(atk, move, def)
  )).reduce((l, r) => (
    l.minDamageRatio < r.minDamageRatio ? r : l
  ))
);

export const RobustnessList = ({ pokemon }: {
  pokemon?: Pokemon | null,
}) => {
  const filteredMoves = pokemon ? pokemon.moves.filter((move) => move.category !== "変化") : [];
  if (!pokemon || filteredMoves.length === 0) return null;

  const category = pokemon.computedWithBonus.a > pokemon.computedWithBonus.c ? "物理" : "特殊";
  const [filter, setFilter] = useState(FILTER_NAMES[0]);

  const rows = ROBUSTNESSES.value.map((def) => evaluate(pokemon, filteredMoves, def));
  const list = rows.filter(FILTERS[filter]).sort((a, b) => (
    category === "物理" ? b.hb - a.hb : b.hd - a.hd
  ));

  const onSelectFilter = (e: Event) => {
    const value = (e.target as HTMLSelectElement).value;
    setFilter(value);
  };

  return <>
    <h2>耐久ランキング</h2>
    <p>
      フィルタ：
      <select value={ filter } onInput={ onSelectFilter }>
        { FILTER_NAMES.map((name) => <option value={ name }>{ name }</option>) }
      </select>
    </p>
    <table>
      <tr>
        <td>ポケモン</td>
        <td>{ category }耐久</td>
      </tr>
      { list.map((row) => (
        <tr>
          <td>
            { row.name } <small>{ row.tag }</small><br />
            <small>
              H{ row.ev.h } -
              B{ row.ev.b }{ row.n.b > 1 ? "↑" : row.n.b < 1 ? "↓" : "" } -
              D{ row.ev.d }{ row.n.d > 1 ? "↑" : row.n.d < 1 ? "↓" : "" }
            </small>
          </td>
          <td style={{ backgroundImage: row.gradient }}>
            { category === "物理" ? f(row.hb / 0.44) : f(row.hd / 0.44) }<br />
          <small>
            { f(row.minDamageRatio * 100) }〜{ f(row.maxDamageRatio * 100) }%
            / { row.minCount }発({ row.percentile >= 100 ? "確定" : `${row.percentile}%` })
            @{ row.moveName }(x{ row.effectiveness })
          </small>
          </td>
        </tr>
      )) }
    </table>
  </>;
};
