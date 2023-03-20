import { useState, useMemo, useCallback } from "preact/hooks";
import { POKEMONS, POKEMON_NAMES } from "../constants/pokemons";
import { MOVES, MOVE_NAMES } from "../constants/moves";
import { ATTRIBUTES, ATTRIBUTE_NAMES } from "../constants/attributes";
import { computeDefaultEffectiveness } from "../utils/effectiveness";
import { HexChart } from "./HexChart";
import { evaluate } from "../utils/evaluator";
import { optimizePokemon } from "../utils/optimizer";

const color: Record<number, string> = {
  "0": "#00000060",
  "0.25": "#ff000060",
  "0.5": "#ff000030",
  "1": "transparent",
  "2": "#0000ff30",
  "4": "#0000ff60",
};

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

type MoveEditRowProps = {
  pokemon: Pokemon,
  move: Move,
  onUpdate: (value: Move) => void,
  onDelete: () => void,
};

const sampleMove: Move = {
  enabled: true,
  name: "たいあたり",
  attribute: "ノーマル",
  category: "物理",
  strength: 40,
  bonus: {
    rank: 1,
    weather: 1,
    other: 1,
  },
  terastal: false,
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
          attributes: template.attributes,
          teraAttribute: template.attributes[0],
          effectiveness: computeDefaultEffectiveness(template.attributes),
          teraEffectiveness: computeDefaultEffectiveness([template.attributes[0]]),
          baseStats: template.baseStats,
          iv: { h: 31, a: 31, b: 31, c: 31, d: 31, s: 31 },
          ev: { h: 0, a: 0, b: 0, c: 0, d: 0, s: 0 },
          n: { a: 1, b: 1, c: 1, d: 1, s: 1 },
          bonus: { h: 1, a: 1, b: 1, c: 1, d: 1, s: 1 },
          optimizationStrategy: "hbd",
          bdBalance: 0.5,
          moves: [],
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
  const attackTypeLabel = attackType === "a" ? "A" : "C";

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
          <td>素早さ <small>S</small></td>
          <td>{ computedWithBonus.s }</td>
        </tr>
        <tr>
          <td>物理耐久値 <small>HB/0.44</small></td>
          <td>{ Math.floor(computedWithBonus.hb / 0.44) }</td>
        </tr>
        <tr>
          <td>特殊耐久値 <small>HD/0.44</small></td>
          <td>{ Math.floor(computedWithBonus.hd / 0.44) }</td>
        </tr>
        <tr>
          <td>総合耐久値 <small>HBD/(B+D)/0.22</small></td>
          <td>{ Math.floor(computedWithBonus.evenHBD / 0.44) }</td>
        </tr>
      </table>
      <small>※ 青三角が正三角形のとき、無駄のない耐久指数 (H=B+D∧B=D) になります</small><br />
      <small>※ "耐久値"は攻撃側に最高乱数を引かれ続けても耐えられる最大火力です</small>
    </p>
  </>;
};

export const PokemonTypeEdit = ({
  pokemon,
  onUpdate,
}: Props) => {
  const { attributes, teraAttribute, effectiveness, teraEffectiveness } = pokemon;

  const onReset = () => {
    onUpdate({
      ...pokemon,
      effectiveness: computeDefaultEffectiveness(attributes),
      teraEffectiveness: computeDefaultEffectiveness([teraAttribute]),
    });
  };

  const onChangeEffectiveness = (attr: Attribute, e: Event) => {
    const value = Number((e.target as HTMLSelectElement).value);
    if (!isNaN(value)) {
      onUpdate({
        ...pokemon,
        effectiveness: { ...effectiveness, [attr]: value },
      });
    }
  };

  const onChangeTeraEffectiveness = (attr: Attribute, e: Event) => {
    const value = Number((e.target as HTMLSelectElement).value);
    if (!isNaN(value)) {
      onUpdate({
        ...pokemon,
        teraEffectiveness: { ...teraEffectiveness, [attr]: value },
      });
    }
  };

  return <>
    <p>
      <table>
        <tr>
          <td></td>
          { ATTRIBUTE_NAMES.map((name) => <td key={ name }>{ ATTRIBUTES[name].abbrev }</td>) }
        </tr>
        <tr>
          <td>通常</td>
          { ATTRIBUTE_NAMES.map((name) => (
            <td key={ name } style={{ backgroundColor: color[effectiveness[name]] }}>
              <select
                  value={ effectiveness[name] }
                  onInput={ (e) => onChangeEffectiveness(name, e) }>
                <option value="4">4</option>
                <option value="2">2</option>
                <option value="1">1</option>
                <option value="0.5">½</option>
                <option value="0.25">¼</option>
                <option value="0">0</option>
              </select>
            </td>
          )) }
        </tr>
        <tr>
          <td>テラス</td>
          { ATTRIBUTE_NAMES.map((name) => (
            <td key={ name } style={{ backgroundColor: color[teraEffectiveness[name]] }}>
              <select
                  value={ teraEffectiveness[name] }
                  onInput={ (e) => onChangeTeraEffectiveness(name, e) }>
                <option value="4">4</option>
                <option value="2">2</option>
                <option value="1">1</option>
                <option value="0.5">½</option>
                <option value="0.25">¼</option>
                <option value="0">0</option>
              </select>
            </td>
          )) }
        </tr>
      </table>
      <small>※ 特性で無効になるタイプなどがあれば編集してください</small><br />
      <button onClick={ onReset }>タイプ本来の相性に戻す</button>
    </p>
  </>;
};

