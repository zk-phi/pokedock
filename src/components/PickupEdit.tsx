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
      「〇〇調整ツール」のページで計算に使用するポケモンを選択できます。
    </p>
    <p>
      大量に選ぶと計算が遅くなる場合があります。
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
