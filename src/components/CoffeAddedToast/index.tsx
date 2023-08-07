import React from 'react';
import { View, Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { styles } from './styles';
import { useCartStore } from '../../store/cartStore';
import { ArrowRight, ShoppingCart } from 'phosphor-react-native';
import { THEME } from '../../theme';
import { useNavigation } from '@react-navigation/native';
import { AppNavigatorRoutesProps } from '../../routes/types/AppRoutesNavigationProps';
import Animated from 'react-native-reanimated';

const TouchabledAnimated = Animated.createAnimatedComponent(TouchableOpacity);

type Props = TouchableOpacityProps;

export function CoffeAddedToast({ ...rest }: Props) {
  const navigation = useNavigation<AppNavigatorRoutesProps>();

  const coffeAddedToCart = useCartStore((state) => state.coffeAddedToCart);

  if (coffeAddedToCart?.length === 0) {
    return <></>;
  }

  const lastCoffeAdded = coffeAddedToCart[coffeAddedToCart.length - 1];

  return (
    <TouchabledAnimated
      style={[styles.container, rest.style]}
      onPress={() => navigation.navigate('CartScreen')}
    >
      <View style={styles.cartIconContainer}>
        <View style={styles.coffesInCart}>
          <Text style={styles.coffesInCartText}>
            {lastCoffeAdded.quantity}
          </Text>
        </View>
        <ShoppingCart
          size={20}
          weight="fill"
          color={THEME.colors.base.white}
        />
      </View>

      <Text style={styles.text} numberOfLines={2}>
        <Text style={styles.textBold}>{lastCoffeAdded.quantity}</Text> café(s)
        <Text style={styles.textBold}> {lastCoffeAdded.name}</Text> de
        <Text style={styles.textBold}> {lastCoffeAdded.size}</Text> adicionado(s) ao carrinho
      </Text>

      <View style={styles.buttonContainer}>
        <Text style={styles.buttonText}>
          VER
        </Text>
        <ArrowRight
          size={16}
          color={THEME.colors.product.purple}
        />
      </View>
    </TouchabledAnimated>
  );
}