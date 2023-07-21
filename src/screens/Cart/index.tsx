import React, { useEffect, useState } from 'react';
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

export function Cart() {
  // const [totalPrice, setTotalPrice] = useState<string>('');

  const navigation = useNavigation<AppNavigatorRoutesProps>();

  const coffeAddedToCart = useCartStore((state) => state.coffeAddedToCart);
  const setShowCoffeToast = useCartStore((state) => state.setShowCoffeToast);

  function handleNavigateToFinishPurchase() {
    navigation.navigate('FinishPurchaseScreen')
  }

  // TODO testar essa porra aq dps, provavelmente isso aq sai, eu só preciso exibir, e dps de um tempo fazer esse componente sair
  useEffect(() => {
    setShowCoffeToast(false);
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
        <View style={styles.emptyListContainer}>
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
        </View>
      )}

      <ScrollView
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
      >
        {coffeAddedToCart.map((item, index) => (
          <CoffeCardAddedToCart
            key={item.id + index}
            coffe={item}
          />
        ))}
      </ScrollView>
      {/* TODO fazer função de deletar */}
      {/* <View style={styles.excludeContainer}>
        <Trash size={28} color={THEME.colors.feedback.red_dark} />
      </View> */}
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