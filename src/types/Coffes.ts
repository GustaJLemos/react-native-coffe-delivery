import { SvgProps } from "react-native-svg"
import { CoffeType } from "./CoffeType"


export type Coffes = {
  id: string,
  name: string,
  description: string,
  price: string,
  type: CoffeType,
  image: React.FC<SvgProps>
}