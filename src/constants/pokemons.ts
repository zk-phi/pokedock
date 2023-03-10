type PokemonTemplate = {
  attributes: Attribute[],
  baseStats: Values,
};
export const POKEMONS: Record<string, PokemonTemplate> = {
  "マスカーニャ": {attributes:["くさ","あく"],baseStats:{h:76,a:110,b:70,c:81,d:70,s:123}},
  "ラウドボーン": {attributes:["ほのお","ゴースト"],baseStats:{h:104,a:75,b:100,c:110,d:75,s:66}},
  "ウェーニバル": {attributes:["みず","かくとう"],baseStats:{h:85,a:120,b:80,c:85,d:75,s:85}},
  "パフュートン♂": {attributes:["ノーマル"],baseStats:{h:110,a:100,b:75,c:59,d:80,s:65}},
  "パフュートン♀": {attributes:["ノーマル"],baseStats:{h:115,a:90,b:70,c:59,d:90,s:65}},
  "ワナイダー": {attributes:["むし"],baseStats:{h:60,a:79,b:92,c:52,d:86,s:35}},
  "エクスレッグ": {attributes:["むし","あく"],baseStats:{h:71,a:102,b:78,c:52,d:55,s:92}},
  "ワタッコ": {attributes:["くさ","ひこう"],baseStats:{h:75,a:55,b:70,c:55,d:95,s:110}},
  "ファイアロー": {attributes:["ほのお","ひこう"],baseStats:{h:78,a:81,b:71,c:74,d:69,s:126}},
  "パーモット": {attributes:["でんき","かくとう"],baseStats:{h:70,a:115,b:70,c:70,d:60,s:105}},
  "ヘルガー": {attributes:["あく","ほのお"],baseStats:{h:75,a:90,b:50,c:110,d:80,s:95}},
  "デカグース": {attributes:["ノーマル"],baseStats:{h:88,a:110,b:60,c:55,d:60,s:45}},
  "ヨクバリス": {attributes:["ノーマル"],baseStats:{h:120,a:95,b:95,c:55,d:75,s:20}},
  "キマワリ": {attributes:["くさ"],baseStats:{h:75,a:75,b:55,c:105,d:85,s:30}},
  "コロトック": {attributes:["むし"],baseStats:{h:77,a:85,b:51,c:55,d:51,s:65}},
  "ビビヨン": {attributes:["むし","ひこう"],baseStats:{h:80,a:52,b:50,c:90,d:50,s:89}},
  "ビークイン": {attributes:["むし","ひこう"],baseStats:{h:70,a:80,b:102,c:80,d:102,s:40}},
  "アーマーガア": {attributes:["ひこう","はがね"],baseStats:{h:98,a:87,b:105,c:53,d:85,s:67}},
  "ハピナス": {attributes:["ノーマル"],baseStats:{h:255,a:10,b:10,c:75,d:135,s:55}},
  "マリルリ": {attributes:["みず","フェアリー"],baseStats:{h:100,a:50,b:80,c:60,d:80,s:50}},
  "アメモース": {attributes:["むし","ひこう"],baseStats:{h:70,a:60,b:62,c:100,d:82,s:80}},
  "フローゼル": {attributes:["みず"],baseStats:{h:85,a:105,b:55,c:85,d:50,s:115}},
  "ドオー": {attributes:["どく","じめん"],baseStats:{h:130,a:75,b:60,c:45,d:100,s:20}},
  "ゴルダック": {attributes:["みず"],baseStats:{h:80,a:82,b:78,c:95,d:80,s:85}},
  "カジリガメ": {attributes:["みず","いわ"],baseStats:{h:90,a:115,b:90,c:48,d:68,s:74}},
  "プクリン": {attributes:["ノーマル","フェアリー"],baseStats:{h:140,a:70,b:45,c:85,d:50,s:45}},
  "サーナイト": {attributes:["エスパー","フェアリー"],baseStats:{h:68,a:65,b:65,c:125,d:115,s:80}},
  "エルレイド": {attributes:["エスパー","かくとう"],baseStats:{h:68,a:125,b:65,c:65,d:115,s:80}},
  "スリーパー": {attributes:["エスパー"],baseStats:{h:85,a:73,b:70,c:73,d:115,s:67}},
  "ゲンガー": {attributes:["ゴースト","どく"],baseStats:{h:60,a:65,b:60,c:130,d:75,s:110}},
  "イッカネズミ": {attributes:["ノーマル"],baseStats:{h:74,a:75,b:70,c:65,d:75,s:111}},
  "ライチュウ": {attributes:["でんき"],baseStats:{h:60,a:90,b:55,c:90,d:80,s:110}},
  "バウッツェル": {attributes:["フェアリー"],baseStats:{h:57,a:80,b:115,c:50,d:80,s:95}},
  "ケッキング": {attributes:["ノーマル"],baseStats:{h:150,a:160,b:100,c:95,d:65,s:100}},
  "アマージョ": {attributes:["くさ"],baseStats:{h:72,a:120,b:98,c:50,d:98,s:72}},
  "オリーヴァ": {attributes:["くさ","ノーマル"],baseStats:{h:78,a:69,b:90,c:125,d:109,s:39}},
  "ウソッキー": {attributes:["いわ"],baseStats:{h:70,a:100,b:115,c:30,d:65,s:30}},
  "ルガルガン(まひる)": {attributes:["いわ"],baseStats:{h:75,a:115,b:65,c:55,d:65,s:112}},
  "ルガルガン(まよなか)": {attributes:["いわ"],baseStats:{h:85,a:115,b:75,c:55,d:75,s:82}},
  "ルガルガン(たそがれ)": {attributes:["いわ"],baseStats:{h:75,a:117,b:65,c:55,d:65,s:110}},
  "セキタンザン": {attributes:["いわ","ほのお"],baseStats:{h:110,a:80,b:120,c:80,d:90,s:30}},
  "レントラー": {attributes:["でんき"],baseStats:{h:80,a:120,b:79,c:95,d:79,s:70}},
  "ムクホーク": {attributes:["ノーマル","ひこう"],baseStats:{h:85,a:120,b:70,c:50,d:60,s:100}},
  "オドリドリ(めらめら)": {attributes:["ほのお","ひこう"],baseStats:{h:75,a:70,b:70,c:98,d:70,s:93}},
  "オドリドリ(ぱちぱち)": {attributes:["でんき","ひこう"],baseStats:{h:75,a:70,b:70,c:98,d:70,s:93}},
  "オドリドリ(ふらふら)": {attributes:["エスパー","ひこう"],baseStats:{h:75,a:70,b:70,c:98,d:70,s:93}},
  "オドリドリ(まいまい)": {attributes:["ゴースト","ひこう"],baseStats:{h:75,a:70,b:70,c:98,d:70,s:93}},
  "デンリュウ": {attributes:["でんき"],baseStats:{h:90,a:75,b:85,c:115,d:90,s:55}},
  "ドレディア": {attributes:["くさ"],baseStats:{h:70,a:60,b:75,c:110,d:75,s:90}},
  "キノガッサ": {attributes:["くさ","かくとう"],baseStats:{h:60,a:130,b:80,c:60,d:60,s:70}},
  "アップリュー": {attributes:["くさ","ドラゴン"],baseStats:{h:70,a:110,b:80,c:95,d:60,s:70}},
  "タルップル": {attributes:["くさ","ドラゴン"],baseStats:{h:110,a:85,b:80,c:100,d:80,s:30}},
  "ブーピッグ": {attributes:["エスパー"],baseStats:{h:80,a:45,b:65,c:90,d:110,s:80}},
  "イキリンコ": {attributes:["ノーマル","ひこう"],baseStats:{h:82,a:96,b:51,c:45,d:51,s:92}},
  "ムウマージ": {attributes:["ゴースト"],baseStats:{h:60,a:60,b:60,c:105,d:105,s:105}},
  "ハリテヤマ": {attributes:["かくとう"],baseStats:{h:144,a:120,b:60,c:40,d:60,s:50}},
  "ケケンカニ": {attributes:["かくとう","こおり"],baseStats:{h:97,a:132,b:77,c:62,d:67,s:43}},
  "エンニュート": {attributes:["どく","ほのお"],baseStats:{h:68,a:64,b:60,c:111,d:60,s:117}},
  "ドンファン": {attributes:["じめん"],baseStats:{h:90,a:120,b:120,c:60,d:60,s:50}},
  "ダイオウドウ": {attributes:["はがね"],baseStats:{h:122,a:130,b:69,c:80,d:69,s:30}},
  "ガブリアス": {attributes:["ドラゴン","じめん"],baseStats:{h:108,a:130,b:95,c:80,d:85,s:102}},
  "キョジオーン": {attributes:["いわ"],baseStats:{h:100,a:100,b:130,c:45,d:90,s:35}},
  "ペリッパー": {attributes:["みず","ひこう"],baseStats:{h:60,a:50,b:100,c:95,d:70,s:65}},
  "ギャラドス": {attributes:["みず","ひこう"],baseStats:{h:95,a:125,b:79,c:60,d:100,s:81}},
  "カマスジョー": {attributes:["みず"],baseStats:{h:61,a:123,b:60,c:60,d:50,s:136}},
  "バスラオ": {attributes:["みず"],baseStats:{h:70,a:92,b:65,c:80,d:55,s:98}},
  "マルノーム": {attributes:["どく"],baseStats:{h:100,a:73,b:83,c:73,d:83,s:55}},
  "ペルシアン": {attributes:["ノーマル"],baseStats:{h:65,a:70,b:60,c:65,d:65,s:115}},
  "フワライド": {attributes:["ゴースト","ひこう"],baseStats:{h:150,a:80,b:44,c:90,d:54,s:80}},
  "フラージェス": {attributes:["フェアリー"],baseStats:{h:78,a:65,b:68,c:112,d:154,s:75}},
  "ダグトリオ": {attributes:["じめん"],baseStats:{h:35,a:100,b:50,c:50,d:70,s:120}},
  "コータス": {attributes:["ほのお"],baseStats:{h:70,a:85,b:140,c:85,d:70,s:20}},
  "バクーダ": {attributes:["ほのお","じめん"],baseStats:{h:70,a:100,b:70,c:105,d:75,s:40}},
  "ドータクン": {attributes:["はがね","エスパー"],baseStats:{h:67,a:89,b:116,c:79,d:116,s:33}},
  "オノノクス": {attributes:["ドラゴン"],baseStats:{h:76,a:147,b:90,c:60,d:70,s:97}},
  "コノヨザル": {attributes:["かくとう","ゴースト"],baseStats:{h:110,a:115,b:80,c:50,d:90,s:90}},
  "チャーレム": {attributes:["かくとう","エスパー"],baseStats:{h:60,a:60,b:75,c:60,d:75,s:80}},
  "ルカリオ": {attributes:["かくとう","はがね"],baseStats:{h:70,a:110,b:70,c:115,d:70,s:90}},
  "グレンアルマ": {attributes:["ほのお","エスパー"],baseStats:{h:85,a:60,b:100,c:125,d:80,s:75}},
  "ソウブレイズ": {attributes:["ほのお","ゴースト"],baseStats:{h:75,a:125,b:80,c:60,d:100,s:85}},
  "ナマズン": {attributes:["みず","じめん"],baseStats:{h:110,a:78,b:73,c:76,d:71,s:60}},
  "ハラバリー": {attributes:["でんき"],baseStats:{h:109,a:64,b:91,c:103,d:83,s:45}},
  "ヌメルゴン": {attributes:["ドラゴン"],baseStats:{h:90,a:100,b:70,c:110,d:150,s:80}},
  "ドクロッグ": {attributes:["どく","かくとう"],baseStats:{h:83,a:106,b:65,c:86,d:65,s:85}},
  "タイカイデン": {attributes:["でんき","ひこう"],baseStats:{h:70,a:70,b:60,c:105,d:60,s:125}},
  "シャワーズ": {attributes:["みず"],baseStats:{h:130,a:65,b:60,c:110,d:95,s:65}},
  "サンダース": {attributes:["でんき"],baseStats:{h:65,a:65,b:60,c:110,d:95,s:130}},
  "ブースター": {attributes:["ほのお"],baseStats:{h:65,a:130,b:60,c:95,d:110,s:65}},
  "エーフィ": {attributes:["エスパー"],baseStats:{h:65,a:65,b:60,c:130,d:95,s:110}},
  "ブラッキー": {attributes:["あく"],baseStats:{h:95,a:65,b:110,c:60,d:130,s:65}},
  "リーフィア": {attributes:["くさ"],baseStats:{h:65,a:110,b:130,c:60,d:65,s:95}},
  "グレイシア": {attributes:["こおり"],baseStats:{h:65,a:60,b:110,c:130,d:95,s:65}},
  "ニンフィア": {attributes:["フェアリー"],baseStats:{h:95,a:65,b:65,c:110,d:130,s:60}},
  "ノココッチ": {attributes:["ノーマル"],baseStats:{h:125,a:100,b:80,c:85,d:75,s:55}},
  "メブキジカ": {attributes:["ノーマル","くさ"],baseStats:{h:80,a:100,b:70,c:60,d:70,s:95}},
  "リキキリン": {attributes:["ノーマル","エスパー"],baseStats:{h:120,a:90,b:70,c:110,d:70,s:60}},
  "ベトベトン": {attributes:["どく"],baseStats:{h:105,a:105,b:75,c:65,d:100,s:50}},
  "マフィティフ": {attributes:["あく"],baseStats:{h:80,a:120,b:90,c:60,d:70,s:85}},
  "ストリンダー": {attributes:["でんき","どく"],baseStats:{h:75,a:98,b:70,c:114,d:70,s:75}},
  "デデンネ": {attributes:["でんき","フェアリー"],baseStats:{h:67,a:58,b:57,c:81,d:67,s:101}},
  "パチリス": {attributes:["でんき"],baseStats:{h:60,a:45,b:70,c:45,d:90,s:95}},
  "タギングル": {attributes:["どく","ノーマル"],baseStats:{h:63,a:95,b:65,c:80,d:72,s:110}},
  "モロバレル": {attributes:["くさ","どく"],baseStats:{h:114,a:85,b:70,c:85,d:80,s:30}},
  "マルマイン": {attributes:["でんき"],baseStats:{h:60,a:50,b:70,c:80,d:80,s:150}},
  "ジバコイル": {attributes:["でんき","はがね"],baseStats:{h:70,a:70,b:115,c:130,d:90,s:60}},
  "メタモン": {attributes:["ノーマル"],baseStats:{h:48,a:48,b:48,c:48,d:48,s:48}},
  "ウインディ": {attributes:["ほのお"],baseStats:{h:90,a:110,b:80,c:100,d:80,s:95}},
  "ザングース": {attributes:["ノーマル"],baseStats:{h:73,a:115,b:60,c:60,d:60,s:90}},
  "ハブネーク": {attributes:["どく"],baseStats:{h:73,a:100,b:60,c:100,d:60,s:65}},
  "チルタリス": {attributes:["ドラゴン","ひこう"],baseStats:{h:75,a:70,b:90,c:70,d:105,s:80}},
  "ゴーゴート": {attributes:["くさ"],baseStats:{h:123,a:100,b:62,c:97,d:81,s:68}},
  "ケンタロス(格闘)": {attributes:["かくとう"],baseStats:{h:75,a:110,b:105,c:30,d:70,s:100}},
  "ケンタロス(炎)": {attributes:["かくとう","ほのお"],baseStats:{h:75,a:110,b:105,c:30,d:70,s:100}},
  "ケンタロス(水)": {attributes:["かくとう","みず"],baseStats:{h:75,a:110,b:105,c:30,d:70,s:100}},
  "カエンジシ": {attributes:["ほのお","ノーマル"],baseStats:{h:86,a:68,b:72,c:109,d:66,s:106}},
  "スカタンク": {attributes:["どく","あく"],baseStats:{h:103,a:93,b:67,c:71,d:61,s:84}},
  "ゾロアーク": {attributes:["あく"],baseStats:{h:60,a:105,b:60,c:120,d:60,s:105}},
  "マニューラ": {attributes:["あく","こおり"],baseStats:{h:70,a:120,b:65,c:45,d:85,s:125}},
  "ドンカラス": {attributes:["あく","ひこう"],baseStats:{h:100,a:125,b:52,c:105,d:52,s:71}},
  "ゴチルゼル": {attributes:["エスパー"],baseStats:{h:70,a:55,b:95,c:95,d:110,s:65}},
  "ポットデス": {attributes:["ゴースト"],baseStats:{h:60,a:65,b:65,c:134,d:114,s:70}},
  "ミミッキュ": {attributes:["ゴースト","フェアリー"],baseStats:{h:55,a:90,b:80,c:50,d:105,s:96}},
  "クレッフィ": {attributes:["はがね","フェアリー"],baseStats:{h:57,a:80,b:91,c:80,d:87,s:75}},
  "イエッサン♂": {attributes:["エスパー","ノーマル"],baseStats:{h:60,a:65,b:55,c:105,d:95,s:95}},
  "イエッサン♀": {attributes:["エスパー","ノーマル"],baseStats:{h:70,a:55,b:65,c:95,d:105,s:85}},
  "アノホラグサ": {attributes:["くさ","ゴースト"],baseStats:{h:55,a:115,b:70,c:80,d:70,s:90}},
  "リククラゲ": {attributes:["じめん","くさ"],baseStats:{h:80,a:70,b:65,c:80,d:120,s:100}},
  "トロピウス": {attributes:["くさ","ひこう"],baseStats:{h:99,a:68,b:83,c:72,d:87,s:51}},
  "ラランテス": {attributes:["くさ"],baseStats:{h:70,a:105,b:90,c:80,d:90,s:45}},
  "ガケガニ": {attributes:["いわ"],baseStats:{h:70,a:100,b:115,c:35,d:55,s:75}},
  "スコヴィラン": {attributes:["くさ","ほのお"],baseStats:{h:65,a:108,b:65,c:108,d:65,s:75}},
  "ノクタス": {attributes:["くさ","あく"],baseStats:{h:70,a:115,b:60,c:115,d:60,s:55}},
  "ベラカス": {attributes:["むし","エスパー"],baseStats:{h:75,a:50,b:85,c:115,d:100,s:45}},
  "モルフォン": {attributes:["むし","どく"],baseStats:{h:70,a:65,b:60,c:90,d:75,s:90}},
  "フォレトス": {attributes:["むし","はがね"],baseStats:{h:75,a:90,b:140,c:60,d:60,s:40}},
  "ハッサム": {attributes:["むし","はがね"],baseStats:{h:70,a:130,b:100,c:55,d:80,s:65}},
  "ヘラクロス": {attributes:["むし","かくとう"],baseStats:{h:80,a:125,b:75,c:40,d:95,s:85}},
  "クエスパトラ": {attributes:["エスパー"],baseStats:{h:95,a:60,b:60,c:101,d:60,s:105}},
  "カバルドン": {attributes:["じめん"],baseStats:{h:108,a:112,b:118,c:68,d:72,s:47}},
  "ワルビアル": {attributes:["じめん","あく"],baseStats:{h:95,a:117,b:80,c:65,d:70,s:92}},
  "サダイジャ": {attributes:["じめん"],baseStats:{h:72,a:107,b:125,c:65,d:70,s:71}},
  "バンバドロ": {attributes:["じめん"],baseStats:{h:100,a:125,b:100,c:55,d:85,s:35}},
  "ウルガモス": {attributes:["むし","ほのお"],baseStats:{h:85,a:60,b:65,c:135,d:105,s:100}},
  "ボーマンダ": {attributes:["ドラゴン","ひこう"],baseStats:{h:95,a:135,b:80,c:110,d:80,s:100}},
  "デカヌチャン": {attributes:["フェアリー","はがね"],baseStats:{h:85,a:75,b:77,c:70,d:105,s:94}},
  "ブリムオン": {attributes:["エスパー","フェアリー"],baseStats:{h:57,a:90,b:95,c:136,d:103,s:29}},
  "オーロンゲ": {attributes:["あく","フェアリー"],baseStats:{h:95,a:120,b:65,c:95,d:75,s:60}},
  "ウミトリオ": {attributes:["みず"],baseStats:{h:35,a:100,b:50,c:50,d:70,s:120}},
  "オトシドリ": {attributes:["ひこう","あく"],baseStats:{h:70,a:103,b:85,c:60,d:85,s:82}},
  "イルカマン(ナイーブ)": {attributes:["みず"],baseStats:{h:100,a:70,b:72,c:53,d:62,s:100}},
  "イルカマン(マイティ)": {attributes:["みず"],baseStats:{h:100,a:160,b:97,c:106,d:87,s:100}},
  "ブロロローム": {attributes:["はがね","どく"],baseStats:{h:80,a:119,b:90,c:54,d:67,s:90}},
  "モトトカゲ": {attributes:["ドラゴン","ノーマル"],baseStats:{h:70,a:95,b:65,c:85,d:65,s:121}},
  "ミミズズ": {attributes:["はがね"],baseStats:{h:70,a:85,b:145,c:60,d:55,s:65}},
  "ヤミラミ": {attributes:["あく","ゴースト"],baseStats:{h:50,a:75,b:75,c:65,d:65,s:50}},
  "ジュペッタ": {attributes:["ゴースト"],baseStats:{h:64,a:115,b:65,c:83,d:63,s:65}},
  "タイレーツ": {attributes:["かくとう"],baseStats:{h:65,a:100,b:100,c:70,d:60,s:75}},
  "ルチャブル": {attributes:["かくとう","ひこう"],baseStats:{h:78,a:92,b:75,c:74,d:63,s:118}},
  "ミカルゲ": {attributes:["ゴースト","あく"],baseStats:{h:50,a:92,b:108,c:92,d:108,s:35}},
  "オンバーン": {attributes:["ひこう","ドラゴン"],baseStats:{h:85,a:70,b:80,c:97,d:80,s:123}},
  "ドラパルト": {attributes:["ドラゴン","ゴースト"],baseStats:{h:88,a:120,b:75,c:100,d:75,s:142}},
  "キラフロル": {attributes:["いわ","どく"],baseStats:{h:83,a:55,b:90,c:130,d:81,s:86}},
  "ロトム": {attributes:["でんき","ゴースト"],baseStats:{h:50,a:50,b:77,c:95,d:77,s:91}},
  "ヒートロトム": {attributes:["でんき","ほのお"],baseStats:{h:50,a:65,b:107,c:105,d:107,s:86}},
  "ウォッシュロトム": {attributes:["でんき","みず"],baseStats:{h:50,a:65,b:107,c:105,d:107,s:86}},
  "フロストロトム": {attributes:["でんき","こおり"],baseStats:{h:50,a:65,b:107,c:105,d:107,s:86}},
  "スピンロトム": {attributes:["でんき","ひこう"],baseStats:{h:50,a:65,b:107,c:105,d:107,s:86}},
  "カットロトム": {attributes:["でんき","くさ"],baseStats:{h:50,a:65,b:107,c:105,d:107,s:86}},
  "ハカドッグ": {attributes:["ゴースト"],baseStats:{h:72,a:101,b:100,c:50,d:97,s:68}},
  "ヤレユータン": {attributes:["ノーマル","エスパー"],baseStats:{h:90,a:60,b:80,c:90,d:110,s:60}},
  "ナゲツケサル": {attributes:["かくとう"],baseStats:{h:100,a:120,b:90,c:40,d:60,s:80}},
  "ネッコアラ": {attributes:["ノーマル"],baseStats:{h:65,a:115,b:65,c:75,d:95,s:65}},
  "バンギラス": {attributes:["いわ","あく"],baseStats:{h:100,a:134,b:110,c:95,d:100,s:61}},
  "イシヘンジン": {attributes:["いわ"],baseStats:{h:100,a:125,b:135,c:20,d:20,s:70}},
  "コオリッポ(アイス)": {attributes:["こおり"],baseStats:{h:75,a:80,b:110,c:65,d:90,s:50}},
  "コオリッポ(ナイス)": {attributes:["こおり"],baseStats:{h:75,a:80,b:70,c:65,d:50,s:130}},
  "バチンウニ": {attributes:["でんき"],baseStats:{h:48,a:101,b:95,c:91,d:85,s:15}},
  "シロデスナ": {attributes:["ゴースト","じめん"],baseStats:{h:85,a:75,b:110,c:100,d:75,s:35}},
  "ヤドラン": {attributes:["みず","エスパー"],baseStats:{h:95,a:75,b:110,c:100,d:80,s:30}},
  "ヤドキング": {attributes:["みず","エスパー"],baseStats:{h:95,a:75,b:80,c:100,d:110,s:30}},
  "トリトドン": {attributes:["みず","じめん"],baseStats:{h:111,a:83,b:68,c:92,d:82,s:39}},
  "パルシェン": {attributes:["みず","こおり"],baseStats:{h:50,a:95,b:180,c:85,d:45,s:70}},
  "ハリーセン": {attributes:["みず","どく"],baseStats:{h:65,a:95,b:85,c:55,d:55,s:85}},
  "ラブカス": {attributes:["みず"],baseStats:{h:43,a:30,b:55,c:40,d:65,s:97}},
  "ネオラント": {attributes:["みず"],baseStats:{h:69,a:69,b:76,c:69,d:86,s:91}},
  "ハギギシリ": {attributes:["みず","エスパー"],baseStats:{h:68,a:105,b:70,c:70,d:70,s:92}},
  "ママンボウ": {attributes:["みず"],baseStats:{h:165,a:75,b:80,c:40,d:45,s:65}},
  "ドラミドロ": {attributes:["どく","ドラゴン"],baseStats:{h:65,a:75,b:90,c:97,d:123,s:44}},
  "ブロスター": {attributes:["みず"],baseStats:{h:71,a:73,b:88,c:120,d:89,s:59}},
  "シビルドン": {attributes:["でんき"],baseStats:{h:85,a:115,b:80,c:105,d:80,s:50}},
  "ドヒドイデ": {attributes:["どく","みず"],baseStats:{h:50,a:63,b:152,c:53,d:142,s:35}},
  "カラミンゴ": {attributes:["ひこう","かくとう"],baseStats:{h:82,a:115,b:74,c:75,d:64,s:90}},
  "カイリュー": {attributes:["ドラゴン","ひこう"],baseStats:{h:91,a:134,b:95,c:100,d:100,s:80}},
  "モスノウ": {attributes:["こおり","むし"],baseStats:{h:70,a:65,b:60,c:125,d:90,s:65}},
  "ユキノオー": {attributes:["くさ","こおり"],baseStats:{h:90,a:92,b:75,c:92,d:85,s:60}},
  "デリバード": {attributes:["こおり","ひこう"],baseStats:{h:45,a:55,b:45,c:65,d:45,s:75}},
  "ツンベアー": {attributes:["こおり"],baseStats:{h:95,a:130,b:80,c:70,d:80,s:50}},
  "オニゴーリ": {attributes:["こおり"],baseStats:{h:80,a:80,b:80,c:80,d:80,s:80}},
  "ユキメノコ": {attributes:["こおり","ゴースト"],baseStats:{h:70,a:80,b:70,c:80,d:70,s:110}},
  "フリージオ": {attributes:["こおり"],baseStats:{h:80,a:50,b:50,c:95,d:135,s:105}},
  "ハルクジラ": {attributes:["こおり"],baseStats:{h:170,a:113,b:65,c:45,d:55,s:73}},
  "クレベース": {attributes:["こおり"],baseStats:{h:95,a:117,b:184,c:44,d:46,s:28}},
  "ウォーグル": {attributes:["ノーマル","ひこう"],baseStats:{h:100,a:123,b:75,c:57,d:75,s:80}},
  "ドドゲザン": {attributes:["あく","はがね"],baseStats:{h:100,a:135,b:120,c:60,d:85,s:50}},
  "サザンドラ": {attributes:["あく","ドラゴン"],baseStats:{h:92,a:105,b:90,c:125,d:90,s:98}},
  "ミガルーサ": {attributes:["みず","エスパー"],baseStats:{h:90,a:102,b:73,c:78,d:65,s:70}},
  "ヘイラッシャ": {attributes:["みず"],baseStats:{h:150,a:100,b:115,c:65,d:65,s:35}},
  "シャリタツ": {attributes:["ドラゴン","みず"],baseStats:{h:68,a:50,b:60,c:120,d:95,s:82}},
  "イダイナキバ": {attributes:["じめん","かくとう"],baseStats:{h:115,a:131,b:131,c:53,d:53,s:87}},
  "サケブシッポ": {attributes:["フェアリー","エスパー"],baseStats:{h:115,a:65,b:99,c:65,d:115,s:111}},
  "アラブルタケ": {attributes:["くさ","あく"],baseStats:{h:111,a:127,b:99,c:79,d:99,s:55}},
  "ハバタクカミ": {attributes:["ゴースト","フェアリー"],baseStats:{h:55,a:55,b:55,c:135,d:135,s:135}},
  "チヲハウハネ": {attributes:["むし","かくとう"],baseStats:{h:85,a:135,b:79,c:85,d:105,s:81}},
  "スナノケガワ": {attributes:["でんき","じめん"],baseStats:{h:85,a:81,b:97,c:121,d:85,s:101}},
  "テツノワダチ": {attributes:["じめん","はがね"],baseStats:{h:90,a:112,b:120,c:72,d:70,s:106}},
  "テツノツツミ": {attributes:["こおり","みず"],baseStats:{h:56,a:80,b:114,c:124,d:60,s:136}},
  "テツノカイナ": {attributes:["かくとう","でんき"],baseStats:{h:154,a:140,b:108,c:50,d:68,s:50}},
  "テツノコウベ": {attributes:["あく","ひこう"],baseStats:{h:94,a:80,b:86,c:122,d:80,s:108}},
  "テツノドクガ": {attributes:["ほのお","どく"],baseStats:{h:80,a:70,b:60,c:140,d:110,s:110}},
  "テツノイバラ": {attributes:["いわ","でんき"],baseStats:{h:100,a:134,b:110,c:70,d:84,s:72}},
  "セグレイブ": {attributes:["ドラゴン","こおり"],baseStats:{h:115,a:145,b:92,c:75,d:86,s:87}},
  "サーフゴー": {attributes:["はがね","ゴースト"],baseStats:{h:87,a:60,b:95,c:133,d:91,s:84}},
  "チオンジェン": {attributes:["あく","くさ"],baseStats:{h:85,a:85,b:100,c:95,d:135,s:70}},
  "パオジアン": {attributes:["あく","こおり"],baseStats:{h:80,a:120,b:80,c:90,d:65,s:135}},
  "ディンルー": {attributes:["あく","じめん"],baseStats:{h:155,a:110,b:125,c:55,d:80,s:45}},
  "イーユイ": {attributes:["あく","ほのお"],baseStats:{h:55,a:80,b:80,c:135,d:120,s:100}},
  "トドロクツキ": {attributes:["ドラゴン","あく"],baseStats:{h:105,a:139,b:71,c:55,d:101,s:119}},
  "テツノブジン": {attributes:["フェアリー","かくとう"],baseStats:{h:74,a:130,b:90,c:120,d:60,s:116}},
  "コライドン": {attributes:["かくとう","ドラゴン"],baseStats:{h:100,a:135,b:115,c:85,d:100,s:135}},
  "ミライドン": {attributes:["でんき","ドラゴン"],baseStats:{h:100,a:85,b:100,c:135,d:115,s:135}},
  "リザードン": {attributes:["ほのお","ひこう"],baseStats:{h:78,a:84,b:78,c:109,d:85,s:100}},
  "ヌオー": {attributes:["みず","じめん"],baseStats:{h:95,a:85,b:85,c:65,d:65,s:35}},
  "ニャイキング": {attributes:["はがね"],baseStats:{h:70,a:110,b:100,c:50,d:60,s:50}},
};

