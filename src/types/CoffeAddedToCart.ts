import { CoffeSize } from "./CoffeSize";
import { Coffes } from "./Coffes";

export type CoffeAddedToCart = Coffes & {
  size: CoffeSize,
  quantity: number,
}