import { Dispatch } from "redux";
import { ISelectOptions } from "../../components/selectPrototype";
import { IItemOfOrder } from "../../types/itemoforder";
import { ACTIONS } from "../constans";
import { TState } from "../store";

export const setListOfPizzas = (listOfPizzas: ISelectOptions[]) => {
  return {
    type: ACTIONS.SET_OPTIONS_PIZZA,
    listOfPizzas,
  };
};
export const setIsDisable = (isDisable: boolean) => {
  return {
    type: ACTIONS.SET_IS_DISABLE,
    isDisable,
  };
};
export const setItemOfOrder = (itemOfOrder: IItemOfOrder[]) => {
  return {
    type: ACTIONS.SET_ITEM_OF_ORDER,
    itemOfOrder,
  };
};
export const setLocalOrder = (itemsOfLocalOrder: IItemOfOrder[]) => {
  return {
    type: ACTIONS.SET_ITEM_ON_LS,
    itemsOfLocalOrder,
  };
};

export const setUIPrice = (price: number) => {
  return {
    type: ACTIONS.SET_UI_PRICE,
    price,
  };
};
export const loadOrder = () => {
  return (dispatch: Dispatch, getState: () => TState) => {
    let orderList: IItemOfOrder[] = [];
    let list = localStorage.getItem("order");
    if (list) {
      orderList = JSON.parse(list);
    }
    dispatch(setLocalOrder(orderList));

    const fullPrice = orderList.reduce((sum: number, item: IItemOfOrder) => {
      return sum + item.priceOfPizza;
    }, 0);
    dispatch(setUIPrice(fullPrice));
  };
};
