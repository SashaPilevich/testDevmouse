import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux/es/exports";
import { SingleValue } from "react-select";
import { fetchRestaurants, fetchPizza } from "../../api/order";

import { newItem, Order } from "../../helpers";
import {
  setIsDisable,
  setItemOfOrder,
  setListOfPizzas,
} from "../../redux/actions/select";
import { TState } from "../../redux/store";
import { IPizza } from "../../types/pizza";
import { IRestaurant } from "../../types/restaurant";
import { ISelectOptions, SelectProtoType } from "../selectPrototype";

export const SelectGroup = () => {
  const [optionsRestaurant, setOptionsRestaurant] = useState<ISelectOptions[]>(
    []
  );
  const [nameRestaurant, setNameRestaurant] = useState("");
  const [namePizza, setNamePizza] = useState("");
  const [cost, setCost] = useState(0);
  const dispatch = useDispatch();
  const listOfPizzas = useSelector(
    (state: TState) => state.selectReducer.listOfPizzas
  );
  const isDisable = useSelector(
    (state: TState) => state.selectReducer.isDisable
  );
  let listOfRestaurants: ISelectOptions[] = [];
  let listForPizzas: ISelectOptions[] = [];
  let restaurantId = 0;
  
  
  useEffect(() => {
    fetchRestaurants().then((list) => {
      list.map((item: IRestaurant) => {
        return listOfRestaurants.push({
          value: item.name,
          label: item.name,
          id: item.id,
          price: 0,
        });
      });
      setOptionsRestaurant(listOfRestaurants);
    });
  }, []);

  useEffect(() => {
    newItem(nameRestaurant, namePizza, cost);
    dispatch(setItemOfOrder(Order));
  }, [namePizza]);

  const handleChooseRestaurant = (newValue: SingleValue<ISelectOptions>) => {
    listForPizzas.length = 0;
    if (newValue) {
      restaurantId = newValue?.id;
      setNameRestaurant(newValue.value);
    }
    if (restaurantId !== 0 && listForPizzas.length == 0) {
      dispatch(setIsDisable(false));
      fetchPizza(restaurantId).then((list) => {
        list.map((item: IPizza) => {
          return listForPizzas.push({
            label: item.name,
            value: item.name,
            id: item.id,
            price: item.price,
          });
        });

        dispatch(setListOfPizzas(listForPizzas));
      });
    }
  };
  
  const handleChoosePizza = (newValue: SingleValue<ISelectOptions>) => {
    if (newValue) {
      setNamePizza(newValue.value);
      setCost(newValue.price);
      dispatch(setItemOfOrder(Order));
    }
  };
  return (
    <div>
      <SelectProtoType
        onChange={handleChooseRestaurant}
        placeholder={"Select restaurant"}
        options={optionsRestaurant}
        isDisabled={false}
      />
      <SelectProtoType
        onChange={handleChoosePizza}
        placeholder={"Select pizza"}
        options={listOfPizzas}
        isDisabled={isDisable}
      />
    </div>
  );
};
