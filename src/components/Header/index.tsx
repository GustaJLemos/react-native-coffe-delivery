import React, { useState } from 'react';
import { Text, TouchableOpacity, View, ViewProps } from 'react-native';
import { MapPin, ShoppingCart } from 'phosphor-react-native';
import { styles } from './styles';
import { THEME } from '../../theme';
import { ArrowLeft } from 'phosphor-react-native';
import { useNavigation } from '@react-navigation/native'
import { AppNavigatorRoutesProps } from '../../routes/types/AppRoutesNavigationProps';
import { useCartStore } from '../../store/cartStore';

type Props = ViewProps & {
  goBack?: boolean,
  title?: string,
  showCart?: boolean
}

export function Header({ goBack = false, title = '', showCart = true, ...rest }: Props) {
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
          <Text style={styles.text}>
            Ponta Grossa, PR
          </Text>
        </View>
      )}

      {title && (
        <Text style={styles.title}>
          {title}
        </Text>
      )}

      {/* TODO fazer a contagem de itens */}
      {showCart ? (
        <TouchableOpacity
          style={styles.coffesInCartIcon}
          onPress={handleNavigateToCart}
        >
          {coffeAddedToCart.length > 0 && (
            <View style={styles.coffesInCart}>
              <Text style={styles.coffesInCartText}>
                {coffeAddedToCart.length}
              </Text>
            </View>
          )}
          <ShoppingCart
            size={20}
            weight="fill"
            color={coffeAddedToCart.length > 0 ? THEME.colors.product.purple : THEME.colors.product.yellow_dark}
          />
        </TouchableOpacity>
      ) : (
        // View somente para fazer com que o título fique no meio por conta do space-between nos estilos
        <View style={{ width: 20, height: 20 }} />
      )}
    </View>
  );
}