export const PokemonTypeTable = ({
  pokemon,
}: { pokemon: Pokemon }) => {
  const { attributes, teraAttribute, effectiveness, teraEffectiveness } = pokemon;

  return <>
    <p>
      <table>
        <tr>
          <td></td>
          { ATTRIBUTE_NAMES.map((name) => <td key={ name }>{ ATTRIBUTES[name].abbrev }</td>) }
        </tr>
        <tr>
          <td>通常</td>
          { ATTRIBUTE_NAMES.map((name) => (
            <td key={ name } style={{ backgroundColor: color[effectiveness[name]] }}>
              { effectiveness[name] }
            </td>
          )) }
        </tr>
        <tr>
          <td>テラス</td>
          { ATTRIBUTE_NAMES.map((name) => (
            <td key={ name } style={{ backgroundColor: color[teraEffectiveness[name]] }}>
              { teraEffectiveness[name] }
            </td>
          )) }
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
    <p>
      残りの努力値を自動で振る：
      <select value={ optimizationStrategy } onInput={ (e) => onInputStrategy(e) }>
        <option value="hbd">総合耐久 (HBD)</option>
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
        <td>その他補正</td>
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
                max="9.9"
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
  </>;
};

export const PokemonMoveEditRow = ({
  pokemon,
  move,
  onUpdate,
  onDelete,
}: MoveEditRowProps) => {
  const {
    attributes,
    teraAttribute,
    computedWithBonus: { a, c },
  } = pokemon;

  const {
    enabled,
    name,
    attribute,
    category,
    strength,
    bonus,
    terastal,
  } = move;

  const onUpdateName = (e: Event) => {
    const name = (e.target as HTMLInputElement).value;
    const template = MOVES[name];
    if (template) {
      onUpdate({
        enabled: true,
        name: name,
        attribute: template.attribute,
        category: template.category,
        strength: template.strength,
        bonus: {
          rank: 1,
          weather: 1,
          other: 1,
        },
        terastal: false,
      });
    } else {
      onUpdate({ ...move, name });
    }
  };

  const onUpdateAttr = (e: Event) => {
    const attribute = (e.target as HTMLSelectElement).value as Attribute;
    onUpdate({ ...move, attribute });
  };

  const onUpdateCategory = (e: Event) => {
    const category = (e.target as HTMLSelectElement).value as Category;
    onUpdate({ ...move, category });
  };

  const onUpdateStrength = (e: Event) => {
    const strength = Number((e.target as HTMLInputElement).value);
    if (!isNaN(strength)) {
      onUpdate({ ...move, strength });
    }
  };

  const onUpdateBonus = (field: "rank" | "weather" | "other") => (e: Event) => {
    const value = Number((e.target as HTMLInputElement).value);
    if (!isNaN(value)) {
      onUpdate({ ...move, bonus: { ...bonus, [field]: value } });
    }
  };

  const onUpdateTerastal = (e: Event) => {
    const terastal = (e.target as HTMLInputElement).checked;
    onUpdate({ ...move, terastal });
  };

  const onUpdateEnabled = (e: Event) => {
    const enabled = (e.target as HTMLInputElement).checked;
    onUpdate({ ...move, enabled });
  };

  const attrBonus = attributes.includes(attribute) ? (
    terastal && teraAttribute === attribute ? 2 : 1.5
  ) : (
    terastal && teraAttribute === attribute ? 1.5 : 1
  );

  const status = category === "物理" ? a : category === "特殊" ? c : 0;
  const rankBonus = bonus.rank >= 0 ? (
    1 + (bonus.rank / 2)
  ) : (
    1 / (1 - bonus.rank / 2)
  );
  const totalBonus = attrBonus * rankBonus * bonus.weather * bonus.other;
  const value = Math.floor(status * strength * totalBonus);

  return <>
    <datalist id="move-names">
      { MOVE_NAMES.map((name) => <option key={ name } value={ name } />) }
    </datalist>
    <tr>
      <td>
        <input type="checkbox" checked={ enabled == null || enabled } onInput={ onUpdateEnabled } />
      </td>
      <td>
        <input list="move-names" value={ name } onInput={ onUpdateName } />
      </td>
      <td>
        <select value={ attribute } onInput={ onUpdateAttr }>
          { ATTRIBUTE_NAMES.map((name) => <option value={ name }>{ name }</option>) }
        </select>
      </td>
      <td>
        <select value={ category } onInput={ onUpdateCategory }>
          <option value="物理">物理</option>
          <option value="特殊">特殊</option>
          <option value="変化">変化</option>
        </select>
      </td>
      <td>
        <input
            type="number"
            min="0"
            max="999"
            step="1"
            value={ strength }
            onInput={ onUpdateStrength } />
      </td>
      <td>
        <select value={ bonus.rank } onInput={ onUpdateBonus("rank") }>
          { [-6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6].map((n) => (
            <option value={ n }>{ n }</option>
          )) }
        </select>
      </td>
      <td>
        x <select value={ bonus.weather } onInput={ onUpdateBonus("weather") }>
        <option value="0.5">0.5</option>
        <option value="1">1</option>
        <option value="1.5">1.5</option>
        </select>
      </td>
      <td>
        x <input
              type="number"
              min="0.1"
              max="9.9"
              step="0.1"
              value={ bonus.other }
              onInput={ onUpdateBonus("other") } />
      </td>
      <td>
        <input type="checkbox" checked={ terastal } onInput={ onUpdateTerastal } />
        &nbsp;x{ attrBonus }
      </td>
      <td>
        { value }
      </td>
      <td>
        <button onClick={ onDelete }>削除</button>
      </td>
    </tr>
  </>;
};

