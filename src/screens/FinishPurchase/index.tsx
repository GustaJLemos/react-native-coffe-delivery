import React from 'react';
import { View, Text } from 'react-native';
import IlustrationSvg from '../../assets/coffes/Illustration.svg'
import { styles } from './styles';
import { Button } from '../../components/Button';

export function FinishPurchase() {
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
        />
      </View>
    </View>
  );
}