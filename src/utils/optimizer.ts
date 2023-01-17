import { evaluate as evaluateAtLevel } from "./evaluator";

const f = Math.floor;

const evaluate = (pokemon: OptimizedPokemonSettings): Pokemon => {
  const res = evaluateAtLevel(pokemon, 50);
  return {
    ...pokemon,
    ...res,
  };
};

const optimizeSimple = (pokemon: PokemonSettings, field: "h" | "a" | "c" | "s"): Pokemon => {
  const { ev, n } = pokemon;
  const remainingEv = 508 - (ev.h + ev.a + ev.b + ev.c + ev.d + ev.s);
  const nAvailable = !Object.values(n).includes(1.1);
  return evaluate({
    ...pokemon,
    ev: { ...pokemon.ev, [field]: 0 },
    n: field === "h" ? pokemon.n : { ...pokemon.n, [field]: 1 },
    optimized: {
      ev: { ...ev, [field]: Math.min(ev[field] + remainingEv, 252) },
      n: field === "h" ? n : { ...n, [field]: nAvailable ? 1.1 : n[field] },
    },
  });
};

const optimizeSkip = (pokemon: PokemonSettings): Pokemon => (
  evaluate({
    ...pokemon,
    optimized: {
      ev: pokemon.ev,
      n: pokemon.n,
    },
  })
);

const optimizeHBD = (pokemon: PokemonSettings): Pokemon => {
  const { baseStats, iv, ev, n, bonus } = pokemon;
  const remainingEv = 508 - (ev.h + ev.a + ev.b + ev.c + ev.d + ev.s);
  const nAvailable = !Object.values(n).includes(1.1);
  const possibleNs: NValues[] = !nAvailable ? [n] : [{ ...n, b: 1.1 }, { ...n, d: 1.1 }];

  let bestPokemon = evaluate(optimizeSkip(pokemon));
  for (let n of possibleNs) {
    const limDh = Math.min(remainingEv, 252 - ev.d);
    for (let dh = 0; dh <= limDh; dh += 4) {
      const limDb = Math.min(remainingEv - dh, 252 - ev.b);
      for (let db = 0; db <= limDb; db += 4) {
        const dd = remainingEv - dh - db;
        if (ev.d + dd > 252) continue;
        const candidate: OptimizedPokemonSettings = {
          ...pokemon,
          ev: { ...pokemon.ev, h: 0, b: 0, d: 0 },
          n: { ...pokemon.n, b: 1, d: 1 },
          optimized: {
            ev: { ...ev, h: ev.h + dh, b: ev.b + db, d: ev.d + dd },
            n,
          },
        };
        const evaluated = evaluate(candidate);
        const { h, hb, hd, hbd } = evaluated.computedWithBonus;
        const { h: bestH, hb: bestHB, hd: bestHD, hbd: bestHBD } = bestPokemon.computedWithBonus;
        if (hbd < bestHBD) {
          continue;
        } else if (hbd === bestHBD && (hb + hd) < (bestHB + bestHD)) {
          continue;
        } else if (hbd === bestHBD && (hb + hd) === (bestHB + bestHD) && h < bestH) {
          continue;
        } else {
          bestPokemon = evaluated;
        }
      }
    }
  }

  return bestPokemon;
};

export const optimizePokemon = (pokemon: PokemonSettings): Pokemon => {
  const { optimizationStrategy } = pokemon;
  if (!optimizationStrategy) {
    return optimizeSkip(pokemon);
  } else if (optimizationStrategy === "hbd") {
    return optimizeHBD(pokemon);
  } else {
    return optimizeSimple(pokemon, optimizationStrategy);
  }
};
