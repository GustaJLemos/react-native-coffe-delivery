import React, { useState } from 'react';
import { Text, TouchableOpacity, View, ViewProps } from 'react-native';
import { MapPin, ShoppingCart } from 'phosphor-react-native';
import { styles } from './styles';
import { THEME } from '../../theme';
import { ArrowLeft } from 'phosphor-react-native';
import { useNavigation } from '@react-navigation/native'
import { AppNavigatorRoutesProps } from '../../routes/types/AppRoutesNavigationProps';
import { useCartStore } from '../../store/cartStore';
import { calculateAllQuantityItem } from '../../utils/calculateAllQuantityItem';
import Animated, { AnimatedStyleProp } from 'react-native-reanimated';
import { TextStyle } from 'react-native';

type Props = ViewProps & {
  goBack?: boolean,
  title?: string,
  showCart?: boolean,
  iconColor?: string,
  addressColor?: AnimatedStyleProp<TextStyle>,
}

export function Header({ goBack = false, title = '', addressColor, showCart = true, iconColor = THEME.colors.product.yellow_dark, ...rest }: Props) {
  const navigation = useNavigation<AppNavigatorRoutesProps>();
  const coffeAddedToCart = useCartStore((state) => state.coffeAddedToCart);

  function handleNavigateToCart() {
    navigation.navigate('CartScreen');
  }

  return (
    <View style={[styles.container, rest.style]}>
      {goBack ? (
        <TouchableOpacity
          onPress={() => navigation.goBack()}
        >
          <ArrowLeft
            size={24}
            color={title ? THEME.colors.base.gray_100 : THEME.colors.base.white}
          />
        </TouchableOpacity>
      ) : (
        <View style={styles.userLocation}>
          <MapPin size={20} weight="fill" color={THEME.colors.product.purple} />
          <Animated.Text style={[styles.text, addressColor]}>
            Ponta Grossa, PR
          </Animated.Text>
        </View>
      )}

      {title && (
        <Text style={styles.title}>
          {title}
        </Text>
      )}

      {showCart ? (
        <TouchableOpacity
          style={styles.coffesInCartIcon}
          onPress={handleNavigateToCart}
        >
          {coffeAddedToCart.length > 0 && (
            <View style={styles.coffesInCart}>
              <Text style={styles.coffesInCartText}>
                {calculateAllQuantityItem(coffeAddedToCart)}
              </Text>
            </View>
          )}
          <ShoppingCart
            size={20}
            weight="fill"
            color={coffeAddedToCart.length > 0 ? THEME.colors.product.purple : iconColor}
          />
        </TouchableOpacity>
      ) : (
        // View somente para fazer com que o título fique no meio por conta do space-between nos estilos
        <View style={{ width: 20, height: 20 }} />
      )}
    </View>
  );
}