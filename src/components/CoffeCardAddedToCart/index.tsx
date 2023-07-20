import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import ExpressoSvg from '../../assets/coffes/Expresso.svg'
import { styles } from './styles';
import { CoffeQuantityCounter } from '../CoffeQuantityCounter';
import { Trash } from 'phosphor-react-native';
import { THEME } from '../../theme';
import { CoffeAddedToCart } from '../../types/CoffeAddedToCart';
import { useCartStore } from '../../store/cartStore';

type Props = {
  coffe: CoffeAddedToCart;
}

export function CoffeCardAddedToCart({ coffe }: Props) {
  const updateCoffeQuantity = useCartStore((state) => state.updateCoffeQuantityById);

  const [coffeCounter, setCoffeCounter] = useState<number>(coffe.quantity);

  function handleUpdateCoffeQuantity(newCount) {
    setCoffeCounter(newCount);
    updateCoffeQuantity(coffe.id, newCount);
  }

  return (
    <View style={styles.container}>
      <ExpressoSvg
        width={64}
        height={64}
      />

      <View style={styles.infoContainer}>
        <Text style={styles.coffeName}>
          {coffe.name}
        </Text>
        <Text style={styles.coffeSize}>
          {coffe.size}
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
        R$ {coffeCounter * 9.90}
      </Text>
    </View>
  );
}