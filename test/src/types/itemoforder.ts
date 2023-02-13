export interface IItemOfOrder{
  id:string,
  nameofRestaurant: string;
  nameOfPizza:string;
  priceOfPizza:number,
  onClickRemove?: () => void;
}
export interface IColumn {
  field:string,
  fieldName:string
}