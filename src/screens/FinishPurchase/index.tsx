import React from 'react';
import { View, Text } from 'react-native';
import IlustrationSvg from '../../assets/coffes/Illustration.svg'
import { styles } from './styles';
import { Button } from '../../components/Button';
import { useNavigation } from '@react-navigation/native';
import { AppNavigatorRoutesProps } from '../../routes/types/AppRoutesNavigationProps';

export function FinishPurchase() {
  const navigation = useNavigation<AppNavigatorRoutesProps>();

  function handleNavigateToHome() {
    navigation.navigate('HomeScreen')
  }

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
          onPress={handleNavigateToHome}
        />
      </View>
    </View>
  );
}