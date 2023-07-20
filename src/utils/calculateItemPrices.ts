import { CoffeAddedToCart } from "../types/CoffeAddedToCart";

export function calculateItemPrices(coffesToCalculate: CoffeAddedToCart[]) {
  let quantity: number = 0;

  console.log('quantity', quantity);

  coffesToCalculate.forEach((item) => {
    quantity = quantity + item.quantity
  })
  console.log('items', quantity);

  return (quantity * 9.90).toFixed(2)
}