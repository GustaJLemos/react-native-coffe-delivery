import React from 'react';
import { View, Text } from 'react-native';
import ExpressoSvg from '../../assets/coffes/Expresso.svg'

import { styles } from './styles';

export function CoffeCard() {
  return (
    <View style={styles.container}>
      <ExpressoSvg
        style={{ marginTop: -15 }}
      />

      <View style={styles.content}>
        <Text style={styles.title}>
          Expresso Tradicional
        </Text>

        <Text style={styles.description} numberOfLines={2}>
          O tradicional café feito com água quente e grãos moídos
        </Text>

        <View style={styles.priceContainer}>
          <Text style={styles.price}>
            R$
          </Text>
          <Text style={styles.priceValue}>
            9,90
          </Text>
        </View>
      </View>
    </View>
  );
}