export const POKEMON_NAMES = Object.keys(POKEMONS);

export const DEFAULT_PICKUP: Record<string, boolean> = {
  "マスカーニャ": true,
  "ラウドボーン": true,
  /* "ファイアロー": true,  */
  "パーモット": true,
  "ハピナス": true,
  "アーマーガア": true,
  "マリルリ": true,
  "ドオー": true,
  "イッカネズミ": true,
  "オリーヴァ": true,
  "キノガッサ": true,
  "ガブリアス": true,
  "キョジオーン": true,
  /* "ギャラドス": true, */
  "コノヨザル": true,
  "グレンアルマ": true,
  "ブラッキー": true,
  "ニンフィア": true,
  "モロバレル": true,
  "ジバコイル": true,
  "ミミッキュ": true,
  "ハッサム": true,
  "カバルドン": true,
  "ウルガモス": true,
  "ボーマンダ": true,
  "デカヌチャン": true,
  "オーロンゲ": true,
  "イルカマン(ナイーブ)": true,
  "イルカマン(マイティ)": true,
  "ドラパルト": true,
  "キラフロル": true,
  "ヒートロトム": true,
  "ウォッシュロトム": true,
  /* "カットロトム": true, */
  "バンギラス": true,
  "パルシェン": true,
  "ドヒドイデ": true,
  "カイリュー": true,
  "クレベース": true,
  "ドドゲザン": true,
  "サザンドラ": true,
  "ヘイラッシャ": true,
  "セグレイブ": true,
  "サーフゴー": true,
};
