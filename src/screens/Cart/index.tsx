import React, { useEffect, useRef } from 'react';
import { ScrollView, Text, View } from 'react-native';

import { styles } from './styles';
import { Header } from '../../components/Header';
import { CoffeCardAddedToCart } from '../../components/CoffeCardAddedToCart';
import { Trash } from 'phosphor-react-native'
import { THEME } from '../../theme';
import { Button } from '../../components/Button';
import { useNavigation } from '@react-navigation/native';
import { AppNavigatorRoutesProps } from '../../routes/types/AppRoutesNavigationProps';
import { useCartStore } from '../../store/cartStore';
import { calculateItemPrices } from '../../utils/calculateItemPrices';
import { ShoppingCart } from 'phosphor-react-native';
import Animated, { FadeIn, Layout, SlideInRight, SlideOutRight } from 'react-native-reanimated';
import { Swipeable } from 'react-native-gesture-handler';

type DeleteCoffe = {
  id: string,
  size: string,
  index: number,
}

export function Cart() {
  const navigation = useNavigation<AppNavigatorRoutesProps>();

  const cartStore = useCartStore((state) => state);
  const coffeAddedToCart = cartStore.coffeAddedToCart;

  const swipeableRef = useRef<Swipeable[]>([]);

  function handleNavigateToFinishPurchase() {
    navigation.navigate('FinishPurchaseScreen')
  }

  function handleDeleteCoffeById({ id, size, index }: DeleteCoffe) {
    swipeableRef.current?.[index].close();
    cartStore.deleteCoffeAddedById(id, size);
  }

  // TODO melhorar essa lógica aq, pra gente conseguir de outra forma mostrar o toast
  useEffect(() => {
    cartStore.setShowCoffeToast(false);
  }, [])

  return (
    <View style={styles.container}>
      <Header
        style={styles.header}
        goBack
        title='Carrinho'
        showCart={false}
      />

      {coffeAddedToCart.length === 0 && (
        <Animated.View entering={FadeIn.duration(1000)} style={styles.emptyListContainer}>
          <View style={{ alignItems: 'center' }}>
            <ShoppingCart
              size={20}
              weight="fill"
              color={THEME.colors.base.gray_500}
            />
            <Text style={styles.emptyListText}>
              Seu carrinho está vazio
            </Text>
          </View>
          <Button
            title='Ver catálogo'
            type='purple'
            onPress={() => navigation.goBack()}
          />
        </Animated.View>
      )}

      <ScrollView
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
      >
        {coffeAddedToCart.map((item, index) => (
          <Animated.View
            key={item.id + index}
            entering={SlideInRight}
            exiting={SlideOutRight}
            layout={Layout.springify()}
          >
            <Swipeable
              ref={(ref) => {
                if (ref) {
                  swipeableRef.current?.push(ref);
                }
              }}
              overshootLeft={false}
              onSwipeableOpen={() => handleDeleteCoffeById({ id: item.id, size: item.size, index })}
              leftThreshold={100}
              renderRightActions={() => null}
              renderLeftActions={() => (
                <View style={styles.swipeableDelete}>
                  <Trash size={28} color={THEME.colors.feedback.red_dark} />
                </View>
              )}
            >
              <CoffeCardAddedToCart
                coffe={item}
                deleteCoffe={() => handleDeleteCoffeById({ id: item.id, size: item.size, index })}
              />
            </Swipeable>
          </Animated.View>
        ))}
      </ScrollView>

      {coffeAddedToCart.length > 0 && (
        <View style={styles.bottomContainer}>
          <View style={styles.bottomText}>
            <Text style={styles.finalValue}>
              Valor total
            </Text>
            <Text style={styles.finalPrice}>
              R$ {coffeAddedToCart.length > 0 ? calculateItemPrices(coffeAddedToCart) : '**.**'}
            </Text>
          </View>

          <Button
            title='Confirmar pedido'
            type='yellow'
            onPress={handleNavigateToFinishPurchase}
          />
        </View>
      )}
    </View>
  );
} 