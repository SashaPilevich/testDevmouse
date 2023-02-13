import Select, { SingleValue} from "react-select";
import styles from "./styles.module.css";
export interface ISelectOptions {
  value:string,
  label:string,
  id:number,
  price:number
}
export interface SelectPrototype {
  onChange:(newValue: SingleValue<ISelectOptions>) => void;
  placeholder:string,
  options:ISelectOptions[],
  isDisabled:boolean,
}
export const SelectProtoType = (props:SelectPrototype) => {
  return(
    <Select className={styles.select} onChange={props.onChange} placeholder={props.placeholder} options={props.options} isDisabled={props.isDisabled}/>
  )
}

