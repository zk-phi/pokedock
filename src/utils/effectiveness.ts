import { EFFECTIVENESS } from "../constants/effectiveness";

export const computeDefaultEffectiveness = (attributes: Attribute[]): Effectiveness => (
  attributes.map((attr) => EFFECTIVENESS[attr]).reduce((l, r) => ({
    "ノーマル": l["ノーマル"] * r["ノーマル"],
    "ほのお": l["ほのお"] * r["ほのお"],
    "みず": l["みず"] * r["みず"],
    "でんき": l["でんき"] * r["でんき"],
    "くさ": l["くさ"] * r["くさ"],
    "こおり": l["こおり"] * r["こおり"],
    "かくとう": l["かくとう"] * r["かくとう"],
    "どく": l["どく"] * r["どく"],
    "じめん": l["じめん"] * r["じめん"],
    "ひこう": l["ひこう"] * r["ひこう"],
    "エスパー": l["エスパー"] * r["エスパー"],
    "むし": l["むし"] * r["むし"],
    "いわ": l["いわ"] * r["いわ"],
    "ゴースト": l["ゴースト"] * r["ゴースト"],
    "ドラゴン": l["ドラゴン"] * r["ドラゴン"],
    "あく": l["あく"] * r["あく"],
    "はがね": l["はがね"] * r["はがね"],
    "フェアリー": l["フェアリー"] * r["フェアリー"],
  }))
);
