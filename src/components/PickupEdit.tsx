import { POKEMON_NAMES } from "../constants/pokemons";
import { isPickedUp, setPickUp } from "../store/localstorage";

export const PickupEdit = () => {
  const onTogglePickup = (name: string, e: Event) => {
    const value = !!(e.target as HTMLInputElement).checked;
    setPickUp(name, value);
  };

  return <>
    <h2>ピックアップ管理</h2>
    <p>
      「〇〇ランキング」のページで優先表示するポケモンを調整できます。
    </p>
    <table>
      <tr>
        <td>ポケモン</td>
        <td>ピックアップ</td>
      </tr>
      { POKEMON_NAMES.map((name) => (
        <tr>
          <td>{ name }</td>
          <td>
            <input
                type="checkbox"
                checked={ isPickedUp.value[name] }
                onInput={ (e) => onTogglePickup(name, e) } />
          </td>
        </tr>
      )) }
    </table>
  </>;
};
