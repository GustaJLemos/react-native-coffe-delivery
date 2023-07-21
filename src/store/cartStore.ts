import { create } from 'zustand'
import { CoffeAddedToCart } from '../types/CoffeAddedToCart';
import { Coffes } from '../types/Coffes';

type UpdateCoffeType = {
  id: string,
  newQuantity: number,
  itemSize: string
}

type StoreProps = {
  coffeSelected: Coffes,
  setCoffeSelected: (coffe: Coffes) => void,
  coffeAddedToCart: CoffeAddedToCart[],
  setCoffeAddedToCart: (newCoffe: CoffeAddedToCart) => void,
  clearAllCoffeAddedToCart: () => void;
  updateCoffeQuantityById: ({ id, newQuantity, itemSize }: UpdateCoffeType) => void;
  deleteCoffeAddedById: (id: string, size: string) => void;
  showCoffeToast: boolean;
  setShowCoffeToast: (showCoffe: boolean) => void;
}

export const useCartStore = create<StoreProps>((set) => ({
  coffeSelected: {} as Coffes,
  setCoffeSelected: (coffe) => set(() => ({ coffeSelected: coffe })),
  coffeAddedToCart: [],
  setCoffeAddedToCart: (newCoffe) => set(
    (currentState) => ({ coffeAddedToCart: [...currentState.coffeAddedToCart, newCoffe] })
  ),
  clearAllCoffeAddedToCart: () => set(() => ({ coffeAddedToCart: [] })),
  updateCoffeQuantityById: ({ id, newQuantity, itemSize }: UpdateCoffeType) => set(
    (currentState) => ({
      coffeAddedToCart: [
        ...currentState.coffeAddedToCart.map((item) => {
          return item.id === id && item.size === itemSize ? { ...item, quantity: newQuantity } : item
        })
      ]
    })
  ),
  deleteCoffeAddedById: (id: string, size: string) => set(
    (currentState) => ({
      coffeAddedToCart: [
        ...currentState.coffeAddedToCart.filter((item) => {
          return !(item.id === id && item.size === size) && item
        })
      ]
    })
  ),
  showCoffeToast: false,
  setShowCoffeToast: (showCoffe: boolean) => set(() => ({ showCoffeToast: showCoffe })),
  // TODO fazer função de excluir um café em específico
}))