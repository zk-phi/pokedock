import { useState } from 'preact/hooks'
import { PokemonEdit } from "./components/PokemonEdit";
import { SpeedList } from "./components/SpeedList";
import { RobustnessList } from "./components/RobustnessList";
import { PickupEdit } from "./components/PickupEdit";
import {
  storageEntries,
  loadFromStorage,
  saveToStorage,
  deleteStorageItem,
} from "./store/localstorage";
import { optimizePokemon } from "./utils/optimizer";
import { computeDefaultEffectiveness } from "./utils/effectiveness";
import './app.css'

loadFromStorage();

const placeholder: Pokemon = optimizePokemon({
  name: "ミミッキュ",
  tag: "珠陽気AS",
  attributes: ["ゴースト", "フェアリー"],
  teraAttribute: "ゴースト",
  effectiveness: computeDefaultEffectiveness(["ゴースト", "フェアリー"]),
  teraEffectiveness: computeDefaultEffectiveness(["ゴースト"]),
  baseStats: { h: 55, a: 90, b: 80, c: 50, d: 105, s: 96 },
  iv: { h: 31, a: 31, b: 31, c: 31, d: 31, s: 31 },
  ev: { h: 4, a: 252, b: 0, c: 0, d: 0, s: 252 },
  n: { a: 1, b: 1, c: 0.9, d: 1, s: 1.1 },
  bonus: { h: 1, a: 1.3, b: 1, c: 1.3, d: 1, s: 1 },
  optimizationStrategy: "hbd",
  bdBalance: 0.5,
  moves: [{
    name: "じゃれつく",
    attribute: "フェアリー",
    category: "物理",
    strength: 90,
    bonus: { rank: 0, weather: 1, other: 1 },
    terastal: false,
  }, {
    name: "ドレインパンチ",
    attribute: "かくとう",
    category: "物理",
    strength: 75,
    bonus: { rank: 0, weather: 1, other: 1 },
    terastal: false,
  }, {
    name: "かげうち",
    attribute: "ゴースト",
    category: "物理",
    strength: 40,
    bonus: { rank: 0, weather: 1, other: 1 },
    terastal: false,
  }, {
    name: "シャドークロー",
    attribute: "ゴースト",
    category: "物理",
    strength: 70,
    bonus: { rank: 0, weather: 1, other: 1 },
    terastal: false,
  }, {
    name: "つるぎのまい",
    attribute: "ノーマル",
    category: "変化",
    strength: 0,
    bonus: { rank: 0, weather: 1, other: 1 },
    terastal: false,
  }],
});

const PokemonList = ({ onSelectPokemon }: {
  onSelectPokemon: (pokemon: Pokemon) => void,
}) => {
  const entries = storageEntries.value;
  const timestamps = entries.map((entry) => (new Date(entry.timestamp)).toLocaleString());
  return <>
    <ul>
      { entries.map((entry, i) => (
        <li>
          <button onClick={ () => onSelectPokemon(entries[i].pokemon) }>
            { entry.pokemon.name } { entry.pokemon.tag } (ver. { timestamps[i] })
          </button>
          <button onClick={ () => deleteStorageItem(i) }>
            削除
          </button>
        </li>
      )) }
    </ul>
    <button onClick={ () => onSelectPokemon(placeholder) }>新規育成</button>
  </>;
};

const PokemonDetails = ({ pokemon, onUpdate, onSave, onExit }: {
  pokemon: Pokemon,
  onUpdate: (pokemon: Pokemon) => void,
  onSave: (pokemon: Pokemon) => void,
  onExit: () => void,
}) => {
  const onSaveAndExit = () => {
    onSave(pokemon);
    onExit();
  };
  return <>
    <PokemonEdit pokemon={ pokemon } onUpdate={ onUpdate } />
    <button onClick={ onSaveAndExit }>保存して一覧へ</button>
    { storageEntries.value.length > 0 && <button onClick={ onExit }>保存せず一覧へ</button> }
  </>;
};

export function App() {
  const [pokemon, setPokemon] = useState<Pokemon | null>(
    storageEntries.value.length > 0 ? null : placeholder
  );
  const [rightColumn, setRightColumn] = useState("speed");
  return (
    <div style={{ display: "flex" }}>
      <div className="column" style={{ flexGrow: 1, borderRight: "1px solid" }}>
        { pokemon ? (
          <PokemonDetails
              pokemon={ pokemon }
              onUpdate={ setPokemon }
              onSave={ saveToStorage }
              onExit={ () => setPokemon(null) } />
        ) : (
          <PokemonList onSelectPokemon={ setPokemon } />
        ) }
      </div>
      <div className="column" style={{ flexGrow: 0, width: "760px" }}>
        <p>
          <button onClick={ () => setRightColumn("speed") }>素早さランキング</button>
          <button onClick={ () => setRightColumn("robustness") }>耐久ランキング</button>
          <button onClick={ () => setRightColumn("pickup") }>ピックアップ管理</button>
        </p>
        { rightColumn === "speed" && <SpeedList pokemon={ pokemon } /> }
        { rightColumn === "robustness" && <RobustnessList pokemon={ pokemon } /> }
        { rightColumn === "pickup" && <PickupEdit /> }
      </div>
    </div>
  );
}
