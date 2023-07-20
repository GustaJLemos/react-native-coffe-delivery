import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import ExpressoSvg from '../../assets/coffes/Expresso.svg'
import { styles } from './styles';
import { CoffeQuantityCounter } from '../CoffeQuantityCounter';
import { Trash } from 'phosphor-react-native';
import { THEME } from '../../theme';

export function CoffeCardAddedToCart() {
  // TODO trocar dps pela info vindo da context
  const [coffeCounter, setCoffeCounter] = useState<number>(1);

  return (
    <View style={styles.container}>
      <ExpressoSvg
        width={64}
        height={64}
      />

      <View style={styles.infoContainer}>
        <Text style={styles.coffeName}>
          Irlândes
        </Text>
        <Text style={styles.coffeSize}>
          227ml
        </Text>
        <View style={styles.cardActionsContainer}>
          <CoffeQuantityCounter
            count={coffeCounter}
            setCount={setCoffeCounter}
            style={styles.coffeCounterContainer}
          />
          <TouchableOpacity style={styles.trashIconContainer}>
            <Trash size={20} color={THEME.colors.product.purple} />
          </TouchableOpacity>
        </View>
      </View>

      <Text style={styles.coffePrice}>
        R$ 9,90
      </Text>
    </View>
  );
}