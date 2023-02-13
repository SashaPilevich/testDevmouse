import { IItemOfOrder } from "../types/itemoforder";

export const generateUniqId = () => {
  return "_" + Math.random().toString(16).slice(2);
};

export let Order: IItemOfOrder[] = [];
export const newItem = (
  nameofRestaurant: string,
  nameOfPizza: string,
  priceOfPizza: number
) => {
  if (nameofRestaurant !== "" && nameOfPizza !== "" && priceOfPizza >= 0) {
    let obj: IItemOfOrder = {
      id: generateUniqId(),
      nameofRestaurant: nameofRestaurant,
      nameOfPizza: nameOfPizza,
      priceOfPizza: priceOfPizza,
    };
    Order.push(obj);
  }
  return Order;
};

export const sum = (listOfOrder: IItemOfOrder[]) => {
  let result = listOfOrder.reduce((summa, item) => {
    return summa + item.priceOfPizza;
  }, 0);
  return result;
};
