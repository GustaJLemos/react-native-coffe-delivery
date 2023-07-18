import React from 'react';
import { Text, View } from 'react-native';
import { MapPin, ShoppingCart } from 'phosphor-react-native';
import { styles } from './styles';
import { THEME } from '../../theme';

export function Header() {
  return (
    <View style={styles.container}>
      <View style={styles.userLocation}>
        <MapPin size={20} weight="fill" color={THEME.colors.product.purple} />
        <Text style={styles.text}>
          Ponta Grossa, PR
        </Text>
      </View>

      <ShoppingCart size={20} weight="fill" color={THEME.colors.product.yellow_dark} />
    </View>
  );
}