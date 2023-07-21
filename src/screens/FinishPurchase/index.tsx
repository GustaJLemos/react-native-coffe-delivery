import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import IlustrationSvg from '../../assets/coffes/Illustration.svg'
import { styles } from './styles';
import { Button } from '../../components/Button';
import { useNavigation } from '@react-navigation/native';
import { AppNavigatorRoutesProps } from '../../routes/types/AppRoutesNavigationProps';
import { useCartStore } from '../../store/cartStore';

export function FinishPurchase() {
  const navigation = useNavigation<AppNavigatorRoutesProps>();

  function handleClearAllCoffeAndNavigateToHome() {
    clearAllCoffeAddedToCart();
    navigation.navigate('HomeScreen')
  }

  const clearAllCoffeAddedToCart = useCartStore((state) => state.clearAllCoffeAddedToCart);

  return (
    <View style={styles.container}>
      <IlustrationSvg />

      <View>
        <Text style={styles.title}>
          Uhu! Pedido confirmado
        </Text>
        <Text style={styles.text}>
          Agora é só aguardar que logo o café {'\n'} chegará até você!
        </Text>

        <Button
          title='Ir para a home'
          type='purple'
          onPress={handleClearAllCoffeAndNavigateToHome}
        />
      </View>
    </View>
  );
}