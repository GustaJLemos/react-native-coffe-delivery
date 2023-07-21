import { CoffeAddedToCart } from "../types/CoffeAddedToCart";

export function calculateAllQuantityItem(coffesToCalculate: CoffeAddedToCart[]) {
  let quantity: number = 0;

  coffesToCalculate.forEach((item) => {
    quantity = quantity + item.quantity
  })

  return quantity;
}