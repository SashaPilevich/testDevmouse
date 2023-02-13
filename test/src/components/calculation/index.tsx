import { ChangeEventHandler,useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TState } from "../../redux/store";
import { IColumn, IItemOfOrder } from "../../types/itemoforder";
import { Button } from "../button";
import { Form, Table } from "react-bootstrap";
import {
  loadOrder,
  setLocalOrder,
  setUIPrice,
} from "../../redux/actions/select";
import { sum } from "../../helpers";
import styles from "./styles.module.css"

export const ListOfOrder = () => {
  const [isEditMode, setIsEditMode] = useState(true);
  const [editedRow, setEditedRow] = useState<IItemOfOrder>();
  
  const columns: IColumn[] = [
    { field: "restaurant", fieldName: "Restaurant" },
    { field: "product", fieldName: "Product" },
    { field: "cost", fieldName: "Cost" },
    { field: "actions", fieldName: "Actions" },
  ];
  const dispatch = useDispatch();

  const localOrder = useSelector(
    (state: TState) => state.selectReducer.itemOfLs
  );
  const price = useSelector(
    (state: TState) => state.selectReducer.price
  );

  const handleOnChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    let newPrice = localOrder.map((item) => {
      if (item.id === event.target.id) {
        item.priceOfPizza = Number(event.target.value);
      }
      return item;
    });
    dispatch(setUIPrice(sum(newPrice)));
    localStorage.setItem("order", JSON.stringify(newPrice));
  };
  const removeItem = (id: string) => {
    let modifiedOrder = localOrder.filter((item) => {
      if (item.id === id) {
        return false;
      }
      return item;
    });
    dispatch(setLocalOrder(modifiedOrder));
    dispatch(setUIPrice(sum(modifiedOrder)));
    localStorage.setItem("order", JSON.stringify(modifiedOrder));
  };

  useEffect(() => {
    dispatch(loadOrder() as any);
  }, []);

  return (
    <div className={styles.container}>
      <Table className={styles.table}>
        <thead>
          <tr>
            {columns.map((column: IColumn) => {
              return <th key={column.field}>{column.fieldName}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {localOrder
            ? localOrder.map((row: IItemOfOrder) => {
                const onClickRemove = () => {
                  removeItem(row.id);
                };
                return (
                  <tr key={row.id}>
                    <td>{row.nameofRestaurant}</td>
                    <td>{row.nameOfPizza}</td>
                    <td className={styles.cost}>
                      {isEditMode ? (
                        <Form.Control
                          type="text"
                          defaultValue={
                            editedRow
                              ? `${editedRow.priceOfPizza}.00`
                              : `${row.priceOfPizza}.00`
                          }
                          id={row.id}
                          name="cost"
                          onChange={handleOnChange}
                        />
                      ) : (
                        row.priceOfPizza
                      )}
                    </td>
                    <td>
                      <Button
                        label={"Remove"}
                        onClick={onClickRemove}
                        type={"remove"}
                      />
                    </td>
                  </tr>
                );
              })
            : ""}
          <tr>
            <td className ={styles.summary}colSpan={2}>Summary:</td>
            <td className={styles.price}>{price}.00 USD
            </td>
            <td>
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

