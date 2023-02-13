import { useDispatch, useSelector } from "react-redux";
import { sum } from "../../helpers";
import { setLocalOrder, setUIPrice } from "../../redux/actions/select";
import { TState } from "../../redux/store";
import { IItemOfOrder } from "../../types/itemoforder";
import { Button } from "../button";
import { SelectGroup} from "../selectGroup";
import styles from "./styles.module.css";

export const NewEntry = () => {
  const itemOfOrder = useSelector(
    (state: TState) => state.selectReducer.itemOfOrder
  );
  const orderInLocalStorage = useSelector(
    (state: TState) => state.selectReducer.itemOfLs
  );
  const dispatch = useDispatch();
  let newItemOfOrder: IItemOfOrder;
  const addOrder = () => {
    if(itemOfOrder.length !==0){
      itemOfOrder.forEach((item) => {
        newItemOfOrder = {
          id: item.id,
          nameofRestaurant: item.nameofRestaurant,
          nameOfPizza: item.nameOfPizza,
          priceOfPizza: item.priceOfPizza,
        };
      });
    } else{
      return
    }
    const fullOrder = [...orderInLocalStorage, newItemOfOrder];
    dispatch(setLocalOrder(fullOrder));
    dispatch(setUIPrice(sum(fullOrder)));
    localStorage.setItem("order", JSON.stringify(fullOrder));
  }
  
  return (
    <div className={styles.entryContainer}>
      <SelectGroup/>
      <Button label={"Add to table"} onClick={addOrder} type={"add"} />
    </div>
  )
}