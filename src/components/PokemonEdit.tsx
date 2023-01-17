import { useState, useMemo, useCallback } from "preact/hooks";
import { POKEMONS, POKEMON_NAMES } from "../constants/pokemons";
import { ATTRIBUTES, ATTRIBUTE_NAMES } from "../constants/attributes";
import { computeDefaultEffectiveness } from "../utils/effectiveness";
import { HexChart } from "./HexChart";
import { evaluate } from "../utils/evaluator";
import { optimizePokemon } from "../utils/optimizer";

const STAT_FIELDS: { index: ValueFieldIndex, label: string }[] = [
  { index: "h", label: "HP" },
  { index: "a", label: "攻撃" },
  { index: "b", label: "防御" },
  { index: "c", label: "特攻" },
  { index: "d", label: "特防" },
  { index: "s", label: "素早" },
];

type Props = {
  pokemon: Pokemon,
  onUpdate: (value: Pokemon) => void,
};

export const PokemonNameEdit = ({
  pokemon,
  onUpdate,
}: Props) => {
  const { name, tag, attributes, teraAttribute, bonus, computed, computedWithBonus } = pokemon;
  const nameMatches = !!POKEMONS[name];

  const onInputName = (e: Event) => {
    const name = (e.target as HTMLInputElement).value! as string;
    const template = POKEMONS[name];
    if (template) {
      onUpdate(
        optimizePokemon({
          name: name,
          tag: "",
          attributes: template.types,
          teraAttribute: template.types[0],
          effectiveness: computeDefaultEffectiveness(template.types),
          teraEffectiveness: computeDefaultEffectiveness([template.types[0]]),
          baseStats: template.stats,
          iv: { h: 31, a: 31, b: 31, c: 31, d: 31, s: 31 },
          ev: { h: 0, a: 0, b: 0, c: 0, d: 0, s: 0 },
          n: { a: 1, b: 1, c: 1, d: 1, s: 1 },
          bonus: { h: 1, a: 1, b: 1, c: 1, d: 1, s: 1 },
          optimizationStrategy: "hbd",
          bdBalance: 0.5,
        })
      );
    } else {
      onUpdate({ ...pokemon, name });
    }
  };

  const onInputTag = (e: Event) => {
    const tag = (e.target as HTMLInputElement).value! as string;
    onUpdate({ ...pokemon, tag });
  };

  const onInputTeratype = (e: Event) => {
    const value = (e.target as HTMLSelectElement).value as Attribute;
    onUpdate({
      ...pokemon,
      teraAttribute: value,
      teraEffectiveness: computeDefaultEffectiveness([value]),
    });
  };

  const attackType = computedWithBonus.a > computedWithBonus.c ? "a" : "c";
  const attackTypeLabel = attackType === "a" ? "物理" : "特殊";

  return <>
    <datalist id="pokemon-names">
      { POKEMON_NAMES.map((name) => <option key={ name } value={ name } />) }
    </datalist>
    <p>
      <table>
        <tr>
          <td rowSpan={ 9 }>
            <HexChart pokemon={ pokemon } size={ 256 } />
          </td>
          <td>種族</td>
          <td>
            <input list="pokemon-names" value={ name } onInput={ onInputName } />
            { nameMatches ?  " 👍" : " 🚨" }
          </td>
        </tr>
        <tr>
          <td>調整名</td>
          <td><input type="text" value={ tag } onInput={ onInputTag } /></td>
        </tr>
        <tr>
          <td>タイプ</td>
          <td>{ attributes.join(", ") }</td>
        </tr>
        <tr>
          <td>テラスタイプ</td>
          <td>
            <select value={ teraAttribute } onInput={ onInputTeratype }>
              { ATTRIBUTE_NAMES.map((name) => (
                <option key={ name } value={ name }>{ name }</option>
              )) }
            </select>
          </td>
        </tr>
        <tr>
          <td>攻撃力 <small>{ attackTypeLabel }</small></td>
          <td>
            { computed[attackType] }
            { bonus[attackType] !== 1 && <span> ({ computedWithBonus[attackType] })</span> }
          </td>
        </tr>
        <tr>
          <td>素早さ</td>
          <td>{ computedWithBonus.s }</td>
        </tr>
        <tr>
          <td>物理耐久</td>
          <td>{ Math.floor(computedWithBonus.hb / 0.44) }</td>
        </tr>
        <tr>
          <td>特殊耐久</td>
          <td>{ Math.floor(computedWithBonus.hd / 0.44) }</td>
        </tr>
        <tr>
          <td>総合耐久</td>
          <td>{ Math.floor(computedWithBonus.evenHBD / 0.44) }</td>
        </tr>
      </table>
      <small>※ 青三角が正三角形のとき効率的な耐久指数 (H=B+D∧B=D) になります</small>
    </p>
  </>;
};

export const PokemonTypeEdit = ({
  pokemon,
  onUpdate,
}: Props) => {
  const { effectiveness, teraEffectiveness } = pokemon;
  return <>
    <p>
      <table>
        <tr>
          <td></td>
          { ATTRIBUTE_NAMES.map((name) => <td key={ name }>{ ATTRIBUTES[name].abbrev }</td>) }
        </tr>
        <tr>
          <td>通常</td>
          { ATTRIBUTE_NAMES.map((name) => <td key={ name }>{ effectiveness[name] }</td>) }
        </tr>
        <tr>
          <td>テラス</td>
          { ATTRIBUTE_NAMES.map((name) => <td key={ name }>{ teraEffectiveness[name] }</td>) }
        </tr>
      </table>
    </p>
  </>;
};

