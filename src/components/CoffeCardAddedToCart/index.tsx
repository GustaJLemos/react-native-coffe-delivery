import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { styles } from './styles';
import { CoffeQuantityCounter } from '../CoffeQuantityCounter';
import { Trash } from 'phosphor-react-native';
import { THEME } from '../../theme';
import { CoffeAddedToCart } from '../../types/CoffeAddedToCart';
import { useCartStore } from '../../store/cartStore';

type Props = {
  coffe: CoffeAddedToCart;
}

export function CoffeCardAddedToCart({ coffe: { name, size, id, quantity, image: Image } }: Props) {
  const updateCoffeQuantity = useCartStore((state) => state.updateCoffeQuantityById);

  const [coffeCounter, setCoffeCounter] = useState<number>(quantity);

  function handleUpdateCoffeQuantity(newCount: number) {
    setCoffeCounter(newCount);
    updateCoffeQuantity(id, newCount);
  }

  // TODO dar uma boa olhada na lógica do card

  return (
    <View style={styles.container}>
      <Image
        width={64}
        height={64}
      />

      <View style={styles.infoContainer}>
        <Text style={styles.coffeName}>
          {name}
        </Text>
        <Text style={styles.coffeSize}>
          {size}
        </Text>
        <View style={styles.cardActionsContainer}>
          <CoffeQuantityCounter
            count={coffeCounter}
            setCount={handleUpdateCoffeQuantity}
            style={styles.coffeCounterContainer}
          />
          <TouchableOpacity style={styles.trashIconContainer}>
            <Trash size={20} color={THEME.colors.product.purple} />
          </TouchableOpacity>
        </View>
      </View>

      <Text style={styles.coffePrice}>
        R$ {(coffeCounter * 9.90).toFixed(2)}
      </Text>
    </View>
  );
}