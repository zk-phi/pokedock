import { signal } from "@preact/signals";
import { DEFAULT_PICKUP } from "../constants/pokemons";

export const storageEntries = signal<SavedPokemon[]>([]);
export const isPickedUp = signal<Record<string, boolean>>({});

export const loadFromStorage = () => {
  const pokemons = localStorage.getItem("pokedock_pokemons");
  const pickup = localStorage.getItem("pokedock_pickup");
  storageEntries.value = pokemons ? JSON.parse(pokemons) : [];
  isPickedUp.value = pickup ? JSON.parse(pickup) : DEFAULT_PICKUP;
};

export const saveToStorage = (pokemon: Pokemon) => {
  storageEntries.value = [...storageEntries.value, {
    pokemon,
    timestamp: (new Date).getTime(),
  }];
  localStorage.setItem("pokedock_pokemons", JSON.stringify(storageEntries.value));
};

export const deleteStorageItem = (index: number) => {
  if (index >= storageEntries.value.length) {
    throw new Error("deleteStorageItem: invalid index");
  }
  storageEntries.value = storageEntries.value.filter((_, i) => i !== index);
  localStorage.setItem("pokedock_pokemons", JSON.stringify(storageEntries.value));
};

export const setPickUp = (name: string, value: boolean) => {
  isPickedUp.value = { ...isPickedUp.value, [name]: value };
  localStorage.setItem("pokedock_pickup", JSON.stringify(isPickedUp.value));
};
