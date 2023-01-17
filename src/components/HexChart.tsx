const VIEWBOX = 300;

const f = Math.floor;

const hexPoints = (values: (number | null)[]) => {
  const anglePerElement = 360 / values.length;
  return values.map((value, ix) => {
    if (value == null) return "";
    const angle = ((anglePerElement * ix) - 90) * Math.PI / 180;
    const val = ix === 0 ? value / 350 : value / 175;
    const x = Math.cos(angle) * val * (VIEWBOX / 2) + (VIEWBOX / 2);
    const y = Math.sin(angle) * val * (VIEWBOX / 2) + (VIEWBOX / 2);
    return `${x},${y}`;
  }).join(" ")
};

type Props = {
  pokemon: Pokemon,
  size: number,
};

export const HexChart = ({ pokemon, size }: Props) => {
  const { h, a, b, c, d, s } = pokemon.baseStats;
  const { h: ch, a: ca, b: cb, c: cc, d: cd, s: cs } = pokemon.computed;
  const { h: wh, a: wa, b: wb, c: wc, d: wd, s: ws } = pokemon.computedWithBonus;

  const polygons = [{
    points: hexPoints([350, 175, 175, 175, 175, 175]),
    fill: "rgba(0, 0, 0, 0.05)",
  }, {
    points: hexPoints([300, 150, 150, 150, 150, 150]),
    stroke: "rgba(255, 255, 255, 1)",
  }, {
    points: hexPoints([200, 100, 100, 100, 100, 100]),
    stroke: "rgba(255, 255, 255, 1)",
  },  {
    points: hexPoints([f(h+107), f(a+52), f(b+52), f(s+52), f(d+52), f(c+52),]),
    stroke: "rgba(0, 0, 0, 0.25)",
  }, {
    points: hexPoints([f(h+75), f(a+20), f(b+20), f(s+20), f(d+20), f(c+20)]),
    stroke: "rgba(0, 0, 0, 0.25)",
  }, {
    points: hexPoints([null, wa, null, ws, null, wc]),
    fill: "rgba(255, 0, 0, 0.25)",
    stroke: "rgba(255, 0, 0, 0.5)",
  }, {
    points: hexPoints([null, ca, null, cs, null, cc]),
    fill: "rgba(255, 0, 0, 0.5)",
  }, {
    points: hexPoints([wh, null, wb, null, wd, null]),
    fill: "rgba(0, 0, 255, 0.167)",
    stroke: "rgba(0, 0, 255, 0.334)",
  }, {
    points: hexPoints([ch, null, cb, null, cd, null]),
    fill: "rgba(0, 0, 255, 0.334)",
  }];

  return (
    <svg height={ size } width={ size } viewBox={ `0, 0, ${VIEWBOX}, ${VIEWBOX}` }>
      { polygons.map((polygon) => (
        <polygon
            stroke-width="2"
            fill={ polygon.fill || "none" }
            stroke={ polygon.stroke || "none" }
            points={ polygon.points } />
      )) }
      <circle cx={ VIEWBOX / 2 } cy={ VIEWBOX / 2 } r="2" fill="rgba(255, 255, 255, 0.5)" />
    </svg>
  );
};
