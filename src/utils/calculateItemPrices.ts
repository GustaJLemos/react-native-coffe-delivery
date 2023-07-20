import { CoffeAddedToCart } from "../types/CoffeAddedToCart";

export function calculateItemPrices(coffesToCalculate: CoffeAddedToCart[]) {
  let quantity: number = 0;

  coffesToCalculate.forEach((item) => {
    quantity = quantity + item.quantity
  })
  console.log('lala', quantity);

  return quantity * 9.90
}