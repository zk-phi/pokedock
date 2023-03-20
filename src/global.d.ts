type NValue = 1 | 1.1 | 0.9;
type OptimizationStrategy = "h" | "a" | "c" | "s" | "hbd" | "";
type ValueFieldIndex = "h" | "a" | "b" | "c" | "d" | "s";

type Attribute =
  "ノーマル" |
  "ほのお" |
  "みず" |
  "でんき" |
  "くさ" |
  "こおり" |
  "かくとう" |
  "どく" |
  "じめん" |
  "ひこう" |
  "エスパー" |
  "むし" |
  "いわ" |
  "ゴースト" |
  "ドラゴン" |
  "あく" |
  "はがね" |
  "フェアリー";

type Effectiveness = {
  "ノーマル": number,
  "ほのお": number,
  "みず": number,
  "でんき": number,
  "くさ": number,
  "こおり": number,
  "かくとう": number,
  "どく": number,
  "じめん": number,
  "ひこう": number,
  "エスパー": number,
  "むし": number,
  "いわ": number,
  "ゴースト": number,
  "ドラゴン": number,
  "あく": number,
  "はがね": number,
  "フェアリー": number,
};

type Category = "物理" | "特殊" | "変化";

type Values = {
  h: number,
  a: number,
  b: number,
  c: number,
  d: number,
  s: number,
};

type NValues = {
  a: NValue,
  b: NValue,
  c: NValue,
  d: NValue,
  s: NValue,
};

type Move = {
  enabled?: boolean,
  name: string,
  attribute: Attribute,
  category: Category,
  strength: number,
  bonus: {
    rank: number,
    weather: number,
    other: number,
  },
  terastal: boolean,
  // effectiveness?: Effectiveness,
};

type PokemonSettings = {
  name: string,
  tag: string,
  attributes: Attribute[],
  teraAttribute: Attribute,
  effectiveness: Effectiveness,
  teraEffectiveness: Effectiveness,
  baseStats: Values,
  iv: Values,
  ev: Values,
  n: NValues,
  bonus: Values,
  optimizationStrategy: OptimizationStrategy,
  bdBalance: number,
  moves: Move[],
};

type OptimizedPokemonSettings = PokemonSettings & {
  optimized: {
    ev: Values,
    n: NValues,
  },
};

type Pokemon = OptimizedPokemonSettings & {
  computed: Values,
  computedWithBonus: Values & {
    hb: number,
    hd: number,
    hbd: number,
    evenHBD: number,
  },
};

type SavedPokemon = {
  pokemon: Pokemon,
  timestamp: number,
};
