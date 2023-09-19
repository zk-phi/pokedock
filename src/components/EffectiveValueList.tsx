import { computed } from "@preact/signals";
import { POKEMONS, POKEMON_NAMES } from "../constants/pokemons";
import { isPickedUp } from "../store/localstorage";

type Item = {
  name: string,
  effectiveValue: Values & { sum: number },
  value: Values & { sum: number },
};

const EFFECTIVE_VALUES = computed<Item[]>(() => (
  POKEMON_NAMES.flatMap((name) => {
    const { h, a, b, c, d, s } = POKEMONS[name].baseStats;
    const atk = Math.max(a, c);
    const robustness = h * b * d / (b + d);
    /* robustness = b ^ 2 (when h = b + d and b = d) */
    const def = Math.round(Math.sqrt(robustness));
    /* h + b + d = b * 4 (when h = b + d and b = d) */
    return {
      name,
      effectiveValue: {
        h: def * 2,
        a: a >= c ? a : 0,
        b: def,
        c: c > a  ? c : 0,
        d: def,
        s,
        sum: def * 4 + atk + s
      },
      value: {
        h, a, b, c, d, s,
        sum: h + a + b + c + d + s,
      },
    };
  }).sort((a, b) => (
    b.effectiveValue.sum - a.effectiveValue.sum
  ))
));

export const EffectiveValueList = () => {
  return <>
    <h2>有効種族値ランキング</h2>
    <p>「A が高いポケモンの C」「耐久値を最適 (H=B+D) に振り直した時の余り」などを差し引いた、実質的な種族値です。</p>
    <p>無難な育成（攻撃面は物理・特殊特化、防御面は両受け）をした場合の強さの参考に。</p>
    <table>
      <tr>
        <td>ポケモン</td>
        <td>有効種族値</td>
        <td>実種族値</td>
        <td>max(A, C)</td>
        <td>2HBD/(B+D)/.44/180</td>
        <td>S</td>
      </tr>
      { EFFECTIVE_VALUES.value.map(({ name, effectiveValue, value }) => (
        <tr>
          <td>{ name }</td>
          <td>
            { effectiveValue.sum }
            { " " }
            <small>({ Math.floor(effectiveValue.sum / value.sum * 100) }%)</small>
          </td>
          <td>{ value.sum }</td>
          <td>
            { Math.max(value.a, value.c) } <br />
            <small><s>{value.a}+{value.c}</s></small> <br />
            <small>{effectiveValue.a}+{effectiveValue.c}</small>
          </td>
          <td>
            { Math.round(effectiveValue.h * effectiveValue.b / 0.44 / 180) } <br />
            <small><s>{value.h}+{value.b}+{value.d}</s></small> <br />
            <small>{effectiveValue.h}+{effectiveValue.b}+{effectiveValue.d}</small>
          </td>
          <td>
            {value.s}
          </td>
        </tr>
      )) }
    </table>
  </>;
};