export const PokemonMoveEdit = ({
  pokemon,
  onUpdate,
}: Props) => {
  const onUpdateMove = (ix: number) => (value: Move) => {
    onUpdate({
      ...pokemon,
      moves: (pokemon.moves ?? []).map((move, i) => i === ix ? value : move),
    });
  };

  const onAddMove = () => {
    onUpdate({
      ...pokemon,
      moves: [ ...(pokemon.moves ?? []), sampleMove ],
    });
  };

  const onDeleteMove = (ix: number) => () => {
    onUpdate({
      ...pokemon,
      moves: (pokemon.moves ?? []).filter((_, i) => i !== ix),
    });
  };

  return <>
    <table>
      <tr>
        <td></td>
        <td>技名</td>
        <td>タイプ</td>
        <td>分類</td>
        <td>威力</td>
        <td>ランク</td>
        <td>天候</td>
        <td>その他補正</td>
        <td>テラス</td>
        <td>参考火力</td>
        <td></td>
      </tr>
      { (pokemon.moves ?? []).map((move, ix) => (
        <PokemonMoveEditRow
            pokemon={ pokemon }
            move={ move }
            onUpdate={ onUpdateMove(ix) }
            onDelete={ onDeleteMove(ix) } />
      )) }
      <tr>
        <td colSpan={ 12 }>
          <button onClick={ onAddMove }>+ 追加</button>
        </td>
      </tr>
    </table>
    <small>※ 登録すると右画面の「火力調整/ダメ計ツール」でダメージ量を確認できます</small><br />
    <small>※ ヘビーボンバーなど特殊な技の威力は今のところ手動です</small>
  </>;
};

export const PokemonEdit = ({
  pokemon,
  onUpdate,
}: Props) => {
  /* 受け側の耐久調整機能を実装するタイミングで PokemonTypeEdit に入れ替える */
  return (
    <div>
      <section>
        <h2>基本スペック</h2>
        <PokemonNameEdit pokemon={ pokemon } onUpdate={ onUpdate } />
        <PokemonTypeTable pokemon={ pokemon } />
      </section>
      <section>
        <h2>努力値調整</h2>
        <PokemonStatsEdit pokemon={ pokemon } onUpdate={ onUpdate } />
      </section>
      <section>
        <h2>攻撃技</h2>
        <PokemonMoveEdit pokemon={ pokemon } onUpdate={ onUpdate } />
      </section>
    </div>
  );
}
