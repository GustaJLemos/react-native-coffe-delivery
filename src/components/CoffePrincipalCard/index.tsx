import React from 'react';
import { View, TouchableOpacity, Text, TouchableOpacityProps } from 'react-native';
import { styles } from './styles';
import { Coffes } from '../../types/Coffes';

type Props = TouchableOpacityProps & {
  coffe: Coffes;
}

export function CoffePrincipalCard({ coffe: { type, name, description, price, image: Image }, ...rest }: Props) {
  // fazer animaçõs do card, do café aumentando de tamanho, e da size em si sdo negocio, a tag n muda o tamanho, mas o card, a imagem e as fonts ficam maiores ou menos de acordo com o foco
  return (
    <TouchableOpacity style={styles.container} {...rest}>
      <Image
        style={{ marginTop: -40 }}
      />
      <View style={styles.coffeTypeContainer}>
        <Text style={styles.coffeType}>
          {type}
        </Text>
      </View>

      <Text style={styles.title} numberOfLines={1}>
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
    </TouchableOpacity>
  );
}