const PokemonStatsEdit = ({
  pokemon,
  onUpdate,
}: Props) => {
  const {
    baseStats,
    iv,
    ev,
    n,
    bonus,
    optimizationStrategy,
    bdBalance,
    optimized,
  } = pokemon;

  const onInputStat = (
    e: Event,
    category: "ev" | "iv" | "n" | "bonus",
    field: ValueFieldIndex,
  ) => {
    const value = Number((e.target as HTMLInputElement).value);
    if (!isNaN(value)) {
      onUpdate(
        optimizePokemon({
          ...pokemon,
          [category]: { ...pokemon[category], [field]: value },
        })
      );
    }
  };

  const onInputBalance = (e: Event) => {
    const value = Number((e.target as HTMLInputElement).value);
    if (!isNaN(value)) {
      onUpdate(optimizePokemon({ ...pokemon, bdBalance: value }));
    }
  };

  const onInputStrategy = (e: Event) => {
    const value = (e.target as HTMLSelectElement).value as OptimizationStrategy;
    onUpdate(optimizePokemon({ ...pokemon, optimizationStrategy: value }));
  };

  const [level, setLevel] = useState(50);
  const onChangeLevel = useCallback((e: Event) => {
    const value = Number((e.target as HTMLInputElement).value);
    if (!isNaN(value)) {
      setLevel(value);
    }
  }, [setLevel]);
  const { computed, computedWithBonus } = useMemo(() => {
    if (level === 50) {
      return pokemon;
    } else {
      return evaluate(pokemon, level);
    }
  }, [pokemon, level]);

  return <>
    Lv：
    <input
        type="range"
        min="1"
        max="100"
        step="1"
        value={ level }
        onInput={ onChangeLevel } />
    { level }
    <table>
      <tr>
        <td></td>
        <td>種族値</td>
        <td>個体値</td>
        <td>
          努力値&nbsp;
          <small>(残り{ 508 - (ev.h + ev.a + ev.b + ev.c + ev.d + ev.s) })</small>
        </td>
        <td>性格補正</td>
        <td>道具・特性等</td>
        <td>実数値</td>
      </tr>
      { STAT_FIELDS.map((field) => (
        <tr key={ field.label }>
          <td>{ field.label }</td>
          <td>{ baseStats[field.index] }</td>
          <td>
            <select value={ iv[field.index] } onInput={ (e) => onInputStat(e, "iv", field.index) }>
              <option value="31">31</option>
              <option value="0">0</option>
            </select>
          </td>
          <td>
            { optimizationStrategy && optimizationStrategy.match(field.index) ? (
              optimized.ev[field.index]
            ) : <>
              <input
                  type="range"
                  value={ ev[field.index] }
                  min="0"
                  max="252"
                  step="4"
                  onInput={ (e) => onInputStat(e, "ev", field.index) } />
              { ev[field.index] }
            </> }
          </td>
          <td>
            { field.index === "h" ? (
              "-"
            ) : optimizationStrategy && optimizationStrategy.match(field.index) ? (
              optimized.n[field.index]
            ) : <>
              <select
                  value={ n[field.index] }
                  onInput={ (e) => onInputStat(e, "n", field.index) }>
                <option value="1">1.0</option>
                <option value="1.1">1.1</option>
                <option value="0.9">0.9</option>
              </select>
            </> }
          </td>
          <td>
            x&nbsp;
            <input
                type="number"
                value={ bonus[field.index] }
                min="0"
                max="2"
                step="0.1"
                onInput={ (e) => onInputStat(e, "bonus", field.index) } />
          </td>
          <td>
            { computed[field.index] }
            { field.index === "h" && (
              <small>{ computed.h % 16 === 15 ? " 16n-1" : ` 16n+${computed.h % 16}` }</small>
            ) }
            { bonus[field.index] !== 1 && <span> ({ computedWithBonus[field.index] })</span> }
          </td>
        </tr>
      )) }
      </table>
      <p>
        努力値の残りを自動で振る：
        <select value={ optimizationStrategy } onInput={ (e) => onInputStrategy(e) }>
          <option value="hbd">耐久 (HBD)</option>
          <option value="h">HP</option>
          <option value="a">攻撃</option>
          <option value="c">特攻</option>
          <option value="s">素早</option>
          <option value="">振らない</option>
        </select>
        { optimizationStrategy === "hbd" && <>
          &nbsp;
          物理寄り
          <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={ bdBalance }
              onInput={ (e) => onInputBalance(e) } />
          { Math.floor(bdBalance * 100) }% 特殊寄り
        </> }
      </p>
  </>;
};

export const PokemonEdit = ({
  pokemon,
  onUpdate,
}: Props) => {
  return (
    <div>
      <PokemonNameEdit pokemon={ pokemon } onUpdate={ onUpdate } />
      <PokemonTypeEdit pokemon={ pokemon } onUpdate={ onUpdate } />
      <PokemonStatsEdit pokemon={ pokemon } onUpdate={ onUpdate } />
    </div>
  );
}
