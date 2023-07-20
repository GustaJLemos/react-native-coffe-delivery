import { create } from 'zustand'
import { CoffeAddedToCart } from '../types/CoffeAddedToCart';
import { Coffes } from '../types/Coffes';

type StoreProps = {
  coffeSelected: Coffes,
  setCoffeSelected: (coffe: Coffes) => void,
  coffeAddedToCart: CoffeAddedToCart[],
  setCoffeAddedToCart: (newCoffe: CoffeAddedToCart) => void,
  clearAllCoffeAddedToCart: () => void;
  updateCoffeQuantityById: (id: string, newQuantity: number) => void;
}

export const useCartStore = create<StoreProps>((set) => ({
  coffeSelected: {} as Coffes,
  setCoffeSelected: (coffe) => set(() => ({ coffeSelected: coffe })),
  coffeAddedToCart: [],
  setCoffeAddedToCart: (newCoffe) => set(
    (currentState) => ({ coffeAddedToCart: [...currentState.coffeAddedToCart, newCoffe] })
  ),
  clearAllCoffeAddedToCart: () => set(() => ({ coffeAddedToCart: [] })),
  updateCoffeQuantityById: (id: string, newQuantity: number) => set(
    (currentState) => ({
      coffeAddedToCart: [
        ...currentState.coffeAddedToCart.map((item) => {
          return item.id === id ? { ...item, quantity: newQuantity } : item
        })
      ]
    })
  )
  // TODO fazer função de excluir um café em específico
}))