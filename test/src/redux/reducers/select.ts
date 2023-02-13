import { AnyAction } from "redux";
import { ISelectOptions } from "../../components/selectPrototype";
import { IItemOfOrder } from "../../types/itemoforder";
import { ACTIONS } from "../constans";

export interface ISelectState {
  listOfPizzas: ISelectOptions[];
  isDisable: boolean;
  itemOfOrder: IItemOfOrder[];
  itemOfLs: IItemOfOrder[];
  price: number;
}
export const defaultState: ISelectState = {
  listOfPizzas: [],
  isDisable: true,
  itemOfOrder: [],
  itemOfLs: [],
  price: 0,
};

export const selectReducer = (state = defaultState, action: AnyAction) => {
  switch (action.type) {
    case ACTIONS.SET_OPTIONS_PIZZA:
      return {
        ...state,
        listOfPizzas: action.listOfPizzas,
      };
    case ACTIONS.SET_IS_DISABLE:
      return {
        ...state,
        isDisable: action.isDisable,
      };
    case ACTIONS.SET_ITEM_OF_ORDER:
      return {
        ...state,
        itemOfOrder: action.itemOfOrder,
      };
    case ACTIONS.SET_ITEM_ON_LS:
      return {
        ...state,
        itemOfLs: action.itemsOfLocalOrder,
      };
    case ACTIONS.SET_UI_PRICE:
      return {
        ...state,
        price: action.price,
      };
    default:
      return state;
  }
};
