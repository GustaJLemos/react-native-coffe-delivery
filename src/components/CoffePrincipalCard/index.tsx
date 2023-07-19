import React from 'react';
import { View, Image, Text } from 'react-native';
import ExpressoSvg from '../../assets/coffes/Expresso.svg'
import { styles } from './styles';

export function CoffePrincipalCard() {
  return (
    <View style={styles.container}>
      <ExpressoSvg
        style={{ marginTop: -40 }}
      />
      <View style={styles.coffeTypeContainer}>
        <Text style={styles.coffeType}>
          TRADICIONAL
        </Text>
      </View>

      <Text style={styles.title}>
        Latte
      </Text>

      <Text style={styles.description} numberOfLines={2}>
        Café expresso com o dobro de leite e espuma cremosa
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
  );
}