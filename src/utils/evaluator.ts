type EvaluationResult = {
  computed: Values,
  computedWithBonus: Values & {
    hb: number,
    hd: number,
    hbd: number,
    evenHBD: number,
  },
};

const f = Math.floor;

export const evaluate = (pokemon: OptimizedPokemonSettings, level: number): EvaluationResult => {
  const { baseStats, iv, bonus, bdBalance, optimized: { ev, n } } = pokemon;
  const baseValues = {
    h: f((baseStats.h * 2 + iv.h + f(ev.h / 4)) * level / 100) + level + 10,
    a: f((baseStats.a * 2 + iv.a + f(ev.a / 4)) * level / 100) + 5,
    b: f((baseStats.b * 2 + iv.b + f(ev.b / 4)) * level / 100) + 5,
    c: f((baseStats.c * 2 + iv.c + f(ev.c / 4)) * level / 100) + 5,
    d: f((baseStats.d * 2 + iv.d + f(ev.d / 4)) * level / 100) + 5,
    s: f((baseStats.s * 2 + iv.s + f(ev.s / 4)) * level / 100) + 5,
  };
  const valuesWithN = {
    h: baseValues.h,
    a: f(baseValues.a * n.a),
    b: f(baseValues.b * n.b),
    c: f(baseValues.c * n.c),
    d: f(baseValues.d * n.d),
    s: f(baseValues.s * n.s),
  };
  const valuesWithNAndBonus = {
    h: f(valuesWithN.h * bonus.h),
    a: f(valuesWithN.a * bonus.a),
    b: f(valuesWithN.b * bonus.b),
    c: f(valuesWithN.c * bonus.c),
    d: f(valuesWithN.d * bonus.d),
    s: f(valuesWithN.s * bonus.s),
  };
  const { h, b, d } = valuesWithNAndBonus;
  return {
    computed: valuesWithN,
    computedWithBonus: {
      ...valuesWithNAndBonus,
      hb: h * b,
      hd: h * d,
      hbd: f(h * b * d / (bdBalance * b + (1 - bdBalance) * d)),
      evenHBD: f(h * b * d / (b + d) * 2),
    },
  };
};
