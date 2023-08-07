import React from 'react';
import { View, Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';

import { styles } from './styles';
import { Coffes } from '../../types/Coffes';

type Props = TouchableOpacityProps & {
  coffe: Coffes;
}

export function CoffeCard({ coffe: { name, description, price, image: Image }, ...rest }: Props) {
  return (
    <TouchableOpacity activeOpacity={1} style={styles.container} {...rest}>
      <Image
        style={{ marginTop: -15 }}
      />

      <View style={styles.content}>
        <Text style={styles.title}>
          {name}
        </Text>

        <Text style={styles.description} numberOfLines={2}>
          {description}
        </Text>

        <View style={styles.priceContainer}>
          <Text style={styles.price}>
            R$
          </Text>
          <Text style={styles.priceValue}>
            {price}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}